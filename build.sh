#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"
rm -rf "$DIR/mod" # There is not supposed to be a mod directory here
rm -rf "/c/Users/james/Documents/My Games/Binding of Isaac Afterbirth+ Mods/IsaacScript" # This is not supposed to exist
rm -rf "$DIR/dist" # Remove any previous build artifacts
npx tsc
npm i . -g
