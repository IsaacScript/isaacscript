#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# The website repository will be already cloned at this point by the parent GitHub action. See
# "ci.yml" for more information.
REPO_ROOT="$DIR/../.."
BUILD_PATH="$REPO_ROOT/dist/packages/docs"
DOCS_REPO_NAME="isaacscript.github.io"
DOCS_REPO="$REPO_ROOT/$DOCS_REPO_NAME"

#mv "$DOCS_REPO/.git" # TODO
cp --recursive "$BUILD_PATH/"* "$DOCS_REPO/"
cd "$DOCS_REPO"

set +e
if npx git-dirty; then
  echo "There are no docs changes to deploy."
  exit 0
fi
set -e

echo "Deploying changes to the docs website: $DOCS_REPO_NAME"

git config --global user.email "github-actions@users.noreply.github.com"
git config --global user.name "github-actions"

git add -A
git commit -m "deploy"
git push
