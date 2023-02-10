#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Remove old output.
COMMON_DIR="$DIR/docs/isaacscript-common" # Created by TypeDoc
rm -rf "$COMMON_DIR"
DEFINITIONS_DIR="$DIR/docs/isaac-typescript-definitions" # Created by TypeDoc
rm -rf "$DEFINITIONS_DIR"
REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/docs" # Created by Docusaurus
rm -rf "$OUT_DIR"

# Auto-generate the Markdown files with TypeDoc + the Markdown plugin.
bash "$DIR/../isaac-typescript-definitions/docs.sh"
bash "$DIR/../isaacscript-common/docs.sh"

# Apply transformations on top of the TypeDoc output.
npx tsx "$REPO_ROOT/scripts/fixIsaacTypeScriptDefinitions.mts"
npx tsx "$REPO_ROOT/scripts/fixIsaacScriptCommon.mts"

# Use Prettier to remove superfluous backslash escape characters, which cause issues with search
# engine indexing.
npx prettier "$OUT_DIR" --write

# Build the docs website using Docusaurus.
mkdir -p "$OUT_DIR"
npx docusaurus build --out-dir "$OUT_DIR"

echo "Successfully built all docs in $SECONDS seconds."
