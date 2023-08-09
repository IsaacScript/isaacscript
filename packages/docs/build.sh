#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the package:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
PACKAGE_NAME="$(basename "$DIR")"

echo "Building: $PACKAGE_NAME"

SECONDS=0

cd "$DIR"

# Remove old output.
ISAACSCRIPT_COMMON_DIR="$DIR/docs/isaacscript-common" # Created by TypeDoc
rm -rf "$ISAACSCRIPT_COMMON_DIR"

ISAAC_TYPESCRIPT_DEFINITIONS_DIR="$DIR/docs/isaac-typescript-definitions" # Created by TypeDoc
rm -rf "$ISAAC_TYPESCRIPT_DEFINITIONS_DIR"

ESLINT_CONFIG_ISAACSCRIPT_DIR="$DIR/docs/eslint-config-isaacscript"
rm -rf "$ESLINT_CONFIG_ISAACSCRIPT_DIR"

REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/docs" # Created by Docusaurus
rm -rf "$OUT_DIR"

# Auto-generate the Markdown files with TypeDoc + the Markdown plugin.
bash "$REPO_ROOT/packages/isaac-typescript-definitions/docs.sh"
bash "$REPO_ROOT/packages/isaacscript-common/docs.sh"

# Apply transformations on top of the TypeDoc output.
npx tsx "$REPO_ROOT/scripts/fixIsaacTypeScriptDefinitions.ts"
npx tsx "$REPO_ROOT/scripts/fixIsaacScriptCommon.ts"

# Auto-generate the "eslint-config-isaacscript" docs with a hand-written script.
npx tsx "$REPO_ROOT/packages/eslint-config-isaacscript/scripts/buildDocs.mts"

# Format the Markdown output with Prettier, which will remove superfluous backslash escape
# characters that cause issues with search engine indexing.
cd "$REPO_ROOT" # We must change directories to avoid creating a spurious "node_modules" folder.
npx prettier "$DIR/docs" --write --log-level=silent
cd "$DIR"

# Build the docs website using Docusaurus.
mkdir -p "$OUT_DIR"
npx docusaurus build --out-dir "$OUT_DIR"

echo "Successfully built $PACKAGE_NAME in $SECONDS seconds."
