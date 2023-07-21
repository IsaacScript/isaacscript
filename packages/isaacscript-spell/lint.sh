#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Use Prettier to check formatting.
# "--log-level=warn" makes it only output errors.
npx prettier --log-level=warn --ignore-path="$DIR/../../.prettierignore" --check .

# Spell check every file using CSpell.
# "--no-progress" and "--no-summary" make it only output errors.
npx cspell --no-progress --no-summary .

# Lint the dictionary files.
bash "$DIR/check-dictionaries.sh"

echo "Successfully linted in $SECONDS seconds."
