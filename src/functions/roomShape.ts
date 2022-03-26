import { ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION } from "../objects/roomShapeToBottomRightPosition";
import { ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA } from "../objects/roomShapeToGridIndexDelta";
import { ROOM_SHAPE_TO_TOP_LEFT_POSITION } from "../objects/roomShapeToTopLeftPosition";

/**
 * Helper function to get the grid index delta that a door out of the given room shape would lead
 * to. For example, if you went through the bottom door in a room of `RoomShape.ROOMSHAPE_1x2`, you
 * would end up in a room with a grid index that is +26 units from the `SafeGridIndex` of where you
 * started.
 */
export function getGridIndexDelta(
  roomShape: RoomShape,
  doorSlot: DoorSlot,
): int | undefined {
  const doorSlotToGridIndexMap =
    ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA[roomShape];
  if (doorSlotToGridIndexMap === undefined) {
    return undefined;
  }

  return doorSlotToGridIndexMap.get(doorSlot);
}

export function getRoomShapeBottomRightPosition(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION[roomShape];
}

export function getRoomShapeTopLeftPosition(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_TO_TOP_LEFT_POSITION[roomShape];
}
