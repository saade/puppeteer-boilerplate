var config = {};

config.addon = {
  "MAP": new Map(),
  "URLS": {"urls": ["http://*/*", "https://*/*"]},
  set state (val) {app.storage.write("state", val)},
  get state () {return app.storage.read("state") || "OFF"}
};
