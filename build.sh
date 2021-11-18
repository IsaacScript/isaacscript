#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO="$(basename "$DIR")"

SECONDS=0

cd "$DIR"

# Cleanup
rm -rf "$DIR/mod" # There is not supposed to be a mod directory here
rm -rf "$DIR/dist" # Remove any previous build artifacts
rm -rf "$HOME/AppData/Roaming/npm/$REPO" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/$REPO.cmd" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/$REPO.ps1" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/node_modules/$REPO" # Previous link from "npm i . -g"

# Compile
npx tsc
touch "$DIR/dist/.npmignore"
npm install . --global

echo "Successfully built in $SECONDS seconds."
