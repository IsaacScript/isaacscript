/* eslint-disable import/no-relative-packages */

// Run this script with the following command:
//
// ```sh
// npx ts-node --require "tsconfig-paths/register" --project "tools/tsconfig.json" "tools/generateCustomStageRooms.ts"
// ```
//
// For this script to work properly, `isaac-typescript-definitions` first have to be compiled to
// JavaScript. Thus, run the following commands:
//
// ```sh
// cd ./packages/isaac-typescript-definitions
// npx tsc
// cd ../..
// cp --recursive "./dist/packages/isaac-typescript-definitions" "./node_modules/"
// ```

import {
  DoorSlotFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { utils } from "isaacscript-cli";
import {
  convertBinaryToDecimal,
  convertDecimalToBinary,
  setToBitFlags,
} from "../packages/isaacscript-common/src/functions/bitwise";
import {
  doorSlotToDoorSlotFlag,
  getDoorSlotsForRoomShape,
} from "../packages/isaacscript-common/src/functions/doors";
import { getRoomShapeLayoutSize } from "../packages/isaacscript-common/src/functions/roomShape";
import { getSetCombinations } from "../packages/isaacscript-common/src/functions/set";

const { getEnumValues } = utils;

const rooms: string[] = [];

/**
 * We need to create an array of rooms like the following:
 *
 * ```xml
 * <room variant="80150" name="1x1" type="2" subtype="0" shape="1" width="13" height="7"
 * difficulty="1" weight="0.0">
 *   <door exists="True" x="-1" y="3"/>
 *   <door exists="True" x="6" y="-1"/>
 *   <door exists="True" x="6" y="7"/>
 *   <door exists="True" x="13" y="3"/>
 * </room>
 * ```
 *
 * - We can repeat room variants between different room types.
 * - The `RoomShape` enum goes from 1 to 12.
 *   - 12 in binary is 1100.
 *   - Thus, we need 4 bits to represent `RoomShape`.
 * - There are 8 possible door slots.
 *   - Thus, we need 8 bits to represent `BitFlags<DoorSlot>`.
 *
 * Thus, the room variant has the following sequence:
 * - 4 bits of `RoomShape` + 8 bits of `BitFlags<DoorSlot>`
 *
 * Even though Basement Renovator does not allow setting variants to values above 16 bits, values
 * with 17 bits work fine in-game.
 */

for (const roomType of getEnumValues(RoomType)) {
  for (const roomShape of getEnumValues(RoomShape)) {
    const roomShapeBits = convertDecimalToBinary(roomShape);

    const doorSlotsSet = getDoorSlotsForRoomShape(roomShape);
    const doorSlotFlagsSet = new Set<DoorSlotFlag>();
    for (const doorSlot of doorSlotsSet.values()) {
      const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
      doorSlotFlagsSet.add(doorSlotFlag);
    }

    const doorSlotFlagCombinations = getSetCombinations(doorSlotFlagsSet);
    for (const doorSlotFlagCombination of doorSlotFlagCombinations) {
      const doorSlotFlags = setToBitFlags(doorSlotFlagCombination);
      const doorSlotBits = convertDecimalToBinary(doorSlotFlags);

      const combinedBits = [...roomShapeBits, ...doorSlotBits];
      const roomVariant = convertBinaryToDecimal(combinedBits);

      const name = `Shape: ${roomShape}, DoorSlotFlags: ${doorSlotFlags}`;
      const [width, height] = getRoomShapeLayoutSize(roomShape);
      const room = `
<room name="${name}" type="${roomType}" variant="${roomVariant}" subtype="0" shape="${roomShape}" width="${width}" height="${height}" difficulty="1" weight="0.0">
      `.trim();
      rooms.push(room);
    }
  }
}

const xml = `
<?xml version="1.0" ?>
<rooms>
${rooms.join("\n")}
</rooms>
  `
  .trim()
  .concat("\n");

console.log(xml);
