#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

TEMPLATE_FILES_FILE_NAME="check-file-updates.txt"
TEMPLATE_FILES_PATH="$DIR/$TEMPLATE_FILES_FILE_NAME"

# Do nothing if the metadata file does not exist.
if ! test -f "$TEMPLATE_FILES_PATH"; then
  echo "The \"$TEMPLATE_FILES_FILE_NAME\" file does not exist. Skipping checks."
  exit 0
fi

ONE_OR_MORE_FAILURES=0
for FILE_SPECIFICATION in $(cat "$TEMPLATE_FILES_PATH"); do
  if [[ "$FILE_SPECIFICATION" =~ (.+):(.+) ]]; then
    LOCAL_FILE=${BASH_REMATCH[1]}
    REMOTE_FILE=${BASH_REMATCH[2]}
    STATIC_DIRECTORY="static-alt"
  else
    LOCAL_FILE=$FILE_SPECIFICATION
    REMOTE_FILE=$FILE_SPECIFICATION
    STATIC_DIRECTORY="static"
  fi

  echo "Checking for an updated version of: $LOCAL_FILE"
  TMP_FILE_PATH="/tmp/base-file"
  URL="https://raw.githubusercontent.com/IsaacScript/isaacscript/main/file-templates/$STATIC_DIRECTORY/$REMOTE_FILE"
  curl "$URL" --output "$TMP_FILE_PATH" --silent --show-error
  if grep "404: Not Found" "$TMP_FILE_PATH" --silent; then
    echo
    echo "Failed to find the following remote file:"
    echo "$URL"
    exit 1
  fi

  FILE_PATH="$DIR/$LOCAL_FILE"
  if test -f "$FILE_PATH"; then
    set +e
    if ! cmp "$FILE_PATH" "$TMP_FILE_PATH" --silent; then
      echo
      echo "File \"$LOCAL_FILE\" is out of date. Get the updated version here:"
      echo "$URL"
      echo
      diff "$FILE_PATH" "$TMP_FILE_PATH"
      echo
      ONE_OR_MORE_FAILURES=1
    fi
    set -e
  else
    echo "File \"$FILE_PATH\" does not exist! Change the \"$TEMPLATE_FILES_FILE_NAME\" file."
    ONE_OR_MORE_FAILURES=1
  fi

  rm -f "$TMP_FILE_PATH"
done

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "One or more files was not valid."
  exit 1
fi

echo "All core files up to date!"
