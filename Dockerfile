FROM ubuntu:latest

RUN mkdir /src \
	&& apt-get install -y curl libfreetype6 libfontconfig python \
	&& curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash - \
	&& apt-get install -y nodejs \
	&& npm install -g phantomjs casperjs express body-parser connect-multiparty \
	&& apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY src/ /src

ENV NODE_PATH /usr/lib/node_modules

EXPOSE 80

CMD node /src/casper-server.js
