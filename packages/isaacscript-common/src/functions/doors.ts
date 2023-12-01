import type {
  Direction,
  DoorSlotFlag,
  RoomShape,
} from "isaac-typescript-definitions";
import {
  DoorSlot,
  DoorState,
  DoorVariant,
  GridEntityType,
  GridRoom,
  RoomType,
} from "isaac-typescript-definitions";
import {
  DOOR_SLOT_FLAG_VALUES,
  DOOR_SLOT_VALUES,
} from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../core/constants";
import {
  DEFAULT_DOOR_SLOT,
  DOOR_SLOT_FLAG_TO_DOOR_SLOT,
} from "../objects/doorSlotFlagToDoorSlot";
import { DOOR_SLOT_TO_DIRECTION } from "../objects/doorSlotToDirection";
import { DOOR_SLOT_TO_DOOR_SLOT_FLAG } from "../objects/doorSlotToDoorSlotFlag";
import { OPPOSITE_DOOR_SLOTS } from "../objects/oppositeDoorSlots";
import { ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES } from "../objects/roomShapeToDoorSlotCoordinates";
import { ROOM_SHAPE_TO_DOOR_SLOTS } from "../objects/roomShapeToDoorSlots";
import { ReadonlySet } from "../types/ReadonlySet";
import { arrayToBitFlags } from "./bitwise";
import { directionToVector } from "./direction";
import { isEnumValue } from "./enums";
import { hasFlag } from "./flag";
import { isTSTLSet } from "./tstlClass";
import { parseIntSafe } from "./types";

export function closeAllDoors(): void {
  for (const door of getDoors()) {
    door.Close(true);
  }
}

/**
 * Use this instead of the `GridEntityDoor.Close` method if you want the door to immediately close
 * without an animation.
 */
export function closeDoorFast(door: GridEntityDoor): void {
  door.State = DoorState.CLOSED;

  const sprite = door.GetSprite();
  sprite.Play("Closed", true);
}

export function doorSlotFlagToDoorSlot(doorSlotFlag: DoorSlotFlag): DoorSlot {
  const doorSlot = DOOR_SLOT_FLAG_TO_DOOR_SLOT[doorSlotFlag];
  return doorSlot ?? DEFAULT_DOOR_SLOT;
}

export function doorSlotFlagsToDoorSlots(
  doorSlotFlags: BitFlags<DoorSlotFlag>,
): readonly DoorSlot[] {
  const doorSlots: DoorSlot[] = [];

  for (const doorSlotFlag of DOOR_SLOT_FLAG_VALUES) {
    if (hasFlag(doorSlotFlags, doorSlotFlag)) {
      const doorSlot = doorSlotFlagToDoorSlot(doorSlotFlag);
      doorSlots.push(doorSlot);
    }
  }

  return doorSlots;
}

export function doorSlotToDirection(doorSlot: DoorSlot): Direction {
  return DOOR_SLOT_TO_DIRECTION[doorSlot];
}

export function doorSlotToDoorSlotFlag(doorSlot: DoorSlot): DoorSlotFlag {
  return DOOR_SLOT_TO_DOOR_SLOT_FLAG[doorSlot];
}

/**
 * Helper function to convert an array of door slots or a set of door slots to the resulting bit
 * flag number.
 */
export function doorSlotsToDoorSlotFlags(
  doorSlots:
    | DoorSlot[]
    | readonly DoorSlot[]
    | Set<DoorSlot>
    | ReadonlySet<DoorSlot>,
): BitFlags<DoorSlotFlag> {
  const doorSlotArray = isTSTLSet(doorSlots)
    ? [...doorSlots.values()]
    : (doorSlots as DoorSlot[]);
  const doorSlotFlagArray = doorSlotArray.map((doorSlot) =>
    doorSlotToDoorSlotFlag(doorSlot),
  );

  return arrayToBitFlags(doorSlotFlagArray);
}

export function getAngelRoomDoor(): GridEntityDoor | undefined {
  const angelRoomDoors = getDoors(RoomType.ANGEL);
  return angelRoomDoors.length === 0 ? undefined : angelRoomDoors[0];
}

