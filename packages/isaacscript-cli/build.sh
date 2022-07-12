#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

SECONDS=0

cd "$DIR"

OUT_DIR="$DIR/../../dist/packages/$REPO_NAME"

# First, generate the JSON schema for the special "isaacscript" section in "tsconfig.json".
SCHEMA_PATH="$DIR/schemas/tsconfig-isaacscript-section-schema.json"
npx ts-json-schema-generator --path "$DIR/src/interfaces/IsaacScriptTSConfig.ts" --type "IsaacScriptTSConfig" --tsconfig "$DIR/tsconfig.json" --out "$SCHEMA_PATH"
npx prettier "$SCHEMA_PATH" --write

# Second, compile the program.
# (Normally, we would use the "@nrwl/js:tsc" plugin to do this, but it does not work properly when
# referencing TypeScript files outside of the sub-package using relative paths. Additionally, we
# always want to generate the schema.)
rm -rf "$OUT_DIR"
npx tsc

# Copy the rest of the files needed for npm.
cp --recursive "$DIR/file-templates" "$OUT_DIR/"
cp --recursive "$DIR/isaacscript-watcher" "$OUT_DIR/"
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"

echo "Successfully built in $SECONDS seconds."
