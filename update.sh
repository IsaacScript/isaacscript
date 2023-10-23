#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

PACKAGE_JSON="$DIR/package.json"
OLD_HASH=$(md5sum "$PACKAGE_JSON")
if [[ -f "$DIR/yarn.lock" ]]; then
  yarn set version stable
fi
# @template-customization-start
# Old versions:
# - @mdx-js/react - Stuck until Docusaurus upgrades.
# - chalk - Stuck until "isaacscript-cli" can be upgraded to ESM; see it's "tsconfig.json".
# - nx - There is a bug in the latest version: https://github.com/nrwl/nx/issues/18409
# - prism-react-renderer - Stuck until Docusaurus upgrades.
# - react - Stuck until Docusaurus upgrades.
# - react-dom - Stuck until Docusaurus upgrades.
# - retext-english - Stuck until Docusaurus is on ESM.
# - unified - Stuck until Docusaurus is on ESM.
# @template-customization-end
npx npm-check-updates --upgrade --packageFile "$PACKAGE_JSON" --filterVersion "^*"
NEW_HASH=$(md5sum "$PACKAGE_JSON")
if [[ "$OLD_HASH" != "$NEW_HASH" ]]; then
  if [[ -f "$DIR/yarn.lock" ]]; then
    yarn install
  elif [[ -f "$DIR/pnpm-lock.yaml" ]]; then
    pnpm install
  else
    npm install
  fi

  # @template-customization-start

  # Now that the main dependencies have changed, we might need to update the "package.json" files in
  # the individual packages. However, we don't want to blow away peerDependencies, since they are in
  # the form of ">= 5.0.0". Thus, we specify "--types prod,dev" to exclude syncing peerDependencies.
  npx syncpack fix-mismatches --types "prod,dev"

  # syncpack will automatically update most of the dependencies in the individual project
  # "package.json" files, but not the ones that do not exist in the root "package.json" (such as
  # "eslint-config-isaacscript"). Thus, we need to run individual update scripts.
  bash "$DIR/packages/isaacscript-lint/update.sh"

  # @template-customization-end
fi
