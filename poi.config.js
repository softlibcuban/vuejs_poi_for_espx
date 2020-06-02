module.exports = (options, req) => ({
  dist: "dist/web",
  entry: "./src/index.js",
  homepage: "./", // overwrite homepage from package.json (to use relative URLs)
  html: {
    template: "./index.html"
  }
  // webpack (config) {
  //   if(options.analyze){
  //     config.plugins.push(
  //       new BundleAnalyzer()
  //     )
  //   }
  //   config.module.rules.push ({
  //     test: /\.md$/,
  //     loaders: ['babel-loader', "sass-loader"],
  //   });
  //   return config;
  // }
});
