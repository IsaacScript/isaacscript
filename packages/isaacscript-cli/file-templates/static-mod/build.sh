#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

echo "Building: $REPO_NAME"

SECONDS=0

cd "$DIR"

# Convert the TypeScript to a single Lua file (based on the settings in "tsconfig.json").
npx tstl

echo "Successfully built $REPO_NAME in $SECONDS seconds."
