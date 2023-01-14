#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Checking "package.json" files
#npx ts-node --require "tsconfig-paths/register" --project "$DIR/tools/tsconfig.json" "$DIR/tools/packageJSONLint.ts"

if [ "$1" != "json" ]; then
  echo "Linting scripts..."
  npx eslint tools

  echo "Linting each package in the monorepo..."
  if command -v nx &> /dev/null; then
    # We want to invoke nx directly, if available. (Otherwise, the colors will not work properly.)
    nx run-many --target=lint --all $NO_CACHE
  else
    # The "nx" command does not work in CI, so we revert to calling Nx through Yarn.
    yarn nx run-many --target=lint --all $NO_CACHE
  fi

  echo "Checking markdown..."
  npx markdownlint .
fi

echo "Successfully linted in $SECONDS seconds."
