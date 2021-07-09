FROM node:14 AS development

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

FROM node:14 as production