/**
 * Helper function to get the door that leads to the off-grid room that contains the hole to the
 * Blue Womb. (In vanilla, the door will only appear in the It Lives Boss Room.)
 *
 * Returns undefined if the room has no Blue Womb doors.
 */
export function getBlueWombDoor(): GridEntityDoor | undefined {
  const doors = getDoors();
  return doors.find((door) => isBlueWombDoor(door));
}

/**
 * Helper function to get the door that leads to the Boss Rush. (In vanilla, the door will only
 * appear in the Boss Room of the sixth floor.)
 *
 * Returns undefined if the room has no Boss Rush doors.
 */
export function getBossRushDoor(): GridEntityDoor | undefined {
  const doors = getDoors();
  return doors.find((door) => isBossRushDoor(door));
}

export function getDevilRoomDoor(): GridEntityDoor | undefined {
  const devilRoomDoors = getDoors(RoomType.DEVIL);
  return devilRoomDoors.length === 0 ? undefined : devilRoomDoors[0];
}

/**
 * If there is both a Devil Room and an Angel Room door, this function will return door with the
 * lowest slot number.
 */
export function getDevilRoomOrAngelRoomDoor(): GridEntityDoor | undefined {
  const devilRoomOrAngelRoomDoors = getDoors(RoomType.DEVIL, RoomType.ANGEL);
  return devilRoomOrAngelRoomDoors.length === 0
    ? undefined
    : devilRoomOrAngelRoomDoors[0];
}

/**
 * Helper function to get the position that a player will enter a room at corresponding to a door.
 *
 * When players enter a room, they do not appear exactly on the location of the door, because then
 * they would immediately collide with the loading zone. Instead, they appear on the grid tile next
 * to the door.
 */
export function getDoorEnterPosition(door: GridEntityDoor): Readonly<Vector> {
  const offset = getDoorSlotEnterPositionOffset(door.Slot);
  return door.Position.add(offset);
}

/**
 * Helper function to get the position that a player will enter a room at corresponding to a door
 * slot.
 *
 * When players enter a room, they do not appear exactly on the location of the door, because then
 * they would immediately collide with the loading zone. Instead, they appear on the grid tile next
 * to the door.
 */
export function getDoorSlotEnterPosition(doorSlot: DoorSlot): Readonly<Vector> {
  const room = game.GetRoom();
  const position = room.GetDoorSlotPosition(doorSlot);
  const offset = getDoorSlotEnterPositionOffset(doorSlot);
  return position.add(offset);
}

/**
 * Helper function to get the offset from a door position that a player will enter a room at.
 *
 * When players enter a room, they do not appear exactly on the location of the door, because then
 * they would immediately collide with the loading zone. Instead, they appear on the grid tile next
 * to the door.
 */
export function getDoorSlotEnterPositionOffset(
  doorSlot: DoorSlot,
): Readonly<Vector> {
  const direction = doorSlotToDirection(doorSlot);
  const vector = directionToVector(direction);

  // The player appears in the opposite direction of the way that the door is oriented in the room.
  const oppositeVector = vector.mul(-1);

  return oppositeVector.mul(DISTANCE_OF_GRID_TILE);
}

/** Helper function to get the possible door slots that can exist for a given room shape. */
export function getDoorSlotsForRoomShape(
  roomShape: RoomShape,
): ReadonlySet<DoorSlot> {
  return ROOM_SHAPE_TO_DOOR_SLOTS[roomShape];
}

/**
 * Helper function to get all of the doors in the room. By default, it will return every door.
 *
 * You can optionally specify one or more room types to return only the doors that match the
 * specified room types.
 *
 * @allowEmptyVariadic
 */
