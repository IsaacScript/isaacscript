#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Get the name of the repository:
# https://stackoverflow.com/questions/23162299/how-to-get-the-last-part-of-dirname-in-bash/23162553
REPO_NAME="$(basename "$DIR")"

SECONDS=0

cd "$DIR"

OUT_DIR="$DIR/../../dist/packages/$REPO_NAME"

rm -rf "$OUT_DIR"

# API Extractor will make a "dist/tsdoc-metadata.json" file, which we don't need.
rm -rf "$DIR/dist"

# Compile the project using TSTL, which will generate ".lua" files and ".d.ts" files.
npx tstl

# The declaration maps will be bugged due to nx's consolidated "dist" directory, so we use a script
# to manually rewrite them.
npx ts-node --require "tsconfig-paths/register" "$DIR/scripts/rewriteDeclarationMapPaths.ts"

# Unfortunately, TypeScript will create ".d.ts" definitions for internal functions such as
# `postAmbushFinishedHasSubscriptions`, which will make them appear in the auto-complete of
# end-users. One solution for this problem is to use "@internal" JSDoc tags on every single internal
# function, but this is verbose and prone ot error. The best solution for this problem is to use a
# ".d.ts rollup" tool such as `api-extractor` or `dts-bundle-generator`. However, both of these
# tools do not support declaration maps, which we want to have turned on for end-users so that they
# can press F12 on functions to warp to the actual source code:
# https://github.com/microsoft/rushstack/issues/1886
# https://github.com/timocov/dts-bundle-generator/issues/218
# For now, this project uses a mixture of "@internal" JSDoc tags and manually deleting some
# declarations. Note that end-users can still manually import internal functions with e.g.
# `import { internalFunction } from "isaacscript-common/dist/internal/functions"`, but by removing
# them from the ".d.ts" file, they will not appear as part of auto-complete, which is good enough
# for our case.
rm -f "$OUT_DIR/dist/callbacks/*.d.ts"
rm -f "$OUT_DIR/dist/callbacks/*.d.ts.map"
rm -f "$OUT_DIR/dist/callbacks/subscriptions/*.d.ts"
rm -f "$OUT_DIR/dist/callbacks/subscriptions/*.d.ts.map"

# Copy the rest of the files needed for npm.
cp "$DIR/LICENSE" "$OUT_DIR/"
cp "$DIR/package.json" "$OUT_DIR/"
cp "$DIR/README.md" "$OUT_DIR/"
cp --recursive "$DIR/src" "$OUT_DIR/"

echo "Successfully built in $SECONDS seconds."
