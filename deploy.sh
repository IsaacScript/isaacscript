#!/bin/bash

set -e # Exit on any errors

git add -A
git commit -m 'updates'
git push

GIT_USER=Zamiell USE_SSH=true DEPLOYMENT_BRANCH=main npx docusaurus deploy
