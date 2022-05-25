import { DoorSlot, RoomShape } from "isaac-typescript-definitions";
import { ROOM_SHAPE_BOUNDS } from "../objects/roomShapeBounds";
import { ROOM_SHAPE_LAYOUT_SIZES } from "../objects/roomShapeLayoutSizes";
import { ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION } from "../objects/roomShapeToBottomRightPosition";
import { ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA } from "../objects/roomShapeToDoorSlotsToGridIndexDelta";
import { ROOM_SHAPE_TO_GRID_WIDTH } from "../objects/roomShapeToGridWidth";
import { ROOM_SHAPE_TO_TOP_LEFT_POSITION } from "../objects/roomShapeToTopLeftPosition";
import { ROOM_SHAPE_VOLUMES } from "../objects/roomShapeVolumes";
import { L_ROOM_SHAPES_SET } from "../sets/LRoomShapesSet";

/**
 * Helper function to get the grid index delta that a door out of the given room shape would lead
 * to. For example, if you went through the bottom door in a room of `RoomShape.SHAPE_1x2`, you
 * would end up in a room with a grid index that is +26 units from the `SafeGridIndex` of where you
 * started.
 */
export function getGridIndexDelta(
  roomShape: RoomShape,
  doorSlot: DoorSlot,
): int | undefined {
  const doorSlotToGridIndexMap =
    ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA[roomShape];
  return doorSlotToGridIndexMap.get(doorSlot);
}

/**
 * Helper function to get the grid position of the bottom-right tile of a given room shape.
 *
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export function getRoomShapeBottomRightPosition(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION[roomShape];
}

/**
 * Helper function to get the bounds of a room shape, which are a box representing its contents.
 * This does not include the tiles that the walls are on. L rooms use the same bounds as a 2x2 room.
 */
export function getRoomShapeBounds(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_BOUNDS[roomShape];
}

/**
 * Helper function to get the dimensions of a room shape's layout. This is NOT the size of the
 * room's actual contents! For that, use the `getRoomShapeBounds` function.
 *
 * For example, a horizontal narrow room has a layout size of equal to that of a 1x1 room.
 */
export function getRoomShapeLayoutSize(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_LAYOUT_SIZES[roomShape];
}

/**
 * Helper function to get the grid position of the top-left tile of a given room shape.
 *
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export function getRoomShapeTopLeftPosition(roomShape: RoomShape): Vector {
  return ROOM_SHAPE_TO_TOP_LEFT_POSITION[roomShape];
}

/**
 * Helper function to get the volume of a room shape, which is the amount of tiles that are inside
 * the room.
 *
 * (This cannot be directly calculated from the bounds since L rooms are a special case.)
 */
export function getRoomShapeVolume(roomShape: RoomShape): int {
  return ROOM_SHAPE_VOLUMES[roomShape];
}

export function getRoomShapeWidth(roomShape: RoomShape): int {
  return ROOM_SHAPE_TO_GRID_WIDTH[roomShape];
}

export function isLRoom(roomShape: RoomShape): boolean {
  return L_ROOM_SHAPES_SET.has(roomShape);
}
