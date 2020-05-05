const { Client } = require("./index");
const { ReactDevTools } = require("./extensions");
const chromium = require("chromium");

const client = new Client({
  puppeteer: {
    headless: false,
    executablePath: chromium.path,
    args: [
      `--disable-extensions-except=${ReactDevTools}`,
      `--load-extension=${ReactDevTools}`,
    ],
  },
});

client.on("initialized", () => console.log(`Eat Sleep Code Repeat!`));

client.initialize();
