#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting.
npx prettier --check .

# Step 2 - Use ESLint to lint the TypeScript.
# Since all ESLint errors are set to warnings, we set max warnings to 0 so that warnings will fail
# in CI.
npx eslint --max-warnings 0 src

# Step 3 - Spell check every file using cspell.
# We use "--no-progress" and "--no-summary" because we want to only output errors.
npx cspell --no-progress --no-summary "src/**/*.ts"

# Step 4 - Check for unused imports.
# The "--error" flag makes it return an error code of 1 if unused exports are found.
npx ts-prune --error

# Step 5 - Check for gitignore updates from GitHub.
tail -n +6 .gitignore > gitignore-template-local
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore --output gitignore-template-github --silent
diff gitignore-template-local gitignore-template-github
rm -f gitignore-template-local gitignore-template-github

echo "Successfully linted in $SECONDS seconds."
