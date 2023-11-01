#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

WINDOWS_FILES=$(
  grep \
  --recursive \
  --files-with-matches \
  --binary \
  --perl-regexp \
  --exclude-dir='.git' \
  --exclude-dir='.yarn' \
  --exclude-dir='node_modules' \
  --exclude='*.fnt' \
  --exclude='*.jpg' \
  --exclude='*.png' \
  --exclude='*.pyc' \
  --exclude='*.stb' \
  --exclude='*.ttf' \
  --exclude='*.wav' \
  --exclude='yarn.lock' \
  '\r$' .
) || true
if [[ $WINDOWS_FILES ]]; then
  echo "Files with Windows line-endings were found:"
  echo "$WINDOWS_FILES"
  exit 1
fi
