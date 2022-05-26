#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting.
npx prettier --ignore-path="$DIR/../../.prettierignore" --check .

# Step 2 - Use ESLint to lint the JavaScript.
# Since all ESLint errors are set to warnings, we set max warnings to 0 so that warnings will fail
# in CI.
npx eslint --max-warnings 0 .

# Step 3 - Use remark to check Markdown files for errors.
# We set to quiet to output only warnings and errors.
# We set to frail to exit with 1 on warnings (for CI).
npx remark --quiet --frail docs --ignore-pattern "docs/isaacscript-common" # Cannot use "$DIR" here

# Step 4 - Spell check every file using cspell.
# We use no-progress and no-summary because we want to only output errors.
npx cspell --no-progress --no-summary

# Step 5 - Validate that every doc page is included.
# TODO: uncomment
# npx ts-node "$DIR/docsEntryPointLint.ts"

echo "Successfully linted in $SECONDS seconds."
