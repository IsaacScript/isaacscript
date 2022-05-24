#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

if [ -z "$1" ]; then
  echo "You must provide the package name to publish."
  exit 1
fi

if [ -z "$2" ]; then
  echo "You must provide either \"dev\" or \"prod\" as the second argument."
  exit 1
fi

if [ $2 = "dev" ]; then
  PRE_ID="--releaseAs=prerelease --preid=dev"
elif [ $2 = "prod" ]; then
  PRE_ID=""
else
  echo "You must provide either \"dev\" or \"prod\" as the second argument."
  exit 1
fi

# Bump the version.
nx version "$1" --push --allowEmptyRelease --skipProjectChangelog $PRE_ID $3

# Upload it to NPM.
nx publish "$1"
