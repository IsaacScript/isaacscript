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
  --entryPoints "$DIR/src/index.ts" \
  --entryPoints "$DIR/src/challenges.ts" \
  --entryPoints "$DIR/src/constants.ts" \
  --entryPoints "$DIR/src/features/deployJSONRoom.ts" \
  --entryPoints "$DIR/src/features/disableInputs.ts" \
  --entryPoints "$DIR/src/features/forgottenSwitch.ts" \
  --entryPoints "$DIR/src/features/getCollectibleItemPoolType.ts" \
  --entryPoints "$DIR/src/features/preventCollectibleRotate.ts" \
  --entryPoints "$DIR/src/features/runInNFrames.ts" \
  --entryPoints "$DIR/src/features/saveDataManager/exports.ts" \
  --entryPoints "$DIR/src/features/sirenHelpers.ts" \
  --entryPoints "$DIR/src/functions/array.ts" \
  --entryPoints "$DIR/src/functions/bitwise.ts" \
  --entryPoints "$DIR/src/functions/cards.ts" \
  --entryPoints "$DIR/src/functions/charge.ts" \
  --entryPoints "$DIR/src/functions/collectibles.ts" \
  --entryPoints "$DIR/src/functions/collectibleSet.ts" \
  --entryPoints "$DIR/src/functions/collectibleCacheFlag.ts" \
  --entryPoints "$DIR/src/functions/color.ts" \
  --entryPoints "$DIR/src/functions/debug.ts" \
  --entryPoints "$DIR/src/functions/deepCopy.ts" \
  --entryPoints "$DIR/src/functions/doors.ts" \
  --entryPoints "$DIR/src/functions/entity.ts" \
  --entryPoints "$DIR/src/functions/entitySpecific.ts" \
  --entryPoints "$DIR/src/functions/familiars.ts" \
  --entryPoints "$DIR/src/functions/flag.ts" \
  --entryPoints "$DIR/src/functions/flying.ts" \
  --entryPoints "$DIR/src/functions/globals.ts" \
  --entryPoints "$DIR/src/functions/gridEntity.ts" \
  --entryPoints "$DIR/src/functions/input.ts" \
  --entryPoints "$DIR/src/functions/json.ts" \
  --entryPoints "$DIR/src/functions/language.ts" \
  --entryPoints "$DIR/src/functions/log.ts" \
  --entryPoints "$DIR/src/functions/map.ts" \
  --entryPoints "$DIR/src/functions/math.ts" \
  --entryPoints "$DIR/src/functions/npc.ts" \
  --entryPoints "$DIR/src/functions/pickups.ts" \
  --entryPoints "$DIR/src/functions/player.ts" \
  --entryPoints "$DIR/src/functions/playerHealth.ts" \
  --entryPoints "$DIR/src/functions/pills.ts" \
  --entryPoints "$DIR/src/functions/pocketItems.ts" \
  --entryPoints "$DIR/src/functions/position.ts" \
  --entryPoints "$DIR/src/functions/random.ts" \
  --entryPoints "$DIR/src/functions/revive.ts" \
  --entryPoints "$DIR/src/functions/rooms.ts" \
  --entryPoints "$DIR/src/functions/seeds.ts" \
  --entryPoints "$DIR/src/functions/set.ts" \
  --entryPoints "$DIR/src/functions/sound.ts" \
  --entryPoints "$DIR/src/functions/spawnCollectible.ts" \
  --entryPoints "$DIR/src/functions/sprite.ts" \
  --entryPoints "$DIR/src/functions/stage.ts" \
  --entryPoints "$DIR/src/functions/string.ts" \
  --entryPoints "$DIR/src/functions/table.ts" \
  --entryPoints "$DIR/src/functions/tears.ts" \
  --entryPoints "$DIR/src/functions/transformations.ts" \
  --entryPoints "$DIR/src/functions/trinkets.ts" \
  --entryPoints "$DIR/src/functions/trinketCacheFlag.ts" \
  --entryPoints "$DIR/src/functions/trinketGive.ts" \
  --entryPoints "$DIR/src/functions/trinketSet.ts" \
  --entryPoints "$DIR/src/functions/ui.ts" \
  --entryPoints "$DIR/src/functions/utils.ts" \
  --entryPoints "$DIR/src/functions/vector.ts" \
  --entryPoints "$DIR/src/maps/cardDescriptionMap.ts" \
  --entryPoints "$DIR/src/maps/cardNameMap.ts" \
  --entryPoints "$DIR/src/maps/challengeNameMap.ts" \
  --entryPoints "$DIR/src/maps/collectibleDescriptionMap.ts" \
  --entryPoints "$DIR/src/maps/collectibleNameMap.ts" \
  --entryPoints "$DIR/src/maps/gridEntityTypeToBrokenStateMap.ts" \
  --entryPoints "$DIR/src/maps/gridEntityXMLMap.ts" \
  --entryPoints "$DIR/src/maps/pillEffectClassMap.ts" \
  --entryPoints "$DIR/src/maps/pillEffectNameMap.ts" \
  --entryPoints "$DIR/src/maps/pillEffectTypeMap.ts" \
  --entryPoints "$DIR/src/maps/roomShapeToTopLeftWallGridIndexMap.ts" \
  --entryPoints "$DIR/src/maps/transformationNameMap.ts" \
  --entryPoints "$DIR/src/maps/trinketDescriptionMap.ts" \
  --entryPoints "$DIR/src/maps/trinketNameMap.ts" \
  --entryPoints "$DIR/src/types/DefaultMap.ts" \
  --entryPoints "$DIR/src/upgradeMod.ts" \
