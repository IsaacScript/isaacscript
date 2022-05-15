#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ONE_OR_MORE_FAILURES=0

for DICTIONARY_DIR in $DIR/dictionaries/*; do
  if [ -d "$DICTIONARY_DIR" ]; then
    DICTIONARY_NAME=$(basename "$DICTIONARY_DIR")
    echo "Checking alphabetically sorted and unique for dictionary: $DICTIONARY_NAME"

    DICTIONARY_PATH="$DICTIONARY_DIR/$DICTIONARY_NAME.txt"
    TEMP_DICTIONARY_PATH="/tmp/$DICTIONARY_NAME.txt"
    cat "$DICTIONARY_PATH" | sort --ignore-case --unique > "$TEMP_DICTIONARY_PATH"

    set +e
    if ! cmp "$DICTIONARY_PATH" "$TEMP_DICTIONARY_PATH" --silent; then
      echo
      echo "Dictionary \"$DICTIONARY_NAME\" is not sorted:"
      echo
      diff "$DICTIONARY_PATH" "$TEMP_DICTIONARY_PATH"
      ONE_OR_MORE_FAILURES=1
    fi

    rm -f "$TEMP_DICTIONARY_PATH"
  fi
done

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "Dictionary check failed."
  exit 1
fi

echo "All dictionaries are valid."
