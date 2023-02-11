#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

function is_git_repo_clean() {
  GIT_STATUS="$(git status --porcelain)"
  if [ -z "$GIT_STATUS" ]; then
    return 0
  fi
  return 1
}

cd "$DIR"

# Ensure that the checked out version of this repository is the latest version. (It is possible that
# another commit has been pushed in the meantime, in which case we should do nothing and wait for
# the CI on that commit to finish.)
# https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
git fetch
if [ "$(git rev-parse HEAD)" != "$(git rev-parse '@{u}')" ]; then
  echo "Error: A more recent commit was found in the remote repository."
  exit 0 # Don't "exit 1" because we do not want to cause CI failures.
fi

# Only do Git checks if this script was called with the "check" argument.
if [ "${1=}" = "check" ]; then
  if ! is_git_repo_clean; then
    echo "Error: The current Git repository is not clean."
    exit 1
  fi
fi

npx tsx "$DIR/tools/generate.ts"

if [ "${1-}" = "check" ]; then
  if ! is_git_repo_clean; then
    echo "Error: The \"$0\" script resulted in changed files."
    exit 1
  fi
fi

echo "All generation scripts were successful."
