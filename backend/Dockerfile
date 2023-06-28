FROM node:18
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci
COPY . /usr/src/app
EXPOSE 9000
CMD [ "npm", "start" ]