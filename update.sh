#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

PACKAGE_JSON="$DIR/package.json"
OLD_HASH=$(md5sum "$PACKAGE_JSON")
# Old versions:
# - @mdx-js/react - Stuck until Docusaurus upgrades.
# - chalk - Stuck until TypeScript supports ESM.
# - react - Stuck until Docusaurus upgrades.
# - react-dom - Stuck until Docusaurus upgrades.
# - unified - Does not work with the current Markdown linting setup because it requires a "module"
#   type in "package.json", and Docusaurus does not support this yet.
# - update-notifier - Stuck until TypeScript supports ESM.
npx npm-check-updates --upgrade --packageFile "$PACKAGE_JSON" --reject "@mdx-js/react,chalk,react,react-dom,unified,update-notifier"
NEW_HASH=$(md5sum "$PACKAGE_JSON")
if [[ $OLD_HASH != $NEW_HASH ]]; then
  yarn install

  # Now that the main dependencies have changed, we might need to update the "package.json" files in
  # the individual packages. However, we don't want to blow away peerDependencies, since they are in
  # the form of ">= 5.0.0".
  npx syncpack fix-mismatches --prod --dev
  npx prettier --write "**/package.json"
fi

# syncpack will automatically update most of the dependencies in "isaacscript-lint", but not
# "eslint-config-isaacscript", since that does not exist in the root "package.json".
bash "$DIR/packages/isaacscript-lint/update.sh"
