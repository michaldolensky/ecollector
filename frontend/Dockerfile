#https://discord.com/channels/415874313728688138/856517489542561792/914889910215905311
FROM node:16.13.1-alpine3.14 AS develop-stage
WORKDIR /usr/src/frontend
COPY package.json .
COPY yarn.lock .
RUN npm i -g @quasar/cli
COPY . .

FROM develop-stage as local-deps-stage
RUN yarn

FROM local-deps-stage as build-stage
ARG GRAPHQL_URL
ARG SERVER_URL
ARG SERVER_URL_API

ENV GRAPHQL_URL=$GRAPHQL_URL
ENV SERVER_URL=$SERVER_URL
ENV SERVER_URL_API=$SERVER_URL_API
RUN quasar build

FROM node:16.13.1-alpine3.14 AS production-stage
WORKDIR /usr/src/frontend
COPY --from=build-stage /usr/src/frontend .
#COPY --from=build-stage /src/dist/ssr .
#RUN yarn
#EXPOSE 3000
#CMD ["node", "index.js"]

EXPOSE 4000
RUN npm i -g @quasar/cli

CMD [ "quasar", "serve", "dist/spa", "--history" ]
