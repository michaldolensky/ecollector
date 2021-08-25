FROM node:14.17.3-alpine AS development

WORKDIR /usr/src/frontend

COPY package.json .
COPY yarn.lock .

RUN yarn global add @quasar/cli
RUN yarn
COPY . .
RUN quasar build

EXPOSE 8080

FROM node:14.17.3-alpine as production


