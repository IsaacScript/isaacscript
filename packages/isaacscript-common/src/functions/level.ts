import type { RoomType } from "isaac-typescript-definitions";
import { DOOR_SLOT_VALUES } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import {
  getRoomDescriptorsForType,
  isDoorSlotValidAtGridIndexForRedRoom,
} from "./levelGrid";
import { getNumRooms, getRoomsInsideGrid } from "./rooms";

/** Helper function to fill every possible square with a red room. */
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
 * Helper function to check to see if the current floor has one or more of a specific room type in
 * it.
 *
 * This function is variadic, meaning that you can pass as many room types as you want to check for.
 * This function will return true if any of the room types are found.
 */
export function levelHasRoomType(...roomTypes: RoomType[]): boolean {
  const roomDescriptors = getRoomDescriptorsForType(...roomTypes);
  return roomDescriptors.length > 0;
}
