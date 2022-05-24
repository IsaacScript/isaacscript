#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Lint each package.
yarn nx run-many --target=lint --all

# Lint monorepo things.
npx ts-node --project "$DIR/tools/tsconfig.json" "$DIR/tools/packageJSONLint.ts"