export function getDoors(...roomTypes: RoomType[]): readonly GridEntityDoor[] {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();
  const roomTypesSet = new ReadonlySet(roomTypes);

  // We iterate over the possible door slots for this room shape instead of all door slots in order
  // to prevent crashes from accessing invalid memory.
  const possibleDoorSlots = getDoorSlotsForRoomShape(roomShape);

  const doors: GridEntityDoor[] = [];
  for (const doorSlot of possibleDoorSlots) {
    const door = room.GetDoor(doorSlot);
    if (door === undefined) {
      continue;
    }

    // In Repentance, sometimes doors won't be doors for some reason.
    const gridEntityType = door.GetType();
    if (gridEntityType !== GridEntityType.DOOR) {
      continue;
    }

    if (roomTypesSet.size === 0 || roomTypesSet.has(door.TargetRoomType)) {
      doors.push(door);
    }
  }

  return doors;
}

/**
 * Helper function to get all of the doors in the room that lead to the provided room index.
 *
 * This function is variadic, meaning that you can specify N arguments to return all of the doors
 * that match any of the N room grid indexes.
 */
export function getDoorsToRoomIndex(
  ...roomGridIndex: int[]
): readonly GridEntityDoor[] {
  const roomGridIndexesSet = new ReadonlySet(roomGridIndex);
  const doors = getDoors();
  return doors.filter((door) => roomGridIndexesSet.has(door.TargetRoomIndex));
}

/**
 * Helper function to get the door that leads to the Mega Satan Boss Room. (In vanilla, the door
 * will only appear in the starting room of The Chest / Dark Room.)
 *
 * Returns undefined if the room has no Mega Satan doors.
 */
export function getMegaSatanDoor(): GridEntityDoor | undefined {
  const doors = getDoors();
  return doors.find((door) => isMegaSatanDoor(door));
}

export function getOppositeDoorSlot(doorSlot: DoorSlot): DoorSlot | undefined {
  return OPPOSITE_DOOR_SLOTS[doorSlot];
}

/**
 * Helper function to get the door that leads to the "secret exit" off-grid room that takes you to
 * the Repentance floor or to the version of Depths 2 that has Dad's Key.
 *
 * Returns undefined if the room has no Repentance doors.
 */
export function getRepentanceDoor(): GridEntityDoor | undefined {
  const doors = getDoors();
  return doors.find((door) => isRepentanceDoor(door));
}

/**
 * Helper function to get the corresponding door slot for a given room shape and grid coordinates.
 */
export function getRoomShapeDoorSlot(
  roomShape: RoomShape,
  x: int,
  y: int,
): DoorSlot | undefined {
  const doorSlotCoordinates = ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES[
    roomShape
  ] as Record<DoorSlot, readonly [x: int, y: int]>;

  for (const [doorSlotString, coordinates] of Object.entries(
    doorSlotCoordinates,
  )) {
    const doorSlot = parseIntSafe(doorSlotString);
    if (doorSlot === undefined || !isEnumValue(doorSlot, DoorSlot)) {
      continue;
    }

    const [doorX, doorY] = coordinates;
    if (x === doorX && y === doorY) {
      return doorSlot;
    }
  }

  return undefined;
}

/**
 * Helper function to get the room grid coordinates for a specific room shape and door slot
 * combination.
 */
export function getRoomShapeDoorSlotCoordinates(
  roomShape: RoomShape,
  doorSlot: DoorSlot,
): readonly [x: int, y: int] | undefined {
  const doorSlotCoordinates = ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES[
    roomShape
  ] as Record<DoorSlot, readonly [x: int, y: int]>;

  return doorSlotCoordinates[doorSlot];
}

/**
 * Helper function to find unused door slots in the current room that can be used to make custom
 * doors.
 */
export function getUnusedDoorSlots(): readonly DoorSlot[] {
  const room = game.GetRoom();

  return DOOR_SLOT_VALUES.filter(
    (doorSlot) =>
      // We need to filter out the -1 value to prevent crashes.
      doorSlot !== DoorSlot.NO_DOOR_SLOT &&
      room.IsDoorSlotAllowed(doorSlot) &&
      room.GetDoor(doorSlot) === undefined,
  );
}

/**
 * Helper function to get the door that leads to the off-grid room that contains the portal to The
 * Void. (In vanilla, the door will only appear in the Hush Boss Room.)
 *
 * Returns undefined if the room has no Void doors.
 */
