# Offline Docker demo

The release image contains the Express API, Swagger UI, and a disposable
SQLite database. It starts with an empty database and requires no external
service.

```sh
docker pull ghcr.io/amrabdelhalim-labs/api-movies-e1:v1.0.0
docker run --rm -p 3000:3000 \
  ghcr.io/amrabdelhalim-labs/api-movies-e1:v1.0.0
```

Open `http://localhost:3000/api-docs` for the interactive API explorer.
The embedded JWT signing value is intentionally demo-only and must not be used
for a production deployment.
