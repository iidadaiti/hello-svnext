FROM node:22.2.0-bookworm-slim AS base
ENV PNPM_HOME "/pnpm"
ENV PATH "$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT 0
RUN corepack enable \
    && corepack enable npm pnpm

FROM base as fetcher
WORKDIR /app
COPY --chown=node:node ./app/pnpm-lock.yaml /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --prod ./

FROM base AS deps
WORKDIR /app
COPY --chown=node:node --from=fetcher /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --chown=node:node ./app/package.json /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS dev
WORKDIR /app
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get install -qq --no-install-recommends \
    tini \
    && rm -rf /var/lib/apt/lists/*
COPY --chown=node:node ./app /app
COPY --chown=node:node --from=fetcher /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --chown=node:node --from=deps /app/node_modules /app/node_modules
EXPOSE 5173
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["pnpm", "run", "dev"]
USER node
