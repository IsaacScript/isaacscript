#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Step 1 - ESLint
npx eslint .

# Step 2 - Remark
# We set to quiet to output only warnings and errors
# We set to frail to exit with 1 on warnings (for CI)
npx remark --quiet --frail docs

# Step 3 - cspell
npx cspell --no-progress "src/**/*.ts"
npx cspell --no-progress "docs/**/*.md"
