#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

REPO_ROOT="$DIR"
cd "$REPO_ROOT"

# Do nothing if the configuration file does not exist.
CSPELL_CONFIGURATION_PATH="$REPO_ROOT/.cspell.json"
if ! test -f "$CSPELL_CONFIGURATION_PATH"; then
  exit 0
fi

# Do nothing if the configuration file does not have any words in it.
if ! grep -q '"words": ' "$CSPELL_CONFIGURATION_PATH"; then
  exit 0
fi

# Make a list of every misspelled word without any custom dictionaries.
# We need to move the configuration path temporarily or else the cspell command won't work properly.
CSPELL_CONFIGURATION_PATH_TEMP="$REPO_ROOT/.cspell-temp.json"
mv "$CSPELL_CONFIGURATION_PATH" "$CSPELL_CONFIGURATION_PATH_TEMP"
MISSPELLED_WORDS_PATH="/tmp/misspelled-words.txt"
CSPELL_CONFIGURATION_TEST_PATH="$REPO_ROOT/.cspell-check-unused.json"
npx cspell lint --config "$CSPELL_CONFIGURATION_TEST_PATH" --dot --no-progress --no-summary --unique --words-only | sort --ignore-case --unique > "$MISSPELLED_WORDS_PATH"
mv "$CSPELL_CONFIGURATION_PATH_TEMP" "$CSPELL_CONFIGURATION_PATH"

# Check that each ".cspell.json" word is actually being used.
echo "Checking for orphaned CSpell configuration words in: $CSPELL_CONFIGURATION_PATH"
CSPELL_CONFIGURATION_WORDS=$(cat "$CSPELL_CONFIGURATION_PATH" | python -c "import sys, json; print('\n'.join(json.load(sys.stdin)['words']))")
ONE_OR_MORE_FAILURES=0
set +e
for LINE in $CSPELL_CONFIGURATION_WORDS; do
  LINE_TRIMMED=$(echo "$LINE" | xargs)
  if ! grep "$LINE_TRIMMED" "$MISSPELLED_WORDS_PATH" --ignore-case --quiet; then
    echo "The following word in the CSpell config is not being used: $LINE_TRIMMED"
    ONE_OR_MORE_FAILURES=1
  fi
done
set -e

rm -f "$MISSPELLED_WORDS_PATH"

if [ $ONE_OR_MORE_FAILURES -ne "0" ]; then
  echo "CSpell configuration words are not valid."
  exit 1
fi

echo "CSpell configuration words are valid."
