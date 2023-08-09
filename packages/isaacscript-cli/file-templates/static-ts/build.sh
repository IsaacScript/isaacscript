#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

echo "Building: $REPO_NAME"

SECONDS=0

cd "$DIR"

NPM_LOCK="$DIR/package-lock.json"
NPM_LOCK_EXISTS=""
if [[ -f "$NPM_LOCK" ]]; then
  NPM_LOCK_EXISTS="1"
fi

YARN_LOCK="$DIR/yarn.lock"
YARN_LOCK_EXISTS=""
if [[ -f "$YARN_LOCK" ]]; then
  YARN_LOCK_EXISTS="1"
fi

PNPM_LOCK="$DIR/pnpm-lock.yaml"
PNPM_LOCK_EXISTS=""
if [[ -f "$PNPM_LOCK" ]]; then
  PNPM_LOCK_EXISTS="1"
fi

if [[ -z "$NPM_LOCK_EXISTS" && -z "$YARN_LOCK_EXISTS" && -z "$PNPM_LOCK_EXISTS" ]]; then
  echo "No package manager lock files were found. You should manually invoke the package manager that you want to use for this project. e.g. \"npm install\""
  exit 1
elif [[ -n "$NPM_LOCK_EXISTS" && -z "$YARN_LOCK_EXISTS" && -z "$PNPM_LOCK_EXISTS" ]]; then
  PACKAGE_MANAGER="npm"
elif [[ -z "$NPM_LOCK_EXISTS" && -n "$YARN_LOCK_EXISTS" && -z "$PNPM_LOCK_EXISTS" ]]; then
  PACKAGE_MANAGER="yarn"
elif [[ -z "$NPM_LOCK_EXISTS" && -z "$YARN_LOCK_EXISTS" && -n "$PNPM_LOCK_EXISTS" ]]; then
  PACKAGE_MANAGER="pnpm"
else
  echo "Error: Multiple different kinds of package manager lock files were found. You should delete the ones that you are not using so that this program can correctly detect your package manager."
  exit 1
fi

"$PACKAGE_MANAGER" run build

echo "Successfully built $REPO_NAME in $SECONDS seconds."
