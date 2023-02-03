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

BUILD_COMMAND="nx run-many --target=build --all $NO_CACHE"
if command -v nx &> /dev/null; then
  # We want to invoke nx directly, if available. (Otherwise, the colors will not work properly.)
  "$BUILD_COMMAND"
else
  # The "nx" command does not work in CI, so we revert to calling Nx through the package manager.
  pnpx "$BUILD_COMMAND"
fi
