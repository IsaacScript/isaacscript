#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
npx prettier --ignore-path="$DIR/../../.prettierignore" --check .

# Use ESLint to lint the JavaScript.
# We use "--max-warnings" so that any warnings will fail in CI.
npx eslint --max-warnings 0 .

# Use remark to check Markdown files for errors.
# We use "--quiet" to output only warnings and errors.
# We use "--frail" to exit with 1 on warnings (for CI).
npx remark --quiet --frail docs --ignore-pattern "docs/isaacscript-common" # Cannot use "$DIR" here

# Spell check every file using CSpell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary .

echo "Successfully linted in $SECONDS seconds."
