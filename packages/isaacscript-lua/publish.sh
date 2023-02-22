#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Subroutines
function pause() {
   read -r -p "$*"
}

# Read the username and password.
# shellcheck disable=SC1091
source .env
if [[ -z ${PYPI_USERNAME-} ]]; then
  echo "Error: PYPI_USERNAME is not set. Copy \".env_template\" to \".env\" and fill in the values."
  exit 1
fi
if [[ -z ${PYPI_PASSWORD-} ]]; then
  echo "Error: PYPI_PASSWORD is not set. Copy \".env_template\" to \".env\" and fill in the values."
  exit 1
fi

# Check to see if poetry is installed.
if ! command -v "poetry" > /dev/null; then
  echo "Error: poetry is not installed."
  exit 1
fi

# Parse the version from the TOML file.
PROJECT_FILE="pyproject.toml"
cd "$DIR"
VERSION=$(sed -n 's/^.*version = "\(.*\)"/\1/p' $PROJECT_FILE)

echo "Make sure that you bump the version in the \"$PROJECT_FILE\" file."
echo "Using version: $VERSION"
pause "Press enter to continue..."

# From: https://levelup.gitconnected.com/how-to-publish-a-python-command-line-application-to-pypi-5b97a6d586f1
poetry publish --username "$PYPI_USERNAME" --password "$PYPI_PASSWORD" --build
