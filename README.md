# Base project, to create a website to embed in a micro espX

## Installation process

- git clone https://github.com/softlibcuban/vuejs_poi_for_espx.git
- cd vuejs_poi_for_espx
- npm i
- to start in development mode npm run dev
- to generate the bundle 'npm run process'

If you want the build to generate in the folder of your project change the output folder in the file (gulpfile) [./ gulpfile]

How to use

bundle
AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "Ok");
    response->addHeader("Content-Encoding", "gzip");
    request->send(SPIFFS, "/bundle.gz", String(), false);

.h
#include "static/bundle.gz.h"
...
AsyncWebServerResponse *response = request->beginResponse_P(200, "text/html", bundle_gz, bundle_gz_len);
response->addHeader("Content-Encoding", "gzip");

### EVERYBODY

- [ ] Improve this help with more time.
- [x] Add sample components for the main projects of the group
- [ ] Add implementation for websocket use
- [ ] Add option to use an api rest in esp
- [ ] Standardize and be able to pretty the code
- [ ] Add custom css to improve final file size
- [ ] .....
