#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

PACKAGE_JSON="$DIR/package.json"
OLD_HASH=$(md5sum "$PACKAGE_JSON")
# Old versions:
# - typescript - Stuck until TSTL updates.
# - chalk - Stuck until TypeScript supports ESM.
# - @mdx-js/react,react,react-dom - Stuck until Docusaurus upgrades.
# - unified - Does not work with the current Markdown linting setup because it requires a "module"
#   type in "package.json", and Docusaurus does not support this yet.
npx npm-check-updates --upgrade --packageFile "$PACKAGE_JSON" --reject "chalk,@mdx-js/react,react,react-dom,unified"
NEW_HASH=$(md5sum "$PACKAGE_JSON")
if [[ $OLD_HASH != $NEW_HASH ]]; then
  yarn
  syncpack fix-mismatches
  npx prettier --write "**/package.json"
fi
