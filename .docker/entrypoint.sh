#!/bin/sh

set -e

echo "======================================"
echo "🚀 Starting drizzle-api"
echo "======================================"

echo "🌎 NODE_ENV: ${NODE_ENV:-development}"
echo "🔌 PORT: ${PORT:-3001}"

echo "🚀 Starting NestJS..."

exec npm run start:dev