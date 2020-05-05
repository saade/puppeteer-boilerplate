const path = require("path");

const resolve = (extension) => path.resolve(__dirname, extension);

module.exports = {
  ReactDevTools: resolve("React-Developer-Tools"),
  CORS: resolve("Allow-CORS"),
};
