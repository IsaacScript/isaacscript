#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# - If you want to hard code a rule name here, you can do that temporarily.
# - Otherwise, the first argument passed to this script will be used as the rule name.
RULE_NAME=""

if [[ -n ${1-} ]]; then
  RULE_NAME="$1"
fi

echo "Running all tests for rule: $RULE_NAME"
npx jest "$DIR/tests/rules/$RULE_NAME"*".test.ts"
