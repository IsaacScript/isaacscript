#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DOCS_REPO_NAME="isaacscript.github.io"
cd "$DIR"
rm -rf "$DIR/$DOCS_REPO_NAME"
git clone --depth 1 --branch gh-pages "git@github.com:IsaacScript/$DOCS_REPO_NAME.git"
cp -R "$DIR/build/"* "$DIR/$DOCS_REPO_NAME/"
cd "$DIR/$DOCS_REPO_NAME"

set +e
if npx git-dirty; then
  # There are no changes to deploy.
  exit 0
fi
set -e

echo "PUBLIC KEY:"
echo "~/.ssh/id_rsa.pub"

echo 1) git add -A
git add -A
echo 2) git commit -m "deploy"
git commit -m "deploy"
echo 3) git push
git push
