#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

PACKAGE_JSON="$DIR/package.json"
OLD_HASH=$(md5sum "$PACKAGE_JSON")
# Old versions (dependencies):
# - chalk - Stuck until "isaacscript-cli" can be upgraded to ESM.
# Old versions (devDependencies):
# - @mdx-js/react - Stuck until Docusaurus upgrades.
# - @nrwl/eslint-plugin-nx - See nx below.
# - nx - There is a bug in 15.6.1 that makes linting fail in CI.
# - react - Stuck until Docusaurus upgrades.
# - react-dom - Stuck until Docusaurus upgrades.
# - unified - Does not work with the current Markdown linting setup because it requires a "module"
#             type in "package.json", and Docusaurus does not support this yet.
pnpx npm-check-updates --upgrade --packageFile "$PACKAGE_JSON" --filterVersion "^*"
NEW_HASH=$(md5sum "$PACKAGE_JSON")
if [[ $OLD_HASH != $NEW_HASH ]]; then
  pnpm install

  # Now that the main dependencies have changed, we might need to update the "package.json" files in
  # the individual packages. However, we don't want to blow away peerDependencies, since they are in
  # the form of ">= 5.0.0". Thus, we specify both "--prod" and "--dev" to exclude syncing
  # peerDependencies.
  pnpx syncpack fix-mismatches --prod --dev

  # syncpack will automatically update most of the dependencies in the individual project
  # "package.json" files, but not the ones that do not exist in the root "package.json" (such as
  # "eslint-config-isaacscript"). Thus, we need to run individual update scripts.
  bash "$DIR/packages/isaacscript-cli/update.sh"
  bash "$DIR/packages/isaacscript-lint/update.sh"
fi
