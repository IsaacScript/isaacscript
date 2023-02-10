#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
# "--loglevel warn" makes it only output errors.
npx prettier --loglevel warn --ignore-path="$DIR/../../.prettierignore" --check .

# Use ESLint to lint the TypeScript.
# "--max-warnings 0" makes warnings fail in CI, since we set all ESLint errors to warnings.
npx eslint --max-warnings 0 .

# Check for unused exports.
# "--error" makes it return an error code of 1 if unused exports are found.
# We ignore exports defined in the "index.ts" file since those are intended to be consumed by
# end-users.
npx ts-prune --error --ignore "index.ts"

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
npx cspell --no-progress --no-summary .

# Check the API dictionary.
# (Commented out because it causes race conditions in CI.)
#bash "$DIR/check-api-dictionary.sh"

echo "Successfully linted in $SECONDS seconds."
