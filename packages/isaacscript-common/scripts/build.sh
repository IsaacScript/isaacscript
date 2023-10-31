#!/bin/bash

set -euo pipefail # Exit on errors and undefined variables.

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the package:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
PACKAGE_NAME="$(basename "$DIR")"

echo "Building: $PACKAGE_NAME"

SECONDS=0

cd "$DIR"

REPO_ROOT="$DIR/../.."
OUT_DIR="$REPO_ROOT/dist/packages/$PACKAGE_NAME"

rm -rf "$OUT_DIR"

# Compile the project using TSTL, which will generate ".lua" files and ".d.ts" files.
npx tstl

# The declaration maps will be bugged due to the consolidated "dist" directory, so we use a script
# to manually rewrite them.
npx tsx "$REPO_ROOT/scripts/rewriteSourceMapDeclarationMapPaths.ts" "isaacscript-common"

# Scrub internal exports from the declaration file using the ".d.ts rollup" feature of API
# Extractor: https://api-extractor.com/
# If we did not use API Extractor, we would instead have to manually append "@internal" JSDoc tags
# to every single private function in order for the TypeScript compiler to remove it from the
# generated ".d.ts" file. API Extractor automatically knows which functions are public or private by
# parsing the "index.ts" file, and generates a new ".d.ts" file with private exports removed. Note
# that end-users can still manually import internal functions with e.g.
# `import { RunInNFrames } from "isaacscript-common/dist/src/classes/features/other/RunInNFrames";
# but by removing them from the ".d.ts" file, they will not appear as part of auto-complete, which
# is good enough for our case. However, a downside of this method is that the declaration maps will
# not work:
# https://github.com/microsoft/rushstack/issues/1886
# https://github.com/timocov/dts-bundle-generator/issues/218
npx api-extractor run

# API Extractor will make a "dist/tsdoc-metadata.json" file, which we don't need.
rm -rf "$DIR/dist"

# Copy the rest of the files needed for npm.
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"
cp "$DIR/src" "$OUT_DIR/" --recursive

# Bundle the entire library into one file specifically for Lua consumers. We also include
# `isaac-typescript-definitions` in the bundled exports so that Lua users do not have to consume two
# separate libraries.
if [[ "${1-}" == "fast" ]]; then
  echo "Skipping the Lua build due to the \"fast\" option being present."
else
  INDEX_LUA="$DIR/src/indexLua.ts"
  cp "$DIR/src/index.ts" "$INDEX_LUA"
  echo "export * from \"isaac-typescript-definitions\";" >> "$INDEX_LUA"
  npx tstl --project "$DIR/tsconfig.bundle.json"
  rm -f "$INDEX_LUA"
fi

echo "Successfully built $PACKAGE_NAME in $SECONDS seconds."
