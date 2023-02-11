#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

RULE_NAME=""

echo "Running all tests for rule: $RULE_NAME"
npx jest "$DIR/tests/rules/$RULE_NAME"*".test.ts" # --reporters jest-summarizing-reporter
