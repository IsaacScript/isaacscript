#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

echo "Checking if the generation scripts modify any files..."

npm run generate-configs
npm run generate-rules-table

git diff-index --quiet HEAD -- # Returns 1 if any files have changed
