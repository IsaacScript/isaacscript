#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Bump the version.
lerna version --conventional-commits --no-changelog --message "chore: release"

# Copy the version to the dist folder.
"$DIR/build.sh"

# Upload it to NPM.
lerna publish from-git
