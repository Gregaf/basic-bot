FROM node:slim AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --omit=dev

COPY . .

RUN yarn run build

FROM node:slim

RUN groupadd -r app \
    && useradd -r -g app app

RUN mkdir -p /usr/src/app/dist/logs && chown -R app:app /usr/src/app/dist/logs

WORKDIR /usr/src/app/dist

COPY --from=build --chown=app:app /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=app:app /usr/src/app/dist ./dist

USER app

CMD [ "node", "dist/bot.js"]