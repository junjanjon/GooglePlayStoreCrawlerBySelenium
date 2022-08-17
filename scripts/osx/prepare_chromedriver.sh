#!/bin/bash -xe

SCRIPT_DIR=$(dirname "$0")
SCRIPT_DIR=$(cd "${SCRIPT_DIR}"; pwd)
cd "${SCRIPT_DIR}/../.."

CHROME_DRIVER_VERSION=$(curl -s http://chromedriver.storage.googleapis.com/LATEST_RELEASE)
# CHROME_VERSION=google-chrome-stable
MAC64_FILE=chromedriver_mac64.zip
MAC64_URL="http://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/${MAC64_FILE}"
LINUX64_FILE=chromedriver_linux64.zip
LINUX64_URL="http://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/${LINUX64_FILE}"
DRIVER_BIN_FILE=./chromedriver

if [ "$(uname)" = "Darwin" ]; then
	CHROME_DRIVER_FILE=${MAC64_FILE}
	CHROME_DRIVER_URL=${MAC64_URL}
else
	CHROME_DRIVER_FILE=${LINUX64_FILE}
	CHROME_DRIVER_URL=${LINUX64_URL}
fi

echo $CHROME_DRIVER_FILE

rm -rf ${DRIVER_BIN_FILE}
curl -O -L "${CHROME_DRIVER_URL}"
unzip ${CHROME_DRIVER_FILE}
chmod u+x ${DRIVER_BIN_FILE}
rm ${CHROME_DRIVER_FILE}
