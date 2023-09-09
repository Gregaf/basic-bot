FROM node:slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --omit=dev

COPY . .

RUN yarn run build

WORKDIR /usr/src/app/dist

CMD [ "node", "bot.js"]