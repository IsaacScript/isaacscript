import type { BossID } from "isaac-typescript-definitions";
import { RoomType, StageID } from "isaac-typescript-definitions";
import { DOOR_SLOT_VALUES } from "../cachedEnumValues";
import { game } from "../core/cachedClasses";
import { filterMap } from "./array";
import {
  getRoomDescriptorsForType,
  isDoorSlotValidAtGridIndexForRedRoom,
} from "./levelGrid";
import { getNumRooms, getRoomsInsideGrid } from "./rooms";

/** Helper function to fill every possible level grid square with a red room. */
export function fillLevelWithRedRooms(): void {
  const level = game.GetLevel();

  let numRoomsInGrid: int;
  do {
    const roomsInGrid = getRoomsInsideGrid();
    numRoomsInGrid = roomsInGrid.length;

    for (const roomDescriptor of roomsInGrid) {
      for (const doorSlot of DOOR_SLOT_VALUES) {
        if (
          isDoorSlotValidAtGridIndexForRedRoom(
            doorSlot,
            roomDescriptor.GridIndex,
          )
        ) {
          level.MakeRedRoomDoor(roomDescriptor.GridIndex, doorSlot);
        }
      }
    }
  } while (numRoomsInGrid !== getNumRooms());
}

/**
 * Helper function to get the boss IDs of all of the Boss Rooms on this floor. (This is equivalent
 * to the sub-type of the room data.)
 *
 * Note that this will only look at Boss Rooms inside of the grid, so e.g. Reverse Emperor card
 * rooms will not count.
 */
export function getLevelBossIDs(): readonly BossID[] {
  const roomsInsideGrid = getRoomsInsideGrid();

  return filterMap(roomsInsideGrid, (roomDescriptor) =>
    roomDescriptor.Data !== undefined &&
    roomDescriptor.Data.Type === RoomType.BOSS &&
    roomDescriptor.Data.StageID === StageID.SPECIAL_ROOMS
      ? roomDescriptor.Data.Subtype
      : undefined,
  );
}

/**
 * Helper function to check if the current floor has a Boss Room that matches the boss ID provided.
 *
 * This function is variadic, meaning that you can pass as many boss IDs as you want to check for.
 * It will return true if one or more of the boss IDs are matched.
 */
export function levelHasBossID(...bossIDs: readonly BossID[]): boolean {
  const levelBossIDs = getLevelBossIDs();
  const levelBossIDsSet = new Set(levelBossIDs);

  return bossIDs.some((bossID) => levelBossIDsSet.has(bossID));
}

/**
 * Helper function to check to see if the current floor has one or more of a specific room type in
 * it.
 *
 * This function is variadic, meaning that you can pass as many room types as you want to check for.
 * This function will return true if any of the room types are found.
 */
export function levelHasRoomType(...roomTypes: readonly RoomType[]): boolean {
  const roomDescriptors = getRoomDescriptorsForType(...roomTypes);
  return roomDescriptors.length > 0;
}
