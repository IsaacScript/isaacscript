import { DOOR_SLOT_VALUES } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { isDoorSlotValidAtGridIndexForRedRoom } from "./levelGrid";
import { getNumRooms, getRoomsInsideGrid } from "./rooms";

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
