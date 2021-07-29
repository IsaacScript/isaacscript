#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Convert the TypeScript to Lua files and TypeScript definition files
npx tstl

# Update the documentation, if necessary
"$DIR/deploy_to_github_pages.sh"

echo "Success!"
