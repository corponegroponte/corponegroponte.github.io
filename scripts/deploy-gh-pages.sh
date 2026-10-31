#!/usr/bin/env bash
#
# Construye el sitio y lo publica en la rama gh-pages, que es la que sirve
# GitHub Pages en https://corponegroponte.github.io/
#
# Uso:
#   bash scripts/deploy-gh-pages.sh              # usa el remoto "origin"
#   REMOTE=<url> bash scripts/deploy-gh-pages.sh # usa otra URL de remoto
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

REMOTE="${REMOTE:-$(git remote get-url origin)}"
BRANCH="${BRANCH:-gh-pages}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "==> Build del cliente"
pnpm build:client

if [ ! -f dist/public/index.html ]; then
  echo "ERROR: dist/public/index.html no existe; el build no generó el sitio." >&2
  exit 1
fi

echo "==> Preparando rama $BRANCH"
cp -R dist/public/. "$WORK/"
cd "$WORK"
git init -q -b "$BRANCH"
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-Corporación Nicholas Negroponte}" \
    -c user.email="${GIT_AUTHOR_EMAIL:-riverosmejiamiguel@gmail.com}" \
    commit -q -m "deploy: sitio estático $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "==> Publicando en $REMOTE ($BRANCH)"
git push --force "$REMOTE" "$BRANCH"

echo "==> Listo. GitHub Pages publicará el cambio en unos segundos."
