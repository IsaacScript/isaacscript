#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

if [ -z "$1" ]; then
  echo "Error: The package name is required."
  exit 1
fi
PACKAGE_NAME=$1

PACKAGE_DIR="$DIR/packages/$PACKAGE_NAME"
if ! test -d "$PACKAGE_DIR"; then
  echo "Error: The directory of \"$PACKAGE_DIR\" does not exist."
  exit 1
fi

cd "$PACKAGE_DIR"

if [ -z "$2" ]; then
  echo "Error: The version bump description is required."
  exit 1
fi
VERSION_BUMP=$2

yarn config set version-tag-prefix "$PACKAGE_NAME-"
if [ "$VERSION_BUMP" == "major" ] || [ "$VERSION_BUMP" == "minor" ] || [ "$VERSION_BUMP" == "patch" ]; then
  yarn version --new-version $VERSION_BUMP --tag
else
  yarn version --set-version $VERSION_BUMP
fi

# We have to build after bumping the version so that the new "package.json" file gets copied to the
# "dist" directory.
bash "$PACKAGE_DIR/build.sh"

cd "$DIR/dist/packages/$PACKAGE_NAME"
npm publish
git push
