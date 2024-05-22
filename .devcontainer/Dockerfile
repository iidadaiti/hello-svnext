FROM node:22.2.0-bookworm-slim AS base
ENV PNPM_HOME "/pnpm"
ENV PATH "$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT 0
RUN corepack enable \
    && corepack enable npm pnpm

FROM base AS dev
WORKDIR /app
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get install -qq --no-install-recommends \
    git \
    openssh-server \
    tini \
    && rm -rf /var/lib/apt/lists/*
COPY --chown=node:node . /app
ENTRYPOINT ["/usr/bin/tini", "--"]
USER node
