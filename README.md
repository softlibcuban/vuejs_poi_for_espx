# Base project, to create a website to embed in a micro espX

## Installation process

- git clone https://github.com/softlibcuban/vuejs_poi_for_espx.git
- cd vuejs_poi_for_espx
- npm i
- to start in development mode npm run dev
- to generate the bundle 'npm run process'

If you want the build to generate in the folder of your project change the output folder in the file (gulpfile) [./ gulpfile]

How to use

Using bundle.gz file:
AsyncWebServer server(80);
server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
        AsyncWebServerResponse* response = request->beginResponse(SPIFFS, "/bundle.gz", "text/html");
        response->addHeader("Content-Encoding", "gzip");
        request->send(response);
    });
    
Using bundle.h file:
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
