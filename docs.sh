#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DOCS_DIR="$DIR/docs"
rm -rf "$DOCS_DIR"
npx typedoc \
  --out "$DOCS_DIR" \
  --readme "$DIR/website-root.md" \
  --entryPoints "$DIR/src/functions/array.ts" \
  --entryPoints "$DIR/src/functions/entity.ts" \
  --entryPoints "$DIR/src/functions/flags.ts" \
  --entryPoints "$DIR/src/functions/gridEntity.ts" \
  --entryPoints "$DIR/src/functions/input.ts" \
  --entryPoints "$DIR/src/functions/log.ts" \
  --entryPoints "$DIR/src/functions/math.ts" \
  --entryPoints "$DIR/src/functions/player.ts" \
  --entryPoints "$DIR/src/functions/random.ts" \
  --entryPoints "$DIR/src/functions/tears.ts" \
  --entryPoints "$DIR/src/functions/ui.ts" \
  --entryPoints "$DIR/src/functions/util.ts" \
  --entryPoints "$DIR/src/features/saveDataManager.ts" \
  --entryPoints "$DIR/src/callbacks/upgradeMod.ts" \
