#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

if [ "$1" == "nocache" ]; then
  NO_CACHE="--skip-nx-cache"
  echo Skipping caching.
else
  NO_CACHE=""
fi

# Check "package.json" files.
# (The script must use ESM because the "sort-package-json" dependency requires ESM.)
npx tsx "$DIR/scripts/packageJSONLint.mts"

# Ensure that the template files are up to date.
# npx isaacscript@latest check --ignore ".eslintrc.cjs,ci.yml"

if [ "$1" != "json" ]; then
  echo "Linting scripts..."
  npx eslint --max-warnings 0 scripts

  echo "Linting each package in the monorepo..."
  # (We cannot put the nx arguments inside of a variable.)
  if command -v nx &> /dev/null; then
    # We want to invoke nx directly, if available. (Otherwise, the colors will not work properly.)
    nx run-many --target=lint --all $NO_CACHE
  else
    # The "nx" command does not work in CI, so we revert to calling Nx through the package manager.
    npx nx run-many --target=lint --all $NO_CACHE
  fi

  echo "Checking markdown..."
  npx markdownlint .
fi

echo "Successfully linted in $SECONDS seconds."
