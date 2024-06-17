

ARG NODE_VERSION=20.13.1

FROM node:${NODE_VERSION}-slim as base

ARG PORT=80

ENV NODE_ENV=production

WORKDIR /src

FROM base as build

COPY --link package.json pnpm-lock.yaml .
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
