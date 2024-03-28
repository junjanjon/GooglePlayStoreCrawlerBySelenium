#!/usr/bin/env node
const webdriver = require('selenium-webdriver');
const {Builder, By, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
const TIMEOUT = 5000;
const SLEEPTIME = 1000;

const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('app_id', {
      demandOption: true,
      default: 'com.amazon.mShop.android.shopping',
      describe: 'Android app id',
      type: 'string',
    })
    .option('headless', {
      default: true,
      describe: 'headless mode (`--headless` or `--no-headless`, Default `--headless`)',
      type: 'boolean',
    })
    .option('format', {
      default: 'text',
      describe: 'Output format ("text" or "json", Default "text")',
      type: 'string',
    })
    .argv;
const appId = argv['app_id'];
const headless = argv['headless'];
const format = argv['format'];

const sleep = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, SLEEPTIME);
});

(async () => {
  const options = new chrome.Options();
  if (headless) {
    options.addArguments('--headless=new');
  }
  options.addArguments([
    'no-sandbox',
    'disable-dev-shm-usage',
  ]);
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('https://play.google.com/store/apps/details?id=' + appId);

    const mainClassName = 'qZmL0';
    const mainElement = await driver.wait(until.elementLocated(By.className(mainClassName)), TIMEOUT);
    // NOTE: ボタンが画面内になるようにスクロールする。
    const targetRect = await mainElement.getRect();
    const y = targetRect.y;
    driver.executeScript(`window.scrollTo(0, ${y});`);
    await mainElement.findElement(By.css('c-wiz > div > section > header > div > div > button')).click();

    const informationsClassName = 'G1zzid';
    const informationsElement = await driver.wait(until.elementLocated(By.className(informationsClassName)), TIMEOUT);
    // NOTE: 要素の中身がまだ空なので待つ。
    await sleep();

    const blockClassName = 'sMUprd';
    const keyClassName = 'q078ud';
    const valueClassName = 'reAt0';
    const blockElements = await informationsElement.findElements(By.className(blockClassName));
    if (format === 'text') {
      for (const e of blockElements) {
        const key = await e.findElement(By.className(keyClassName)).getText();
        const value = await e.findElement(By.className(valueClassName)).getText();
        console.log(`${key} : ${value}`);
      }
    } else if (format === 'json') {
      const data = {};
      for (const e of blockElements) {
        const key = await e.findElement(By.className(keyClassName)).getText();
        const value = await e.findElement(By.className(valueClassName)).getText();
        data[key] = value;
      }
      const str = JSON.stringify(data);
      console.log(str);
    }
  } finally {
    driver.quit();
  }
})();
