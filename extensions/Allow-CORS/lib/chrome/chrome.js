var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
app.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};
chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});
app.Hotkey = function (callback) {chrome.commands.onCommand.addListener(function (e) {if (e === "toggle-default-mode") callback("_mode")})};

chrome.runtime.onInstalled.addListener(function (e) {
  window.setTimeout(function () {
    if (e.reason === "install") {
      app.tab.open(app.homepage() + '?v=' + app.version() + "&type=" + e.reason);
    }
  }, 3000);
});

app.webRequest = function () {
  chrome.webRequest.onHeadersReceived.removeListener(config.onHeadersReceived);
  chrome.webRequest.onBeforeSendHeaders.removeListener(config.onBeforeSendHeaders);
  /*  */
  if (config.addon.state === "ON") {
    chrome.webRequest.onHeadersReceived.addListener(config.onHeadersReceived, config.addon.URLS, ["blocking", "responseHeaders"]);
    chrome.webRequest.onBeforeSendHeaders.addListener(config.onBeforeSendHeaders, config.addon.URLS, ["blocking", "requestHeaders"]);
  }
};

app.button = {
  "title": function (text) {chrome.browserAction.setTitle({"title": text})},
  "click": function (callback) {chrome.browserAction.onClicked.addListener(callback)},
  "badge": function (state) {
    chrome.browserAction.setIcon({
      "path": {
        "16": "../../data/icons" + (state ? "/" + state : '') + "/16.png",
        "32": "../../data/icons" + (state ? "/" + state : '') + "/32.png",
        "48": "../../data/icons" + (state ? "/" + state : '') + "/48.png",
        "64": "../../data/icons" + (state ? "/" + state : '') + "/64.png"
      }
    });
  }
};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();
