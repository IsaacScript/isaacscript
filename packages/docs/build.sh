#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# First, auto-generate the `isaacscript-common` Markdown files with TypeDoc + the Markdown plugin.
#COMMON_DIR="$DIR/docs/isaacscript-common"
#rm -rf "$COMMON_DIR"
#npx typedoc # The options are stored in "typedoc.json".

# Build the docs website using Docusaurus.
OUT_DIR="$DIR/../../dist/packages/docs"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
npm run build
