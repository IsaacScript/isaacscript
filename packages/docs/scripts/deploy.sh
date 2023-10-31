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

function is_git_repo_latest_commit() {
  git fetch
  if [[ "$(git rev-parse HEAD)" == "$(git rev-parse '@{u}')" ]]; then
    return 0
  fi
  return 1
}

DOCS_REPO_NAME="isaacscript.github.io"
GITHUB_PAGES_URL="https://$DOCS_REPO_NAME/isaacscript-common/core/constants/index.html"
SECONDS_TO_SLEEP="10"

# Validate command-line arguments.
if [[ -z "${1-}" ]]; then
  echo "Error: The SHA1 of the commit is required as an argument."
  exit 1
fi
COMMIT_SHA1="$1"
SHORT_COMMIT_SHA1="${COMMIT_SHA1:0:7}"

# The website repository will be already cloned at this point by the previous GitHub action,
# including switching to the "gh-pages" branch. See "ci.yml" for more information.
REPO_ROOT="$DIR/../.."
BUILD_PATH="$REPO_ROOT/dist/packages/docs"
DOCS_REPO="$REPO_ROOT/$DOCS_REPO_NAME"
DOCS_REPO_GIT_BACKUP="/tmp/$DOCS_REPO_NAME.git"

mv "$DOCS_REPO/.git" "$DOCS_REPO_GIT_BACKUP"
rm -rf "$DOCS_REPO"
cp "$BUILD_PATH" "$DOCS_REPO" --recursive
mv "$DOCS_REPO_GIT_BACKUP" "$DOCS_REPO/.git"
cd "$DOCS_REPO"

if is_git_repo_clean; then
  echo "There are no documentation website changes to deploy."
  exit 0
fi

# Ensure that the checked out version of this repository is the latest version. (It is possible that
# another commit has been pushed in the meantime, in which case we should do nothing and wait for
# the CI on that commit to finish.)
# https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
cd "$REPO_ROOT"
if ! is_git_repo_latest_commit; then
  echo "A more recent commit was found in the repository; skipping website deployment."
  exit 0
fi
cd "$DOCS_REPO"

echo "Deploying changes to the documentation website: $DOCS_REPO_NAME"

git config --global user.email "github-actions@users.noreply.github.com"
git config --global user.name "github-actions"

# We overwrite the previous commit instead of adding a new one in order to keep the size of the
# repository as small as possible. This speeds up deployment because with thousands of commits, it
# takes a very long time to clone.
git add --all
git commit --message "deploy" --amend
git push --force-with-lease

cd "$REPO_ROOT"

# Wait for the website to be be live (which usually takes around 5 minutes).
while true; do
  if ! is_git_repo_latest_commit; then
    echo "A more recent commit was found in the repository; skipping website scraping."
    exit 0
  fi

  if curl "$GITHUB_PAGES_URL" --silent | grep "$SHORT_COMMIT_SHA1" > /dev/null; then
    echo "Found a link on \"$GITHUB_PAGES_URL\" matching the short commit of: $SHORT_COMMIT_SHA1"
    break
  fi

  echo "The latest version of the site ($SHORT_COMMIT_SHA1) has not yet been deployed to GitHub Pages. Sleeping for $SECONDS_TO_SLEEP seconds."
  sleep $SECONDS_TO_SLEEP
done

echo "SHOULD_SCRAPE=1" >> "$GITHUB_OUTPUT"
