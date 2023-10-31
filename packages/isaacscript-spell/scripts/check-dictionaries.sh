#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DICTIONARIES_DIR="$DIR/../dictionaries"

ONE_OR_MORE_FAILURES=0

# Check for alphabetically sorted and unique.
ALL_WORDS="/tmp/all-words.txt"
rm -f "$ALL_WORDS"
touch "$ALL_WORDS"
for DICTIONARY_DIR in "$DICTIONARIES_DIR/"*; do
  if [[ -d "$DICTIONARY_DIR" ]]; then
    DICTIONARY_NAME=$(basename "$DICTIONARY_DIR")
    echo "Checking alphabetically sorted and unique for dictionary: $DICTIONARY_NAME"

    for DICTIONARY_TXT in "$DICTIONARY_DIR/"*.txt; do
      TMP_DICTIONARY_TXT="/tmp/$DICTIONARY_NAME.txt"
      TMP_DICTIONARY_TXT_SORTED="/tmp/$DICTIONARY_NAME-sorted.txt"

      # shellcheck disable=SC2002
      cat "$DICTIONARY_TXT" | grep . | grep -v "^#" > "$TMP_DICTIONARY_TXT"
      # shellcheck disable=SC2002
      cat "$TMP_DICTIONARY_TXT" | sort --ignore-case --unique > "$TMP_DICTIONARY_TXT_SORTED"

      set +e
      if ! cmp "$TMP_DICTIONARY_TXT" "$TMP_DICTIONARY_TXT_SORTED" --silent; then
        echo
        echo "File \"$DICTIONARY_TXT\" is not sorted:"
        echo
        diff "$TMP_DICTIONARY_TXT" "$TMP_DICTIONARY_TXT_SORTED"
        ONE_OR_MORE_FAILURES=1
      fi
      set -e

      grep -v "^#" "$DICTIONARY_TXT" >> "$ALL_WORDS"
    done

    rm -f "$TMP_DICTIONARY_TXT"
  fi
done

echo "Checking for uniqueness across all dictionaries."
sed --in-place 's/#.*//' "$ALL_WORDS" # Remove comments
sed --in-place 's/^\s*//' "$ALL_WORDS" # Remove leading whitespace
sed --in-place 's/\s*$//' "$ALL_WORDS" # Remove trailing whitespace
sed --in-place '/^$/d' "$ALL_WORDS" # Remove empty lines
ALL_WORDS_SORTED="/tmp/all-words-sorted.txt"
sort --ignore-case "$ALL_WORDS" > "$ALL_WORDS_SORTED"
ALL_WORDS_SORTED_UNIQUE="/tmp/all-words-sorted-unique.txt"
sort --ignore-case --unique "$ALL_WORDS" > "$ALL_WORDS_SORTED_UNIQUE"
set +e
if ! cmp "$ALL_WORDS_SORTED" "$ALL_WORDS_SORTED_UNIQUE" --silent; then
  echo
  diff "$ALL_WORDS_SORTED" "$ALL_WORDS_SORTED_UNIQUE"
  ONE_OR_MORE_FAILURES=1
fi
set -e

if [[ $ONE_OR_MORE_FAILURES -ne "0" ]]; then
  echo "Dictionary check failed."
  exit 1
fi

echo "All dictionaries are valid."
