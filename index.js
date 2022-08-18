const webdriver = require('selenium-webdriver');
const {Builder, By, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
const TIMEOUT = 5000;
const SLEEPTIME = 1000;

const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('app_id', {
      demandOption: true,
      default: 'com.amazon.mShop.android.shopping',
      describe: 'app_id',
      type: 'string',
    })
    .argv;
const appId = argv['app_id'];

const sleep = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, SLEEPTIME);
});

(async () => {
  const options = new chrome.Options().headless();
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('https://play.google.com/store/apps/details?id=' + appId);

    const mainClassName = 'qZmL0';
    const mainElement = await driver.wait(until.elementLocated(By.className(mainClassName)), TIMEOUT);
    await mainElement.findElement(By.css('c-wiz > div > section > header > div > div > button')).click();

    const informationsClassName = 'G1zzid';
    const informationsElement = await driver.wait(until.elementLocated(By.className(informationsClassName)), TIMEOUT);
    // NOTE: 要素の中身がまだ空なので待つ。
    await sleep();

    const blockClassName = 'sMUprd';
    const keyClassName = 'q078ud';
    const valueClassName = 'reAt0';
    const blockElements = await informationsElement.findElements(By.className(blockClassName));
    for (const e of blockElements) {
      const key = await e.findElement(By.className(keyClassName)).getText();
      const value = await e.findElement(By.className(valueClassName)).getText();
      console.log(`${key} : ${value}`);
    }
  } finally {
    driver.quit();
  }
})();