export function getVoidDoor(): GridEntityDoor | undefined {
  const doors = getDoors();
  return doors.find((door) => isVoidDoor(door));
}

/**
 * Helper function to check if the current room has one or more doors that lead to the given room
 * type.
 *
 * This function is variadic, meaning that you can supply as many door types as you want to check
 * for. This function will return true if one or more room types match.
 */
export function hasDoorType(...roomTypes: RoomType[]): boolean {
  const doors = getDoors();
  const doorsOfThisRoomType = doors.filter((door) =>
    roomTypes.some((roomType) => door.IsRoomType(roomType)),
  );
  return doorsOfThisRoomType.length > 0;
}

/**
 * Helper function to check if the current room has one or more open door slots that can be used to
 * make custom doors.
 */
export function hasUnusedDoorSlot(): boolean {
  const unusedDoorSlots = getUnusedDoorSlots();
  return unusedDoorSlots.length > 0;
}

export function isAngelRoomDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomType === RoomType.ANGEL;
}

/**
 * Helper function to check if the provided door is the one that leads to the off-grid room that
 * contains the hole to the Blue Womb. (In vanilla, the door will only appear in the It Lives Boss
 * Room.)
 */
export function isBlueWombDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomIndex === GridRoom.BLUE_WOMB;
}

/**
 * Helper function to check if the provided door is the one that leads to the Boss Rush room. (In
 * vanilla, the door will only appear in the Boss Room of the sixth floor.)
 */
export function isBossRushDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomIndex === GridRoom.BOSS_RUSH;
}

export function isDevilRoomDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomType === RoomType.DEVIL;
}

/** Helper function to see if a door slot could exist for a given room shape. */
export function isDoorSlotInRoomShape(
  doorSlot: DoorSlot,
  roomShape: RoomShape,
): boolean {
  const doorSlots = getDoorSlotsForRoomShape(roomShape);
  return doorSlots.has(doorSlot);
}

/**
 * This refers to the Repentance door that spawns in a boss room after defeating the boss. You have
 * to spend one key to open it. It has a sprite filename of "gfx/grid/door_downpour.anm2".
 */
export function isDoorToDownpour(door: GridEntityDoor): boolean {
  if (!isRepentanceDoor(door)) {
    return false;
  }

  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_Downpour.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_downpour.anm2";
}

/**
 * This refers to the Repentance door that spawns in a boss room after defeating the boss. You have
 * to spend two hearts to open it. It has a sprite filename of "gfx/grid/door_mausoleum.anm2".
 */
export function isDoorToMausoleum(door: GridEntityDoor): boolean {
  if (!isRepentanceDoor(door)) {
    return false;
  }

  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_Mausoleum.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_mausoleum.anm2";
}

/**
 * This refers to the "strange door" located on the first room of Depths 2. You open it with either
 * a Polaroid or a Negative. It has a sprite filename of "gfx/grid/door_mausoleum_alt.anm2".
 */
export function isDoorToMausoleumAscent(door: GridEntityDoor): boolean {
  if (!isRepentanceDoor(door)) {
    return false;
  }

  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_Mausoleum_Alt.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_mausoleum_alt.anm2";
}

/**
 * This refers to the Repentance door that spawns in a boss room after defeating the boss. You have
 * to spend two bombs to open it. It has a sprite filename of "gfx/grid/door_mines.anm2".
 */
export function isDoorToMines(door: GridEntityDoor): boolean {
  if (!isRepentanceDoor(door)) {
    return false;
  }

  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_Mines.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_mines.anm2";
}

/**
 * This refers to the Repentance door that spawns after defeating Mom. You open it with the
 * completed knife. It has a sprite filename of "gfx/grid/door_momsheart.anm2".
 */
export function isDoorToMomsHeart(door: GridEntityDoor): boolean {
  if (!isRepentanceDoor(door)) {
    return false;
  }

  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_MomsHeart.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_momsheart.anm2"; // cspell:ignore momsheart
}

