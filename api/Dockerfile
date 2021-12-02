FROM node:16.13.1-alpine3.14 AS development

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

FROM node:16.13.1-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY --from=development /usr/src/api .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]
