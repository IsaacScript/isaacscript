#!/bin/bash

set -e # Exit on any errors.
set -u # Exit on undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

LOCAL_GITIGNORE="$DIR/file-templates/dynamic/Node.gitignore"
REMOTE_GITIGNORE="/tmp/gitignore-template-remote"
URL="https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore"

curl "$URL" --output "$REMOTE_GITIGNORE" --silent
set +e
cmp --silent "$LOCAL_GITIGNORE" "$REMOTE_GITIGNORE"
UP_TO_DATE=$?
set -e
rm -f "$REMOTE_GITIGNORE"

if [[ "$UP_TO_DATE" -ne "0" ]]; then
  echo "There is an update for the gitignore template from GitHub:"
  echo "$URL"
  exit 1
fi
