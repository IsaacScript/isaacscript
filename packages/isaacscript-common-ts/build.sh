#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

SECONDS=0

cd "$DIR"

REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/$REPO_NAME"

rm -rf "$OUT_DIR"

# Compile the project for the purpose of type-checking.
npx tsc

# Compile the project for both CJS and ESM using tsup.
npx tsup "$DIR/src/index.mts" --out-dir "$OUT_DIR/src" --format "cjs,esm"

# The source maps and declaration maps will be bugged due to nx's consolidated "dist" directory, so
# we use a script to manually rewrite them.
npx tsx "$REPO_ROOT/scripts/rewriteSourceMapDeclarationMapPaths.mts" "isaacscript-common-ts"

# Copy the rest of the files needed for npm.
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"
cp "$DIR/src" "$OUT_DIR/" --recursive # This will merge the TypeScript source files into the existing directory.

echo "Successfully built in $SECONDS seconds."
