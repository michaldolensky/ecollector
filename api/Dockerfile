FROM node:14.17.3-alpine AS development

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

FROM node:14.17.3-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY --from=development /usr/src/api .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]
