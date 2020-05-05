const { Client } = require("./index");
const { ReactDevTools } = require("./extensions");
const chromium = require("chromium");

(async () => {
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

  console.log(`Eat Sleep Code Repeat!`);
})();
