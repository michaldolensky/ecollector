FROM node:14.18.1-alpine3.14 AS production

WORKDIR /usr/src/frontend

COPY package.json .
COPY yarn.lock .

RUN npm i -g @quasar/cli
RUN yarn
COPY . .
RUN quasar build

EXPOSE 4000

CMD [ "quasar", "serve", "dist/spa", "--history" ]
