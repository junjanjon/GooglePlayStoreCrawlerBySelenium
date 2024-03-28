#!/bin/bash -xe
# プラットフォームに応じて、最新のChromeDriverをダウンロードするスクリプト

SCRIPT_DIR=$(dirname "$0")
SCRIPT_DIR=$(cd "${SCRIPT_DIR}"; pwd)
cd "${SCRIPT_DIR}/../.."

curl -s https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json -o last-known-good-versions-with-downloads.json
MAC64_DIR_NAME="chromedriver-mac-x64"
MAC64_URL=$(< last-known-good-versions-with-downloads.json jq -r '.channels.Stable.downloads.chromedriver[] | select(.platform == "mac-x64") | .url')
LINUX64_DIR_NAME="chromedriver-linux64"
LINUX64_URL=$(< last-known-good-versions-with-downloads.json jq -r '.channels.Stable.downloads.chromedriver[] | select(.platform == "linux64") | .url')
DRIVER_BIN_FILE=./chromedriver

if [ "$(uname)" = "Darwin" ]; then
	CHROME_DIR_FILE=${MAC64_DIR_NAME}
	CHROME_DRIVER_URL=${MAC64_URL}
else
	CHROME_DIR_FILE=${LINUX64_DIR_NAME}
	CHROME_DRIVER_URL=${LINUX64_URL}
fi

# clean up old files
rm -rf ${DRIVER_BIN_FILE}
rm -rf "${CHROME_DIR_FILE}"
rm -rf "${CHROME_DIR_FILE}.zip"
curl -O -L "${CHROME_DRIVER_URL}"
unzip "${CHROME_DIR_FILE}.zip"
mv ${CHROME_DIR_FILE}/chromedriver ${DRIVER_BIN_FILE}
chmod u+x ${DRIVER_BIN_FILE}
# clean up
rm -rf "${CHROME_DIR_FILE}.zip"
rm last-known-good-versions-with-downloads.json
