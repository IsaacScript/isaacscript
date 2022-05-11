#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

# Convert the TypeScript to a single Lua file (based on the settings in "tsconfig.json").
cd "$DIR"
npx tstl

echo "Successfully built in $SECONDS seconds."
