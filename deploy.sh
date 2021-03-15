#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

git add -A
git commit -m 'updates'
git push

GIT_USER=Zamiell USE_SSH=true DEPLOYMENT_BRANCH=main npx docusaurus deploy
