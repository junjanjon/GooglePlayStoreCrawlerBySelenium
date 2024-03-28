FROM node:18.7
# linux 用の確認環境を作るための Dockerfile

RUN apt-get update && apt-get install -y \
    unzip curl jq

# chromedriver を PATH 以下に配置
ADD scripts/linux/prepare_chromedriver.sh /opt/chrome/
RUN /opt/chrome/prepare_chromedriver.sh
ENV PATH $PATH:/opt/chrome

# google-chrome のインストール
ADD scripts/linux/install_google-chrome.sh /work/init/
RUN /work/init/install_google-chrome.sh
