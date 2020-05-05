"use strict";

require("dotenv").config({
  path:
    process.env.NODE_ENV === "dev"
      ? require("path").resolve(__dirname, ".env.dev")
      : require("path").resolve(__dirname, ".env"),
});

module.exports = {
  Client: require("./src/Client"),
  version: require("./package.json").version,
};
