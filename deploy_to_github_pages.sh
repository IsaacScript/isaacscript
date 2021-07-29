#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO="$(basename "$DIR")"

cd "$DIR"

# Generate the docs
git checkout main
npx typedoc "$DIR/src/index.ts"
TMP_DIR="/tmp/$REPO"
rm -rf "$TMP_DIR"
mv "$DIR/docs" "$TMP_DIR"
git checkout gh-pages
rm -rf assets *.html
mv "$TMP_DIR/*" .
rmdir "$TMP_DIR"
git add -A
git commit -m "updating docs"
git push
git checkout main
