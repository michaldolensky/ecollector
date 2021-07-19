FROM node:14 AS development

WORKDIR /usr/src/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

FROM node:14 as production


