#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

cd "$DIR"

if [ -z "$1" ]; then
  echo "Error: The version bump description is required."
  exit 1
fi
VERSION_BUMP="$1"

"$DIR/../../publish.sh" "$REPO_NAME" "$1"
