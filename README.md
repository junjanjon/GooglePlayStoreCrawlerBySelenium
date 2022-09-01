# GooglePlayStoreCrawlerBySelenium

```bash
# https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping

$ npx github:junjanjon/GooglePlayStoreCrawlerBySelenium --app_id com.amazon.mShop.android.shopping
Version : 24.14.0.100
Updated on : Aug 10, 2022
Requires Android : 8.0 and up
Downloads : 500,000,000+ downloads
Content rating : Rated for 12+ • Parental Guidance Recommended Learn more
Permissions : View details
Interactive elements : Users Interact, Digital Purchases
Released on : Jan 15, 2015
Offered by : Amazon Mobile LLC
```

GooglePlayStoreCrawlerBySelenium is A crawler that retrieves Android app information from the [Google Play Store](https://play.google.com/store/apps).

# Usage

Use `npx` command.

## Required

- Google Chrome
- [chromedriver](https://chromedriver.chromium.org/home)
  - Include in `PATH`.

## Command

```bash
npx github:junjanjon/GooglePlayStoreCrawlerBySelenium --app_id com.amazon.mShop.android.shopping
```

### Option

```
Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --app_id       Android app id
              [string] [required] [default: "com.amazon.mShop.android.shopping"]
  --no_headless  no headless                          [boolean] [default: false]
  --format       Output format ("text" or "json", Default "text")
                                                      [string] [default: "text"]
```
