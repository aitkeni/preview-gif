function PreviewGIF(sel) {

  var gifs = document.querySelectorAll(sel+':not([src])');

  // Cachebuster for Safari so it does not reuse the cached 206 partial response for
  // subsequent range requests
  var cb = function() {
    return "?cb=" + (Math.floor(Math.random() * 1000000));
  };

  // TODO: add support for IE by using XDomain object
  var _processGIF = function(url, callback) {
    var buffer = "";
    var range_start = 0,
      range_end = 100000,
      range_increment = 25000;
    var worker = new Worker("/src/preview_worker.js"); // should each request have its own worker?

    // Setup XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + cb());
    xhr.setRequestHeader("Range", "bytes=" + range_start + "-" + range_end);

    if (xhr.overrideMimeType) { // not supported by ie
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }

    // Pass response to web worker for processing
    xhr.onload = function() {
      buffer += xhr.responseText;

      worker.onmessage = function(event) {
        if (event.data == -1) { // Fetch more bytes
          // Fetch more bytes
          range_start = range_end + 1;
          range_end += range_increment;
          xhr.abort();
          xhr.open('GET', url + cb());
          xhr.setRequestHeader("Range", "bytes=" + range_start + "-" + range_end);
          xhr.send();
        } else if (event.data == -2) { // Error occured while reading
          console.log("Error while reading image " + url);
          callback(-1);
        } else { // Preview for first frame!
          var preview = event.data;
          callback(preview);
        }
      };

      worker.postMessage({
        buffer: buffer,
        limit: range_end
      });
    };

    // Error while making request, so set src to URL
    xhr.onerror = function() {
      callback(-1);
    }

    xhr.send();
  };

  [].forEach.call(gifs, function(gif) {
    _processGIF(gif.dataset.src, function(preview) {
      // If error loading GIF for whatever reason, set SRC to original URL
      if (preview == -1) {
        console.error("Error loading gif " + gif.dataset.src);
        // This will load the entire GIF
        gif.src = gif.dataset.src;
      } else {
        gif.src = preview;
      }
    });
  });

}

if (typeof module !== 'undefined') {
  module.exports = StaticGIF;
}