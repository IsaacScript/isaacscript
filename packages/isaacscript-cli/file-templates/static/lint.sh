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

# Step 3 - Spell check every file using CSpell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary

# Step 4 - Use xmllint to lint XML files.
# (Skip this step if xmllint is not currently installed for whatever reason.)
if command -v xmllint &> /dev/null; then
  find "$DIR/mod" -name "*.xml" -print0 | xargs -0 xmllint --noout
fi

# Step 5 - Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
# (This starts out disabled by default, but you can uncomment the following line to find dead code.)
# npx ts-prune --error

# Step 6 - Check for orphaned words.
bash "$DIR/check-orphaned-words.sh"

echo "Successfully linted in $SECONDS seconds."
