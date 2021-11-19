#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# The latest version of some ESLint plugins require Node.js v16
NODE_VERSION=$(node --version | cut -c 2-3)
if (($NODE_VERSION < 16)); then
  echo "error: requires Node.js version 16"
  exit 1
fi

SECONDS=0

# Since all ESLint errors are set to warnings,
# we set max warnings to 0 so that warnings will fail in CI
cd "$DIR"
npx eslint --max-warnings 0 "$DIR/src"

# Check for unused exports
# The "--error" flag makes it return an error code of 1 if unused exports are found
# We ignore exports defined in the index.ts file since those are intended to be consumed by
# end-users
npx ts-prune --error --ignore index.ts

echo "Successfully linted in $SECONDS seconds."
