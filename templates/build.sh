#!/bin/bash

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Convert the TypeScript to a single Lua file
cd "$DIR"
npm run-script build

# Copy it to the mod directory
BUNDLED_LUA_PATH="$DIR/dist/main.lua"
MOD_LUA_PATH="/c/Users/james/Documents/My Games/Binding of Isaac Afterbirth+ Mods/racing+_rebalanced/main.lua"
cp "$BUNDLED_LUA_PATH" "$MOD_LUA_PATH"

echo "Success!"
