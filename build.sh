#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

if [ "$1" == "nocache" ]; then
  NO_CACHE="--skip-nx-cache"
  echo Skipping caching.
else
  NO_CACHE=""
fi

if command -v nx &> /dev/null; then
  # We want to invoke nx directly, if available. (Otherwise, the colors will not work properly.)
  nx run-many --target=build --all $NO_CACHE
else
  # The "nx" command does not work in CI, so we revert to calling Nx through the package manager.
  npx nx run-many --target=build --all $NO_CACHE
fi
