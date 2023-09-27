#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

function is_git_repo_clean() {
  GIT_STATUS="$(git status --porcelain)"
  if [[ -z "$GIT_STATUS" ]]; then
    return 0
  fi
  return 1
}

cd "$DIR"

# Validate that we are on the correct branch.
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: You must be on the main branch before publishing."
  exit 1
fi

# Validate that we can push and pull to the repository.
git branch --set-upstream-to=origin/main main --quiet
git pull --rebase --quiet
git push --set-upstream origin main --quiet

# Validate that we are logged in to npm.
npm whoami > /dev/null

# Validate command-line arguments.
if [[ -z "${1-}" ]]; then
  echo "Error: The package name is required as an argument."
  exit 1
fi
PACKAGE_NAME="$1"

PACKAGE_DIR="$DIR/packages/$PACKAGE_NAME"
if [[ ! -d "$PACKAGE_DIR" ]]; then
  echo "Error: The directory of \"$PACKAGE_DIR\" does not exist."
  exit 1
fi

cd "$PACKAGE_DIR"

if [[ -z "${2-}" ]]; then
  echo "Error: The version bump description is required as an argument."
  exit 1
fi
VERSION_BUMP="$2"

# Before bumping the version, check to see if this package compiles and lints and tests (so that we
# can avoid unnecessary version bumps).
bash "$PACKAGE_DIR/build.sh"
bash "$PACKAGE_DIR/lint.sh"
if [[ -f "$PACKAGE_DIR/test.sh" ]]; then
  bash "$PACKAGE_DIR/test.sh"
fi

# Normally, the "version" command of the packager manager will automatically make a Git commit for
# you. However:
# - The npm version command is bugged with subdirectories: https://github.com/npm/cli/issues/2010
# - The yarn version command is bugged with with spaces inside of the --message" flag.
# Thus, we manually revert to doing a commit ourselves.
if [[ "$VERSION_BUMP" == "dev" ]]; then
  npm version prerelease --preid=dev --commit-hooks=false
else
  npm version "$VERSION_BUMP" --commit-hooks=false
fi

# Manually make a Git commit. (See above comment.)
git add "$PACKAGE_DIR/package.json"
# https://gist.github.com/DarrenN/8c6a5b969481725a4413
NEW_VERSION=$(npm pkg get version | sed 's/"//g')
COMMIT_MESSAGE="chore(release): $PACKAGE_NAME-$NEW_VERSION"
git commit --message "$COMMIT_MESSAGE"
TAG="$PACKAGE_NAME-$NEW_VERSION"
git tag "$TAG"
# (Defer doing a "git push" until the end so that we only trigger a single CI run.)

# We have to build again after bumping the version so that the new "package.json" file gets copied
# to the "dist" directory.
bash "$PACKAGE_DIR/build.sh"

# Prompt for the OTP code.
#echo "Type in the two-factor OTP code tied to the npm account."
#printf "\a" # Play a beep to alert that we are waiting for new input.
#read -r OTP_CODE
#if [[ -z "${OTP_CODE-}" ]]; then
#  echo "Error: The OTP code provided was blank."
#  exit 1
#fi

# Upload the package to npm.
cd "$DIR/dist/packages/$PACKAGE_NAME"
if [[ "$VERSION_BUMP" == "dev" ]]; then
  NPM_TAG=next
else
  NPM_TAG=latest
fi
# The "--access=public" flag is only technically needed for the first publish, but it is saved here
# for posterity.
npm publish --access=public --tag="$NPM_TAG" #--otp="$OTP_CODE"

sleep 1
bash "$DIR/update.sh"
npx syncpack fix-mismatches --types prod,dev
bash "$DIR/packages/isaacscript-lint/update.sh"

if ! is_git_repo_clean; then
  git commit --all --message "chore: updating dependencies"
fi

git push --set-upstream origin main
