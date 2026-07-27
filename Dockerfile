FROM node:24-bookworm-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential python3 \
    && npm_config_build_from_source=true npm ci --omit=dev \
    && apt-get purge -y --auto-remove build-essential python3 \
    && rm -rf /var/lib/apt/lists/*
COPY . .

ENV NODE_ENV=production \
    PORT=3000 \
    DB_FILE_NAME=/tmp/movies-demo.sqlite

RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

ENTRYPOINT ["/app/docker/entrypoint.sh"]
