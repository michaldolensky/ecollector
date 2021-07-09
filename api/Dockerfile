FROM node:14 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN yarn install --only=development

COPY . .

RUN yarn build
