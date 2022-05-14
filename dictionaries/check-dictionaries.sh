#!/bin/bash

DICTIONARIES_TO_CHECK=("isaac")
# The "isaacscript" dictionary contains words that do not live in this repository, so we skip
# checking it.
# TODO: Remove this check when this lives in a monorepo.

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

REPO_ROOT="$DIR/.."
cd "$REPO_ROOT"

# Make a list of every misspelled word without any custom dictionaries.
# We need to move the configuration path temporarily or else the cspell command won't work properly.
CSPELL_CONFIGURATION_PATH="$REPO_ROOT/.cspell.json"
CSPELL_CONFIGURATION_PATH_TEMP="$REPO_ROOT/.cspell-temp.json"
mv "$CSPELL_CONFIGURATION_PATH" "$CSPELL_CONFIGURATION_PATH_TEMP"
MISSPELLED_WORDS_PATH="/tmp/misspelled-words.txt"
CSPELL_CONFIGURATION_TEST_PATH="$REPO_ROOT/.cspell-check-unused.json"
npx cspell lint --config "$CSPELL_CONFIGURATION_TEST_PATH" --dot --no-progress --no-summary --unique --words-only | sort --ignore-case --unique > "$MISSPELLED_WORDS_PATH"
mv "$CSPELL_CONFIGURATION_PATH_TEMP" "$CSPELL_CONFIGURATION_PATH"

# Check the custom dictionaries
ONE_OR_MORE_FAILURES=0
for DICTIONARY_NAME in "${DICTIONARIES_TO_CHECK[@]}"; do
  DICTIONARY_PATH="$DIR/$DICTIONARY_NAME/$DICTIONARY_NAME.txt"
  TEMP_DICTIONARY_PATH="$DIR/$DICTIONARY_NAME/$DICTIONARY_NAME-temp.txt"

  # Check alphabetically sorted and unique
  echo "Checking for orphaned words in dictionary: $DICTIONARY_NAME"
  cat "$DICTIONARY_PATH" | sort --ignore-case --unique > "$TEMP_DICTIONARY_PATH"
  rm -f "$TEMP_DICTIONARY_PATH"

  # Check that each word in the dictionary is actually being used
  set +e
  for LINE in $(cat "$DICTIONARY_PATH"); do
    if ! grep "$LINE" "$MISSPELLED_WORDS_PATH" --ignore-case --quiet; then
      echo "The following word in the $DICTIONARY_NAME dictionary is not being used: $LINE"
      ONE_OR_MORE_FAILURES=1
    fi
  done
  set -e
done

rm -f "$MISSPELLED_WORDS_PATH"

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "Dictionary check failed."
  exit 1
fi

echo "All dictionaries are valid."
