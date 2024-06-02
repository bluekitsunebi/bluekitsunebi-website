module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            "fs": false,  // This tells Webpack not to try resolving 'fs'
            "path": require.resolve("path-browserify")  // This provides a browser-compatible version of 'path'
          }
        }
      }
    }
};
