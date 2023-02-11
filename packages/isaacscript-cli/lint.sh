#!/bin/bash

set -e # Exit on any errors.
set -u # Exit on undefined variables.

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
# We ignore exports in the "JSONRoomsFile.ts" file since it is copied from "isaacscript-common".
npx ts-prune --error --ignore "index.ts|JSONRoomsFile.ts"

# Use `isaac-xml-validator` to validate XML files.
# (Skip this step if Python is not currently installed for whatever reason.)
if command -v python &> /dev/null; then
  pip install isaac-xml-validator --upgrade --quiet
  isaac-xml-validator --quiet
fi

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
npx cspell --no-progress --no-summary .

# Check for gitignore updates from GitHub.
bash "$DIR/check-gitignore.sh"

echo "Successfully linted in $SECONDS seconds."
