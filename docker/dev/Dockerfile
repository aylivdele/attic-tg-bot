FROM node:lts-slim AS base

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS dev

USER node

CMD ["sh","-c","npm run dev"]