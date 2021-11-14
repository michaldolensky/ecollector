FROM node:14.18.1-alpine3.14 AS buildclient

WORKDIR /client

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn
COPY ./frontend/ .



RUN node node_modules/@quasar/app/bin/quasar-build

FROM nginx AS production
COPY --from=buildclient ./client/dist/spa /usr/share/nginx/html
COPY ./nginx/demo.vhost.template /etc/nginx/conf.d/vhost.template

EXPOSE 80
