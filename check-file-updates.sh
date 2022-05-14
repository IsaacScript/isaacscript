#!/bin/bash

FILES_TO_CHECK=(
  ".vscode/extensions.json:.vscode/extensions-typescript.json"
  ".vscode/settings.json:.vscode/settings-typescript.json"
  ".cspell-base.json:.cspell-base.json"
  ".cspell-check-unused.json:.cspell-check-unused-base.json"
  ".gitattributes"
  ".prettierrc.js:.prettierrc-base.js"
  ".prettierignore:.prettierignore-base"
)

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ONE_OR_MORE_FAILURES=0
for FILE in "${FILES_TO_CHECK[@]}"; do
  if [[ "$FILE" =~ (.+):(.+) ]]; then
    FILE=${BASH_REMATCH[1]}
    REMOTE_FILE=${BASH_REMATCH[2]}
    STATIC_DIRECTORY="static-alt"
  else
    REMOTE_FILE=$FILE
    STATIC_DIRECTORY="static"
  fi

  echo "Checking for an updated version of: $FILE"
  TMP_FILE="/tmp/base-file"
  URL="https://raw.githubusercontent.com/IsaacScript/isaacscript/main/file-templates/$STATIC_DIRECTORY/$REMOTE_FILE"
  curl "$URL" --output "$TMP_FILE" --silent --show-error
  if grep "404: Not Found" "$TMP_FILE" --silent; then
    echo "Failed to find the following remote file:"
    echo "$URL"
    exit 1
  fi

  set +e
  if ! cmp "$DIR/$FILE" "$TMP_FILE" --silent; then
    echo "File \"$FILE\" is out of date. Get the updated version here:"
    echo "$URL"
    ONE_OR_MORE_FAILURES=1
  fi
  set -e

  rm -f "$TMP_FILE"
done

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "One or more files was not valid."
  exit 1
fi

echo "All core files up to date!"
