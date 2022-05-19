import { DoorSlot } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { getEnumValues } from "./enums";
import {
  getNumRooms,
  getRooms,
  isDoorSlotValidAtGridIndexForRedRoom,
} from "./rooms";

export function fillLevelWithRedRooms(): void {
  const level = game.GetLevel();

  let numRooms: int;
  do {
    const rooms = getRooms();
    numRooms = rooms.length;

    for (const roomDescriptor of rooms) {
      for (const doorSlot of getEnumValues(DoorSlot)) {
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
  } while (numRooms !== getNumRooms());
}
