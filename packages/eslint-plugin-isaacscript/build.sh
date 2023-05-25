#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Building: $DIR"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

cd "$DIR"

REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/$REPO_NAME"

rm -rf "$OUT_DIR"

# We create a separate TypeScript configuration for production so that the "tests" and "tools"
# directories are not published to npm.
npx tsc --project "$DIR/tsconfig.prod.json"

# Copy the rest of the files needed for npm.
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"

# Finally, copy the output to the "node_modules" folder for the root of the monorepo. This obviates
# the need for the monorepo to consume the actual npm package. (The ESLint config for the monorepo
# needs the compiled JavaScript in order to work properly.)
cp "$OUT_DIR" "$REPO_ROOT/node_modules/" --recursive
