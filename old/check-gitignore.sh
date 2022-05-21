#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

LOCAL_GITIGNORE="/tmp/gitignore-template-local"
REMOTE_GITIGNORE="/tmp/gitignore-template-remote"
URL="https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore"
tail -n +6 "$DIR/.gitignore" > $LOCAL_GITIGNORE
curl "$URL" --output "$REMOTE_GITIGNORE" --silent
set +e
cmp --silent "$LOCAL_GITIGNORE" "$REMOTE_GITIGNORE"
UP_TO_DATE=$?
set -e
rm -f "$LOCAL_GITIGNORE" "$REMOTE_GITIGNORE"

if [[ "$UP_TO_DATE" -ne "0" ]]; then
  echo "There is an update for the gitignore template from GitHub:"
  echo "$URL"
  exit 1
fi
