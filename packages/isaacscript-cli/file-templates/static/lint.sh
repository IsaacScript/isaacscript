#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
npx prettier --check .

# Use ESLint to lint the TypeScript.
# We use "--max-warnings" so that any warnings will fail in CI.
npx eslint --max-warnings 0 .

# Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
# (This starts out disabled by default, but you can uncomment the following line to find dead code.)
# npx ts-prune --error

# Use `isaac-xml-validator` to validate XML files.
# (Skip this step if Python is not currently installed for whatever reason.)
if command -v python &> /dev/null; then
  pip install isaac-xml-validator --upgrade --quiet
  # (Commented out until Wofsauge fixes the tool.)
  #isaac-xml-validator
fi

# Spell check every file using CSpell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary .

# Check for orphaned words.
bash "$DIR/check-orphaned-words.sh"

echo "Successfully linted in $SECONDS seconds."
