#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

GITHUB_PAGES_URL="https://isaacscript.github.io/isaacscript-common/core/constants/index.html"

# Validate command-line arguments.
if [ -z "$1" ]; then
  echo "Error: The SHA1 of the commit is required as an argument."
  exit 1
fi
COMMIT_SHA1="$1"
SHORT_COMMIT_SHA1=$(echo ${COMMIT_SHA1:0:7})

while true; do
  if curl "$GITHUB_PAGES_URL" --silent | grep "$SHORT_COMMIT_SHA1" > /dev/null; then
    echo "Found a link with short commit: $SHORT_COMMIT_SHA1"
    break
  fi

  echo "The latest version of the site has not yet been deployed to GitHub Pages. Sleeping for 5 seconds."
  sleep 5
done
