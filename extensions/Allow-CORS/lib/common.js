var action = function () {
  config.addon.state = config.addon.state === "ON" ? "OFF" : "ON";
  /*  */
  app.webRequest();
  app.button.badge(config.addon.state);
  app.button.title("Access-Control-Allow-Origin: " + config.addon.state);
};

config.onBeforeSendHeaders = function (info) {
  let ACRH = info.requestHeaders.find(e => e.name.toLowerCase() === "access-control-request-headers");
  if (ACRH) config.addon.MAP.set(info.requestId, ACRH.value);
};

config.onHeadersReceived = function (info) {
  let ACAOM = info.responseHeaders.filter(e => e.name.toLowerCase() !== 'access-control-allow-origin' && e.name.toLowerCase() !== 'access-control-allow-methods');
	ACAOM.push({'name': 'Access-Control-Allow-Origin','value': '*'});
	ACAOM.push({'name': 'Access-Control-Allow-Methods', 'value': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'});
  /*  */
  if (config.addon.MAP.has(info.requestId)) {
    ACAOM.push({'name':'Access-Control-Allow-Headers', 'value': config.addon.MAP.get(info.requestId)});
    config.addon.MAP.delete(info.requestId);
  }
  /*  */
	return {"responseHeaders": ACAOM};
};

window.setTimeout(function () {
  app.button.badge(config.addon.state);
  app.button.title("Access-Control-Allow-Origin: " + config.addon.state);
}, 300);

app.webRequest();
app.button.click(action);
app.Hotkey(function (e) {if (e === "_mode") action()});
