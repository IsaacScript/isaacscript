#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

DOCS_DIR="$DIR/docs"
rm -rf "$DOCS_DIR"
npx typedoc \
  --out "$DOCS_DIR" \
  --entryPointStrategy expand \
  --entryPoints "$DIR/src" \

echo "Successfully created docs in $SECONDS seconds."
