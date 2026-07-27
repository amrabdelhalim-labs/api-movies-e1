#!/bin/sh
set -eu

database=/tmp/movies-demo.sqlite
JWT_SECRET=${JWT_SECRET:-offline-demo-jwt-secret-not-for-production}
export JWT_SECRET

if [ -e "$database" ]; then
  unlink "$database"
fi

exec node index.js
