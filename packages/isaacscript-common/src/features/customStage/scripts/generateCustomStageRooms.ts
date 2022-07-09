// Since this script uses both `isaac-typescript-definitions` and `isaacscript-common`, it must be
// also converted to Lua. It also must be run in game, because otherwise we would need to mock some
// parts of the Isaac API.

import {
  DoorSlot,
  DoorSlotFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import {
  convertBinaryToDecimal,
  convertDecimalToBinary,
  setToBitFlags,
} from "../../../functions/bitwise";
import {
  doorSlotToDoorSlotFlag,
  getDoorSlotsForRoomShape,
  getRoomShapeDoorSlotCoordinates,
} from "../../../functions/doors";
import { getEnumValues } from "../../../functions/enums";
import { hasFlag } from "../../../functions/flag";
import { getRoomShapeLayoutSize } from "../../../functions/roomShape";
import { getSetCombinations, getSortedSetValues } from "../../../functions/set";
import {
  CUSTOM_STAGE_BASE_ROOM_VARIANT,
  CUSTOM_STAGE_ILLEGAL_ROOM_TYPES,
  CUSTOM_STAGE_NUM_DOOR_SLOT_BITS,
  CUSTOM_STAGE_NUM_ROOM_SHAPE_BITS,
} from "../constants";

/**
 * Since room data is immutable, we need to create an array of empty rooms like the following:
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
// ts-prune-ignore-next
export function generateCustomStageBaseRooms(): void {
  const rooms: string[] = [];

  for (const roomType of getEnumValues(RoomType)) {
    if (CUSTOM_STAGE_ILLEGAL_ROOM_TYPES.has(roomType)) {
      continue;
    }

    for (const roomShape of getEnumValues(RoomShape)) {
      if (roomType !== RoomType.DEFAULT && roomShape !== RoomShape.SHAPE_1x1) {
        continue;
      }

      const roomShapeBits = convertDecimalToBinary(
        roomShape,
        CUSTOM_STAGE_NUM_ROOM_SHAPE_BITS,
      );

      const doorSlotsSet = getDoorSlotsForRoomShape(roomShape);
      const doorSlots = getSortedSetValues(doorSlotsSet);
      const doorSlotFlagsSet = new Set<DoorSlotFlag>();
      for (const doorSlot of doorSlots) {
        const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
        doorSlotFlagsSet.add(doorSlotFlag);
      }

      const doorSlotFlagCombinations = getSetCombinations(
        doorSlotFlagsSet,
        false,
      );
      for (const doorSlotFlagCombination of doorSlotFlagCombinations) {
        const doorSlotFlags = setToBitFlags(doorSlotFlagCombination);
        const doorSlotBits = convertDecimalToBinary(
          doorSlotFlags,
          CUSTOM_STAGE_NUM_DOOR_SLOT_BITS,
        );

        const combinedBits = [...roomShapeBits, ...doorSlotBits];
        const roomVariant =
          CUSTOM_STAGE_BASE_ROOM_VARIANT + convertBinaryToDecimal(combinedBits);

        const name = `Type: ${roomType}, Shape: ${roomShape}, DoorSlotFlags: ${doorSlotFlags}`;
        const [width, height] = getRoomShapeLayoutSize(roomShape);

        const roomHeader = `  <room name="${name}" type="${roomType}" variant="${roomVariant}" subtype="0" shape="${roomShape}" width="${width}" height="${height}" difficulty="1" weight="0.0">\n`;

        const doors: string[] = [];
        for (const doorSlot of doorSlots) {
          const thisDoorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
          const exists = hasFlag(doorSlotFlags, thisDoorSlotFlag);
          const existsText = exists ? "True" : "False";

          const coordinates = getRoomShapeDoorSlotCoordinates(
            roomShape,
            doorSlot,
          );
          if (coordinates === undefined) {
            error(
              `Failed to get the coordinates for room shape ${RoomShape[roomShape]} (${roomShape}) and door slot ${DoorSlot[doorSlot]} (${doorSlot}).`,
            );
          }
          const [x, y] = coordinates;

          // e.g. `<door exists="False" x="-1" y="3" />`
          const door = `    <door exists="${existsText}" x="${x}" y="${y}" />\n`;
          doors.push(door);
        }
        const doorsXML = doors.join("");

        const roomFooter = "  </room>\n";

        const room = roomHeader + doorsXML + roomFooter;
        rooms.push(room);
      }
    }
  }

  const xml = `
<?xml version="1.0" ?>
<rooms>
${rooms.join("")}
</rooms>`
    .trim()
    .concat("\n");

  // The `Isaac.DebugString` method has a maximum character limit, so we must print out each line
  // individually.
  for (const line of xml.split("\n")) {
    Isaac.DebugString(line);
  }
}
