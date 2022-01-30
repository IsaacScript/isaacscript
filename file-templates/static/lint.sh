#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting
npx prettier --check "src/**/*.ts"

# Step 2 - Use ESLint to lint the TypeScript
# Since all ESLint errors are set to warnings,
# we set max warnings to 0 so that warnings will fail in CI
npx eslint --max-warnings 0 src

# Step 3 - Spell check every file using cspell
# We use no-progress and no-summary because we want to only output errors
npx cspell --no-progress --no-summary "src/**/*.ts"
npx cspell --no-progress --no-summary "mod/metadata.xml"

# Step 4 - Check for incorrectly formatted XML files
# (and skip this step if xmllint is not currently installed for whatever reason)
if ! command -v xmllint &> /dev/null; then
  find "$DIR/mod" -name "*.xml" -print0 | xargs -0 xmllint --noout
fi

# Step 5 - Check for unused imports
# The "--error" flag makes it return an error code of 1 if unused exports are found
# (this starts out disabled by default, but you can uncomment the following line to find dead code)
# npx ts-prune -error

echo "Successfully linted in $SECONDS seconds."
