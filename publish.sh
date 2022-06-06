#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

if [ ! -z "$1" ]; then
  echo "Error: The package name is required."
fi
PACKAGE_NAME=$1

PACKAGE_DIR="$DIR/packages/$PACKAGE_NAME"
if ! test -f "$PACKAGE_DIR"; then
  echo "Error: The path of \"$PACKAGE_DIR\" does not exist."
fi

cd "$PACKAGE_DIR"

if [ ! -z "$2" ]; then
  echo "Error: The version bump description is required."
fi
VERSION_BUMP=$2

yarn version --set-version $VERSION_BUMP
bash "$PACKAGE_DIR/build.sh"
cd "$DIR/dist/packages/$PACKAGE_NAME"
npm publish
