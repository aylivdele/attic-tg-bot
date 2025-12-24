FROM node:lts-slim AS base

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

FROM base AS dev

COPY eslint.config.js ./
COPY tsconfig.json ./

USER node

CMD ["sh","-c","npm run dev"]