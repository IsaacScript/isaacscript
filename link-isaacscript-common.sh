#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# This is a helper script to prepare the local development version of IsaacScript common to be
# consumed by a development mod.
yarn install
bash "$DIR/packages/isaacscript-common/build.sh"
cd "$DIR/dist/packages/isaacscript-common"
yarn link
