#!/bin/sh

set -e

tail -n +2 Makefile | tee Makefile

make migrate/up

exec "$@"