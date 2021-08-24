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
  --entryPoints "$DIR/src/functions/deepCopy.ts" \
  --entryPoints "$DIR/src/functions/doors.ts" \
  --entryPoints "$DIR/src/functions/entity.ts" \
  --entryPoints "$DIR/src/functions/flag.ts" \
  --entryPoints "$DIR/src/functions/gridEntity.ts" \
  --entryPoints "$DIR/src/functions/input.ts" \
  --entryPoints "$DIR/src/functions/items.ts" \
  --entryPoints "$DIR/src/functions/json.ts" \
  --entryPoints "$DIR/src/functions/log.ts" \
  --entryPoints "$DIR/src/functions/math.ts" \
  --entryPoints "$DIR/src/functions/player.ts" \
  --entryPoints "$DIR/src/functions/random.ts" \
  --entryPoints "$DIR/src/functions/revive.ts"
  --entryPoints "$DIR/src/functions/rooms.ts" \
  --entryPoints "$DIR/src/functions/sprite.ts" \
  --entryPoints "$DIR/src/functions/stage.ts" \
  --entryPoints "$DIR/src/functions/tears.ts" \
  --entryPoints "$DIR/src/functions/transformations.ts" \
  --entryPoints "$DIR/src/functions/ui.ts" \
  --entryPoints "$DIR/src/functions/util.ts" \
  --entryPoints "$DIR/src/features/saveDataManager/main.ts" \
  --entryPoints "$DIR/src/upgradeMod.ts" \
