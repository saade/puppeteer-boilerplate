"use strict";

const EventEmitter = require("events");
const puppeteer = require("puppeteer-extra");

const Util = require("./util/Util");
const {
  URL,
  UserAgentWeb,
  UserAgentMobile,
  DefaultOptions,
  Events,
} = require("./Constants");

puppeteer.use(require("puppeteer-extra-plugin-stealth")());

/**
 * Starting point for interacting with my app.
 * @extends {EventEmitter}
 * @fires Client#event_name
 */
class Client extends EventEmitter {
  constructor(options = {}) {
    super();

    this.options = Util.mergeDefault(DefaultOptions, options);

    this.pupBrowser = null;
    this.pupPage = null;
  }

  async initialize() {
    const browser = await puppeteer.launch(this.options.puppeteer);
    const page = (await browser.pages())[0];

    page.setUserAgent(UserAgentWeb); // UserAgentMobile

    /**
     * Fired on every new document (aka. tab)
     */
    await page.evaluateOnNewDocument(() => {});

    /**
     * Fired once on page load
     */
    page.on("load", () => {});

    await page.goto(URL, { waitUntil: "networkidle2" });

    this.pupBrowser = browser;
    this.pupPage = page;

    /**
     * Emitted when the client has successfully initialized.
     * @event Client#initialized
     */
    this.emit(Events.INITIALIZED);
  }

  /**
   * Closes the client
   */
  async destroy() {
    await this.pupBrowser.close();
  }
}

module.exports = Client;
