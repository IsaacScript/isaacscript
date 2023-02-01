#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
npx prettier --ignore-path="$DIR/../../.prettierignore" --check .

# Use ESLint to lint the TypeScript.
# We use "--max-warnings" so that any warnings will fail in CI.
npx eslint --max-warnings 0 .

# Spell check every file using CSpell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary .

# Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
# We ignore exports defined in the index.ts file due to bugs with ts-prune detecting files in
# different packages.
npx ts-prune --error --ignore "index.ts"

# Check repository-specific scripts.
if [ ! -z "$GITHUB_ACTIONS" ]; then
  echo "Checking if the generation scripts modify any files..."
  bash "$DIR/generate.sh" check
fi

echo "Successfully linted in $SECONDS seconds."
