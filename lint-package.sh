#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ -z "$NX_TASK_TARGET_PROJECT" ]]; then
  echo "The \"NX_TASK_TARGET_PROJECT\" environment variable is blank. Are you running this script manually? This script is only meant to be invoked by NX."
  exit 1
fi

bash "$DIR/packages/$NX_TASK_TARGET_PROJECT/lint.sh"
