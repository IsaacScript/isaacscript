#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Compile the project, which will result in Lua files & TypeScript definition files.
npx tstl

# Copy the declarations into place. (The TypeScript compiler does not do this automatically for some
# reason.)
cp -R "$DIR/src/types" "$DIR/dist/"

# TypeScript messes up the path inside of the triple slash directive, so we must manually repair it.
sed --in-place 's/\.\.\/src\///g' "$DIR/dist/index.d.ts"

echo "Successfully built in $SECONDS seconds."
