#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
# "--loglevel warn" makes it only output errors.
pnpx prettier --loglevel warn --ignore-path="$DIR/../../.prettierignore" --check .

# Use ESLint to lint the JavaScript.
# "--max-warnings 0" makes warnings fail in CI, since we set all ESLint errors to warnings.
pnpx eslint --max-warnings 0 .

# Use remark to check Markdown files for errors.
# "--quiet" make it only output errors.
# "--frail" makes warnings fail in CI.
pnpx remark --quiet --frail --ignore-pattern "docs/isaacscript-common" "docs" # Cannot use "$DIR" here

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
pnpx cspell --no-progress --no-summary .

echo "Successfully linted in $SECONDS seconds."
