#!/bin/bash
set -e
docker compose -f compose.production.multi.yml build
docker compose -f compose.production.multi.yml up -d
