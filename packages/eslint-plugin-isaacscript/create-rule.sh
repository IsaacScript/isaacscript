#!/bin/bash

set -e # Exit on any errors.
set -u # Exit on undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

npx tsx "$DIR/tools/createRule.ts" "$1" "$2"
