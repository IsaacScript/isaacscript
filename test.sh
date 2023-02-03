#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Test each package.
TEST_COMMAND="nx run-many --target=test --all $NO_CACHE"
if command -v nx &> /dev/null; then
  # We want to invoke nx directly, if available. (Otherwise, the colors will not work properly.)
  "$TEST_COMMAND"
else
  # The "nx" command does not work in CI, so we revert to calling Nx through the package manager.
  pnpx "$TEST_COMMAND"
fi
