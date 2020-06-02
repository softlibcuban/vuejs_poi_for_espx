const fs = require("fs");
const gulp = require("gulp");
const del = require("del");

const dataFolder = "dist/arduino/";

gulp.task("clean", function() {
  del([dataFolder + "*"]);
  return true;
});

var createh = function(dir, name) {
  var source = dir + name + ".gz";
  var destination = dataFolder + name + ".gz.h";

  var wstream = fs.createWriteStream(destination);
  wstream.on("error", function(err) {
    console.log(err);
  });

  var data = fs.readFileSync(source);

  wstream.write("#define " + name + "_gz_len " + data.length + "\n");
  wstream.write("const uint8_t " + name + "_gz[] PROGMEM = {");

  for (i = 0; i < data.length; i++) {
    if (i % 1000 == 0) wstream.write("\n");
    wstream.write("0x" + ("00" + data[i].toString(16)).slice(-2));
    if (i < data.length - 1) wstream.write(",");
  }

  wstream.write("\n};");
  wstream.end();

  //del();
  return true;
};

gulp.task("buildfs_embeded", function(done) {
  createh("dist/arduino/", "bundle");
  done();
});

gulp.task("default", gulp.series(["buildfs_embeded"]));
