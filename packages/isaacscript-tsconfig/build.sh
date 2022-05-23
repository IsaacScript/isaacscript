#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

OUT_DIR="$DIR/../../dist/packages/isaacscript-tsconfig"

mkdir -p "$OUT_DIR"
cp "$DIR/LICENSE" "$OUT_DIR/"
cp $DIR/*.md "$OUT_DIR/" # Globs don't work in quotes
cp $DIR/tsconfig.*.json "$OUT_DIR/" # Globs don't work in quotes
