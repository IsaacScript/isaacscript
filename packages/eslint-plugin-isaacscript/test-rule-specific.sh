#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# - If you want to hard code a rule name + test name here, you can do that temporarily.
# - Otherwise, the first argument passed to this script will be used as the rule name, and the
# second argument will be used as the test name.
RULE_NAME=""
TEST_NAME=""

if [[ -n ${1-} ]]; then
  RULE_NAME="$1"
fi

if [[ -n ${2-} ]]; then
  TEST_NAME="$2"
fi

echo "Running test: $RULE_NAME --> $TEST_NAME"
npx jest "$DIR/tests/rules/$RULE_NAME"*".test.ts" --verbose=false -t "$TEST_NAME"