export function isHiddenSecretRoomDoor(door: GridEntityDoor): boolean {
  const sprite = door.GetSprite();
  const animation = sprite.GetAnimation();

  return isSecretRoomDoor(door) && animation === "Hidden";
}

/**
 * Helper function to check if the provided door is the one that leads to the Mega Satan Boss Room.
 * (In vanilla, the door will only appear in the starting room of The Chest / Dark Room.)
 */
export function isMegaSatanDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomIndex === GridRoom.MEGA_SATAN;
}

/**
 * Helper function to check if the provided door leads to the "secret exit" off-grid room that takes
 * you to the Repentance floor.
 */
export function isRepentanceDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomIndex === GridRoom.SECRET_EXIT;
}

/**
 * This refers to the hole in the wall that appears after bombing the entrance to a secret room.
 * Note that the door still exists before it has been bombed open. It has a sprite filename of
 * "gfx/grid/door_08_holeinwall.anm2".
 *
 * Note that since Ultra Secret Rooms do not use holes, this function will not detect an Ultra
 * Secret Room door.
 */
export function isSecretRoomDoor(door: GridEntityDoor): boolean {
  const sprite = door.GetSprite();
  const fileName = sprite.GetFilename();

  // On Windows, this is: "gfx/grid/Door_08_HoleInWall.anm2"
  return fileName.toLowerCase() === "gfx/grid/door_08_holeinwall.anm2"; // cspell:ignore holeinwall
}

/**
 * Helper function to check if the provided door is the one that leads to the off-grid room that
 * contains the portal to The Void. (In vanilla, the door will only appear in the Hush Boss Room.)
 */
export function isVoidDoor(door: GridEntityDoor): boolean {
  return door.TargetRoomIndex === GridRoom.VOID;
}

/**
 * Helper function to reset an unlocked door back to a locked state. Doing this is non-trivial
 * because in addition to calling the `GridEntityDoor.SetLocked` method, you must also:
 *
 * - Set the `VisitedCount` of the room's `RoomDescription` to 0.
 * - Set the variant to `DoorVariant.DOOR_LOCKED`.
 * - Close the door.
 */
export function lockDoor(door: GridEntityDoor): void {
  const level = game.GetLevel();

  // We can't use the "getRoomDescriptor" function since it will cause a dependency cycle.
  const roomDescriptor = level.GetRoomByIdx(door.TargetRoomIndex);
  roomDescriptor.VisitedCount = 0;

  door.SetVariant(DoorVariant.LOCKED);
  door.SetLocked(true);
  door.Close(true);
}

/**
 * For the purposes of this function, doors to Secret Rooms or Super Secret Rooms that have not been
 * discovered yet will not be opened.
 */
export function openAllDoors(): void {
  for (const door of getDoors()) {
    // If we try to open a hidden Secret Room door (or Super Secret Room door), then nothing will
    // happen.
    door.Open();
  }
}

/**
 * Use this instead of the `GridEntityDoor.Open` method if you want the door to immediately open
 * without an animation.
 */
export function openDoorFast(door: GridEntityDoor): void {
  door.State = DoorState.OPEN;

  const sprite = door.GetSprite();
  sprite.Play("Opened", true);
}

/**
 * Helper function to remove all of the doors in the room. By default, it will remove every door.
 * You can optionally specify one or more room types to remove only the doors that match the
 * specified room types.
 *
 * @returns The number of doors removed.
 * @allowEmptyVariadic
 */
export function removeAllDoors(...roomTypes: RoomType[]): int {
  const doors = getDoors(...roomTypes);
  removeDoors(...doors);

  return doors.length;
}

/** Helper function to remove a single door. */
export function removeDoor(door: GridEntityDoor): void {
  const room = game.GetRoom();
  room.RemoveDoor(door.Slot);
}

/**
 * Helper function to remove the doors provided.
 *
 * This function is variadic, meaning that you can specify as many doors as you want to remove.
 */
export function removeDoors(...doors: GridEntityDoor[]): void {
  for (const door of doors) {
    removeDoor(door);
  }
}
