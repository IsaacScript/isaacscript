#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Cleanup
rm -rf "$DIR/mod" # There is not supposed to be a mod directory here
rm -rf "$DIR/dist" # Remove any previous build artifacts
rm -rf "$HOME/AppData/Roaming/npm/isaacscript" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/isaacscript.cmd" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/isaacscript.ps1" # Previous file from "npm i . -g"
rm -rf "$HOME/AppData/Roaming/npm/node_modules/isaacscript" # Previous link from "npm i . -g"

# Compile
npx tsc
npm i . -g
