FROM node:14.18.1 AS buildclient

WORKDIR /client

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn
COPY ./frontend/ .
COPY ./.config/.env.demo .env

RUN node node_modules/@quasar/app/bin/quasar-build

FROM node:14.18.1 AS development

WORKDIR /usr/src/api

COPY --from=buildclient ./client/dist/spa ./assets/client/

COPY ./api/package*.json ./
COPY ./api/ .

RUN npm install

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

FROM node:14.18.1-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY --from=development /usr/src/api .

EXPOSE 3000

# run app
CMD [ "node", "dist/main.js"]
