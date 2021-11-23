FROM node:16.13.0-alpine3.14 AS production

WORKDIR /usr/src/frontend

COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .

RUN npm i -g @quasar/cli
RUN yarn
COPY ./frontend/ .
COPY ./.config/.env.prod .env

RUN quasar build

EXPOSE 4000

RUN rm .env
CMD [ "quasar", "serve", "dist/spa", "--history" ]
