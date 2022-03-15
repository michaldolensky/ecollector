FROM node:17.7.1-alpine3.14 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

FROM node:17.7.1-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]
