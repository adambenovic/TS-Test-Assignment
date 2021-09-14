FROM node:16.9-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install --quiet
COPY . .
