#!/bin/bash
#
# Runs on the web host, from cron, every few minutes. It looks at the newest
# release of the site on GitHub and, when that is not the version already
# installed, downloads it and copies it into the folder of each domain.
#
# The host does not accept uploads from GitHub, so the host fetches instead.
# See v2/docs/deployment.md for how this is set up.
#
# It writes nothing to the screen, so cron sends no mail. What it did is in
# ~/.damjanko-deploy/deploy.log.
#
# For testing, three settings can be replaced through the environment:
#   DEPLOY_SOURCE   where version.txt, site.tar.gz and site.tar.gz.sha256 are
#   DEPLOY_TARGETS  the folders to install into, separated by spaces
#   DEPLOY_STATE    where the lock, the log and the installed version are kept

set -euo pipefail
umask 022

source_url="${DEPLOY_SOURCE:-https://github.com/Stari89/damjanko-homepage/releases/latest/download}"
targets="${DEPLOY_TARGETS:-$HOME/domains/damjanko.com/public_html $HOME/domains/damjanko.si/public_html}"
state="${DEPLOY_STATE:-$HOME/.damjanko-deploy}"

mkdir -p "$state"
log_file="$state/deploy.log"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $*" >> "$log_file"
}

fail() {
  log "FAILED: $*"
  exit 1
}

# Only one run at a time. A lock left behind by a run that died is removed
# after half an hour.
lock="$state/lock"
if ! mkdir "$lock" 2> /dev/null; then
  if [ -n "$(find "$lock" -maxdepth 0 -mmin +30 2> /dev/null)" ]; then
    rmdir "$lock" 2> /dev/null || true
    mkdir "$lock" 2> /dev/null || exit 0
  else
    exit 0
  fi
fi

work=""
cleanup() {
  if [ -n "$work" ]; then
    rm -rf "$work"
  fi
  rmdir "$lock" 2> /dev/null || true
  # The log keeps its last 500 lines.
  if [ -f "$log_file" ] && [ "$(wc -l < "$log_file")" -gt 500 ]; then
    tail -n 500 "$log_file" > "$log_file.new" && mv "$log_file.new" "$log_file"
  fi
}
trap cleanup EXIT

work="$(mktemp -d "$state/work.XXXXXX")"

# $1 file name at the source, saved under the same name in the work folder
fetch() {
  curl --silent --show-error --fail --location --max-time 120 \
    --output "$work/$1" "$source_url/$1" 2> "$work/curl-error" ||
    fail "could not download $1: $(cat "$work/curl-error")"
}

fetch version.txt
version="$(tr -d '[:space:]' < "$work/version.txt")"
if ! [[ "$version" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  fail "version.txt does not hold a version: \"${version:0:40}\""
fi

installed="$(cat "$state/version" 2> /dev/null || true)"
if [ "$version" = "$installed" ]; then
  exit 0
fi

log "Found $version, installed is ${installed:-nothing}"

fetch site.tar.gz
fetch site.tar.gz.sha256
(cd "$work" && sha256sum --check --status site.tar.gz.sha256) ||
  fail "site.tar.gz does not match its checksum"

mkdir "$work/site"
tar -xzf "$work/site.tar.gz" -C "$work/site" || fail "could not unpack site.tar.gz"

# A build that is not complete is never installed.
for needed in index.html sl/index.html .htaccess service-worker.js assets; do
  [ -e "$work/site/$needed" ] || fail "the build has no $needed"
done
grep --quiet --fixed-strings "${version#v}" "$work/site/index.html" ||
  fail "index.html does not show version ${version#v}"

for target in $targets; do
  [ -d "$target" ] || fail "the folder $target does not exist"
done

for target in $targets; do
  # Order: the new assets, then the pages that use them, then the old assets
  # go. Nothing outside assets/ is ever deleted: other folders live beside
  # the site.
  mkdir -p "$target/assets"
  cp -R "$work/site/assets/." "$target/assets/"
  (cd "$work/site" && tar -cf - --exclude=./assets .) | (cd "$target" && tar -xf -)
  for old in "$target/assets"/* "$target/assets"/.[!.]*; do
    [ -e "$old" ] || continue
    if [ ! -e "$work/site/assets/$(basename "$old")" ]; then
      rm -rf "$old"
    fi
  done
  log "Installed $version into $target"
done

echo "$version" > "$state/version"
log "Done: $version"
