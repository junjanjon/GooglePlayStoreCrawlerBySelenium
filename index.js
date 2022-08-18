const webdriver = require('selenium-webdriver');
const {Builder, By, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
const TIMEOUT = 5000;
const SLEEPTIME = 5000;

const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('app_id', {
      alias: 'i',
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

    const versionClassName = 'reAt0';
    const versionElement = await driver.wait(until.elementLocated(By.className(versionClassName)), TIMEOUT);
    // NOTE: 要素が空なのでバージョン文字列が入るのを待つ。
    await sleep();
    const version = await versionElement.getText();
    console.log(version);
  } finally {
    driver.quit();
  }
})();
