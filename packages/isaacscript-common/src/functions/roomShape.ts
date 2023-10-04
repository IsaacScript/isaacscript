import type { DoorSlot } from "isaac-typescript-definitions";
import { RoomShape } from "isaac-typescript-definitions";
import type { Corner } from "../interfaces/Corner";
import { ROOM_SHAPE_BOUNDS } from "../objects/roomShapeBounds";
import { ROOM_SHAPE_CORNERS } from "../objects/roomShapeCorners";
import { ROOM_SHAPE_LAYOUT_SIZES } from "../objects/roomShapeLayoutSizes";
import { ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION } from "../objects/roomShapeToBottomRightPosition";
import { ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA } from "../objects/roomShapeToDoorSlotsToGridIndexDelta";
import { ROOM_SHAPE_TO_GRID_WIDTH } from "../objects/roomShapeToGridWidth";
import { ROOM_SHAPE_TO_TOP_LEFT_POSITION } from "../objects/roomShapeToTopLeftPosition";
import { ROOM_SHAPE_VOLUMES } from "../objects/roomShapeVolumes";
import { L_ROOM_SHAPES_SET } from "../sets/LRoomShapesSet";
import { BIG_ROOM_SHAPES_SET } from "../sets/bigRoomShapesSet";
import { NARROW_ROOM_SHAPES_SET } from "../sets/narrowRoomShapesSet";

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
 * Helper function to see if a given room shape will grant a single charge or a double charge to the
 * player's active item(s).
 *
 * For example, `RoomShape.SHAPE_2x2` will return 2.
 */
export function getRoomShapeBottomRightPosition(
  roomShape: RoomShape,
): Readonly<Vector> {
  return ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION[roomShape];
}

/**
 * Helper function to get the grid position of the bottom-right tile of a given room shape.
 *
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export function getRoomShapeBounds(
  roomShape: RoomShape,
): readonly [width: int, height: int] {
  return ROOM_SHAPE_BOUNDS[roomShape];
}

/**
 * Helper function to get the number of charges that a given room shape will grant to a player upon
 * clearing it.
 *
 * For example, `RoomShape.SHAPE_2x2` will return 2.
 */
export function getRoomShapeCharges(roomShape: RoomShape): int {
  return isRoomShapeDoubleCharge(roomShape) ? 2 : 1;
}

/**
 * Helper function to get the corners that exist in the given room shape.
 *
 * Note that these corner locations are not accurate for the Mother Boss Room and the Home closet
 * rooms. (Those rooms have custom shapes.)
 */
export function getRoomShapeCorners(roomShape: RoomShape): readonly Corner[] {
  return ROOM_SHAPE_CORNERS[roomShape];
}

/**
 * Helper function to get the dimensions of a room shape's layout. This is NOT the size of the
 * room's actual contents! For that, use the `getRoomShapeBounds` function.
 *
 * For example, a horizontal narrow room has a layout size of equal to that of a 1x1 room.
 */
export function getRoomShapeLayoutSize(
  roomShape: RoomShape,
): readonly [width: int, height: int] {
  return ROOM_SHAPE_LAYOUT_SIZES[roomShape];
}

/**
 * Helper function to get the grid position of the top-left tile of a given room shape.
 *
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export function getRoomShapeTopLeftPosition(
  roomShape: RoomShape,
): Readonly<Vector> {
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

/**
 * Helper function to detect if the provided room shape is big. Specifically, this is all 1x2 rooms,
 * 2x2 rooms, and L rooms.
 */
export function isBigRoomShape(roomShape: RoomShape): boolean {
  return BIG_ROOM_SHAPES_SET.has(roomShape);
}

export function isLRoomShape(roomShape: RoomShape): boolean {
  return L_ROOM_SHAPES_SET.has(roomShape);
}

export function isNarrowRoom(roomShape: RoomShape): boolean {
  return NARROW_ROOM_SHAPES_SET.has(roomShape);
}

/**
 * Helper function to see if a given room shape will grant a single charge or a double charge to the
 * player's active item(s).
 *
 * For example, `RoomShape.SHAPE_2x2` will return true.
 */
export function isRoomShapeDoubleCharge(roomShape: RoomShape): boolean {
  // 2x2 rooms and L rooms should grant 2 charges.
  return roomShape >= RoomShape.SHAPE_2x2;
}
