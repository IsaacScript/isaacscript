#!/bin/bash
set -euo pipefail # Exit on errors and undefined variables.
# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"
rm -rf "$DIR/dist"
npx tsc --declaration false --declarationMap false
npx tstl

cp "$DIR/src/types" "$DIR/dist" --recursive

sed -i '1d' "$DIR/dist/index.d.ts"
sed -i '1i /// <reference path="types/index.d.ts" />' "$DIR/dist/index.d.ts"

echo "Successfully built: isaac-typescript-definitions"
