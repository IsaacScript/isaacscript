#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Remove old output
COMMON_DIR="$DIR/docs/isaacscript-common" # Created by TypeDoc
rm -rf "$COMMON_DIR"
OUT_DIR="$DIR/../../dist/packages/docs" # Created by Docusaurus
rm -rf "$OUT_DIR"

# First, auto-generate the `isaacscript-common` Markdown files with TypeDoc + the Markdown plugin.
# "$DIR/../isaac-typescript-definitions/docs.sh"
bash "$DIR/../isaacscript-common/docs.sh"

# Second, apply transformations on top of the TypeDoc output.
npx ts-node --require "tsconfig-paths/register" "$DIR/scripts/postTypeDocGeneration.ts"

# Build the docs website using Docusaurus.
mkdir -p "$OUT_DIR"
npm run build
