FROM node:16.11.1-alpine3.14 AS development

WORKDIR /usr/src/frontend

COPY package.json .
COPY yarn.lock .

RUN yarn global add @quasar/cli
RUN yarn
COPY . .
RUN quasar build

EXPOSE 8080

FROM node:16.11.1-alpine3.14 as production


