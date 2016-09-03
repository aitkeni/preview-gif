preview-gif
===
Download and display only the first frame of an animated GIF.

Use when you want to display a static preview image of the first frame of an animated GIF on the frontend without downloading the whole GIF. 

If that's all you want, it is potentially easier than solutions like using a backend service like GraphicsMagick to download the full GIF then extract the first frame or a frontend library like [buzzfeed/libgif-js](https://github.com/buzzfeed/libgif-js) to download the full GIF, parse it, and show the first frame.

Works by downloading the GIF one part at a time, inspecting the bytes to look for an end of frame, and either stopping download and displaying first frame if reached, or continuing to download another chunk and repeat.

Forked from [voxmedia/vax-fig](https://github.com/voxmedia/vax-fig) to remove Ruby and jQuery depencencies and to turn into an npm package.

Usage
====
All GIFs you want to display static on the page must have a "data-src" attribute with the source URL. Do not include an actual "src" or else the browser will download the entire file, thus defeating the purpose of this plugin.
```
<img data-src="some.gif" class="preview-gif" />
```

Then, call:
```
PreviewGIF('.preview-gif');
```

where the argument passed to the function is a selector of the [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) format matching GIF <img> elements to preview. <img> elements that already have an `src` attribute; i.e. have already been processed by the PreviewGIF function, will be ignored. 

Demo
====

See `demo/index.html`.

Caveats
====
- Probably will not work on old versions of IE

## Authors

- [@jesse](https://github.com/jesse)
- GIF decoder borrowed from [@deanm](https://github.com/deanm)'s [omggif](https://github.com/deanm/omggif/blob/master/omggif.js) plugin
- Base64 encoder borrowed from [n1k0](https://github.com/n1k0) via [http://stackoverflow.com/a/7372816](http://stackoverflow.com/a/7372816)

## License 

Copyright (c) 2014, Vox Media, Inc. with modifications by Harrison Liddiard
All rights reserved.

BSD license

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

