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

    for DICTIONARY_TXT in $DICTIONARY_DIR/*.txt; do
      TMP_DICTIONARY_TXT="/tmp/$DICTIONARY_NAME.txt"
      TMP_DICTIONARY_TXT_SORTED="/tmp/$DICTIONARY_NAME-sorted.txt"

      cat "$DICTIONARY_TXT" | grep . | grep -v "^#" > "$TMP_DICTIONARY_TXT"
      cat "$TMP_DICTIONARY_TXT" | sort --ignore-case --unique > "$TMP_DICTIONARY_TXT_SORTED"

      set +e
      if ! cmp "$TMP_DICTIONARY_TXT" "$TMP_DICTIONARY_TXT_SORTED" --silent; then
        echo
        echo "File \"$DICTIONARY_TXT\" is not sorted:"
        echo
        diff "$TMP_DICTIONARY_TXT" "$TMP_DICTIONARY_TXT_SORTED"
        ONE_OR_MORE_FAILURES=1
      fi
    done

    rm -f "$TMP_DICTIONARY_TXT"
  fi
done

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "Dictionary check failed."
  exit 1
fi

echo "All dictionaries are valid."
