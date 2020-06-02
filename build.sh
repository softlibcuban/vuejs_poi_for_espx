#!/bin/bash
set -e


build_webui() {
    # Build system uses gulpscript.js to build web interface
    npm run gen

    if [ ! -e node_modules/gulp/bin/gulp.js ]; then
        echo "--------------------------------------------------------------"
        echo "Installing dependencies..."
        npm install --only=dev
    fi

    # Recreate web interface (espurna/data/index.html.*.gz.h)
    echo "--------------------------------------------------------------"
    echo "Building web interface..."
    node node_modules/gulp/bin/gulp.js || exit
}


build_webui
