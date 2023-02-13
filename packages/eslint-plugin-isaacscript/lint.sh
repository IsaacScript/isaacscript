#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

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

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
npx cspell --no-progress --no-summary .

# Check for unused exports.
# "--error" makes it return an error code of 1 if unused exports are found.
npx ts-prune --error

# Check repository-specific scripts.
if [[ -n "${GITHUB_ACTIONS-}" ]]; then
  echo "Checking if the generation scripts modify any files..."
  bash "$DIR/generate.sh" check
fi

echo "Successfully linted in $SECONDS seconds."
