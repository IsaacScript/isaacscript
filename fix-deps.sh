#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

npx syncpack fix-mismatches --source "package.json" --source "packages/*/package.json"

# Fix the bug where syncpack replaces the line endings with CRLF.
npx prettier --write "package.json"
npx prettier --write "packages/*/package.json"
