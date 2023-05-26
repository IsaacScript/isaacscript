#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Building: $DIR"

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

# Format the Markdown output from TypeDoc with Prettier, which will remove superfluous backslash
# escape characters that cause issues with search engine indexing.
cd "$REPO_ROOT" # We must change directories to avoid creating a spurious "node_modules" folder.
npx prettier "$DIR/docs" --write --loglevel silent
cd "$DIR"

# Build the docs website using Docusaurus.
mkdir -p "$OUT_DIR"
npx docusaurus build --out-dir "$OUT_DIR"

echo "Successfully built all docs in $SECONDS seconds."
