FROM node:lts-slim AS base

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS prod

RUN npm run build

USER node

CMD ["sh","-c","npm run prod"]