#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting.
npx prettier --check .

# Step 2 - Use ESLint to lint the TypeScript.
# Since all ESLint errors are set to warnings, we set max warnings to 0 so that warnings will fail
# in CI.
npx eslint --max-warnings 0 src
npx eslint --max-warnings 0 tools
npx eslint --max-warnings 0 tests

# Step 3 - Spell check every file using cspell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary

# Step 4 - Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
npx ts-prune --error

# Step 5 - Check for base file updates.
bash "$DIR/check-file-updates.sh"

# Step 6 - Check for orphaned words.
bash "$DIR/check-orphaned-words.sh"

# Step 7 - Check repository-specific scripts.
echo "Checking if the generation scripts modify any files..."
bash "$DIR/generate.sh" check

echo "Successfully linted in $SECONDS seconds."
