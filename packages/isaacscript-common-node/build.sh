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

REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/$PACKAGE_NAME"

rm -rf "$OUT_DIR"

# Compile the project.
npx tsc
mv "$OUT_DIR/src" "$OUT_DIR/dist"

# The source maps and declaration maps will be bugged due to the consolidated "dist" directory, so
# we use a script to manually rewrite them.
npx tsx "$REPO_ROOT/scripts/rewriteSourceMapDeclarationMapPaths.ts" "isaacscript-common-ts"

# Copy the rest of the files needed for npm.
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"
cp "$DIR/src" "$OUT_DIR/" --recursive

echo "Successfully built $PACKAGE_NAME in $SECONDS seconds."
