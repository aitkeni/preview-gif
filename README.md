# preview-gif

Download and return image data for the first frame of an animated GIF.

Use when you want to display a static preview image of the first frame of an animated GIF on the frontend without downloading the entire GIF. 

If you don't need to parse the whole GIF, this method is less complicated and faster than using a backend service like GraphicsMagick to download the full GIF and extract the first frame or using a frontend library like [buzzfeed/libgif-js](https://github.com/buzzfeed/libgif-js) to download and parse the full GIF, pause on the first frame.

Works by downloading the GIF one part at a time, inspecting the bytes to look for an end of frame, and either stopping download and returning first frame data if reached, or continuing to download another chunk and repeat.

Forked from [voxmedia/vax-fig](https://github.com/voxmedia/vax-fig) to remove Ruby and jQuery depencencies and to turn into an npm package.

## Usage

Install: `npm install preview-gif`

`PreviewGIF` is a function that takes two parameters:

1. URL of an animated GIF
2. Callback function of the form `callback(err, imageData)`. `err` either `null` or an object with `type` and `message` properties. `imageData`, if there is no error, is a base64-encoded string of the first frame of image data that can be assigned directly to an image's `src` attribute to display it.

### Example

#### HTML:

```html
<img data-src="some.gif" id="some-gif" />
<!-- Important! Don't put the GIF url in the `src` attribute, or the browser
     will automatically download the full GIF which defeats the purpose of
     this tool -->
```

#### JavaScript:

```javascript
const PreviewGIF = require('preview-gif');

const gif = document.getElementById('some-gif');

PreviewGIF(gif.dataset.src, (err, imageData) => {
  if (err) console.error(err);
  else gif.src = imageData;
});
```

Demo
====

See `demo/index.html`.

Caveats
====
- Probably will not work in old versions of IE.

## Authors

- [@jesse](https://github.com/jesse)
- GIF decoder borrowed from [@deanm](https://github.com/deanm)'s [omggif](https://github.com/deanm/omggif/blob/master/omggif.js) plugin
- Base64 encoder borrowed from [n1k0](https://github.com/n1k0) via [http://stackoverflow.com/a/7372816](http://stackoverflow.com/a/7372816)
- Core functionality extracted into an npm module that doesn't require jQuery by [@liddiard](https://github.com/liddiard)

## License 

Copyright (c) 2014, Vox Media, Inc. with modifications by Harrison Liddiard
All rights reserved.

BSD license

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

