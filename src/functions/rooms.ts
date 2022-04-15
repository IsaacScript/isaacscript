import { game, sfxManager } from "../cachedClasses";
import { MAX_ROOM_INDEX, NUM_DIMENSIONS } from "../constants";
import { DOUBLE_TROUBLE_ROOM_VARIANTS } from "../sets/doubleTroubleRoomVariants";
import {
  closeAllDoors,
  getDoors,
  isHiddenSecretRoomDoor,
  openDoorFast,
} from "./doors";
import { getEntities } from "./entity";
import { hasFlag } from "./flag";
import { range } from "./math";
import {
  getEntityPositions,
  getEntityVelocities,
  setEntityPositions,
  setEntityVelocities,
} from "./positionVelocity";
import {
  getCurrentRoomDescriptorReadOnly,
  getRoomAllowedDoors,
  getRoomData,
  getRoomDescriptor,
  getRoomGridIndex,
  getRoomShape,
  getRoomStageID,
  getRoomSubType,
  getRoomVariant,
} from "./roomData";
import { getGridIndexDelta } from "./roomShape";

/**
 * Helper function for quickly switching to a new room without playing a particular animation.
 * Use this helper function over invoking the `Game.ChangeRoom` method directly to ensure that you
 * do not forget to set the `LeaveDoor` property and to prevent crashing on invalid room grid
 * indexes.
 */
export function changeRoom(roomGridIndex: int): void {
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    error(
      `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
    );
  }

  // LeaveDoor must be set before every ChangeRoom() invocation or else the function can send you to
  // the wrong room
  level.LeaveDoor = -1;

  game.ChangeRoom(roomGridIndex);
}

export function getAllRoomGridIndexes(): int[] {
  const rooms = getRooms();
  return rooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to get the current dimension. Most of the time, this will be `Dimension.MAIN`,
 * but it can change if e.g. the player is in the mirror world of Downpour/Dross.
 *
 * Note that this function correctly handles detecting the Death Certificate dimension, which is
 * tricky to properly detect.
 */
export function getCurrentDimension(): Dimension {
  const level = game.GetLevel();

  // When in the Death Certificate dimension, the algorithm below will randomly return either
  // "Dimension.SECONDARY" or "Dimension.DEATH_CERTIFICATE"
  // Thus, we revert to an alternate technique to determine if we are in the Death Certificate
  // dimension
  if (inDeathCertificateArea()) {
    return Dimension.DEATH_CERTIFICATE;
  }

  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const startingRoomDescription = level.GetRoomByIdx(
    startingRoomGridIndex,
    Dimension.CURRENT,
  );
  const startingRoomHash = GetPtrHash(startingRoomDescription);

  for (const dimension of range(NUM_DIMENSIONS - 1)) {
    const dimensionRoomDescription = level.GetRoomByIdx(
      startingRoomGridIndex,
      dimension,
    );
    const dimensionRoomHash = GetPtrHash(dimensionRoomDescription);
    if (dimensionRoomHash === startingRoomHash) {
      return dimension;
    }
  }

  return error(
    `Failed to get the current dimension using the starting room index of: ${startingRoomGridIndex}`,
  );
}

/**
 * Helper function to get an array of all of the safe grid indexes for rooms that match the
 * specified room type.
 *
 * This function only searches through rooms in the current dimension.
 *
 * This function is variadic, meaning that you can specify N arguments to get the combined grid
 * indexes for N room types.
 */
export function getRoomGridIndexesForType(...roomTypes: RoomType[]): int[] {
  const roomTypesSet = new Set<RoomType>([...roomTypes]);

  const rooms = getRooms();
  const matchingRooms = rooms.filter(
    (roomDescriptor) =>
      roomDescriptor.Data !== undefined &&
      roomTypesSet.has(roomDescriptor.Data.Type),
  );

  return matchingRooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to get the item pool type for the current room. For example, this returns
 * `ItemPoolType.ItemPoolType.POOL_ANGEL` if you are in an Angel Room.
 */
export function getRoomItemPoolType(): ItemPoolType {
  const itemPool = game.GetItemPool();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSeed = room.GetSpawnSeed();

  return itemPool.GetPoolForRoom(roomType, roomSeed);
}

/**
 * Helper function to get the room descriptor for every room on the level. Uses the `Level.GetRooms`
 * method to accomplish this.
 *
 * @param includeExtraDimensionalRooms Optional. On some floors (e.g. Downpour 2, Mines 2),
 * extra-dimensional rooms are automatically be generated and can be seen when you iterate over the
 * `RoomList`. Default is false.
 */
export function getRooms(
  includeExtraDimensionalRooms = false,
): RoomDescriptor[] {
  const level = game.GetLevel();
  const roomList = level.GetRooms();

  const rooms: RoomDescriptor[] = [];

  if (includeExtraDimensionalRooms) {
    for (let i = 0; i < roomList.Size; i++) {
      const roomDescriptor = roomList.Get(i);
      if (roomDescriptor !== undefined) {
        rooms.push(roomDescriptor);
      }
    }
  } else {
    for (let i = 0; i <= MAX_ROOM_INDEX; i++) {
      const roomDescriptor = level.GetRoomByIdx(i);
      if (roomDescriptor !== undefined) {
        rooms.push(roomDescriptor);
      }
    }
  }

  return rooms;
}

/**
 * Helper function to determine if the current room shape is equal to `RoomShape.ROOMSHAPE_1x2` or
 * `RoomShape.ROOMSHAPE_2x1`.
 */
export function in2x1Room(): boolean {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return (
    roomShape === RoomShape.ROOMSHAPE_1x2 ||
    roomShape === RoomShape.ROOMSHAPE_2x1
  );
}

export function inAngelShop(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_ANGEL && roomSubType === AngelRoomSubType.SHOP
  );
}

export function inBeastRoom(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_DUNGEON &&
    roomSubType === DungeonSubType.BEAST_ROOM
  );
}

/**
 * Helper function to check if the current room is a boss room for a particular boss. This will only
 * work for bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function inBossRoomOf(bossID: BossID): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomStageID = getRoomStageID();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_BOSS &&
    roomStageID === StageID.SPECIAL_ROOMS &&
    roomSubType === bossID
  );
}

/**
 * Helper function for determining whether the current room is a crawlspace. Use this function over
 * comparing to `RoomType.ROOM_DUNGEON` or `GridRooms.ROOM_DUNGEON_IDX` since there is a special
 * case of the player being in a boss fight that take place in a dungeon.
 */
export function inCrawlspace(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_DUNGEON && roomSubType === DungeonSubType.NORMAL
  );
}

/**
 * We cannot use the standard code in the `inDimension` function for this purpose since it is bugged
 * with the Death Certificate area.
 */
export function inDeathCertificateArea(): boolean {
  const roomStageID = getRoomStageID();
  const roomSubType = getRoomSubType();

  return (
    roomStageID === StageID.HOME &&
    (roomSubType === HomeRoomSubType.DEATH_CERTIFICATE_ENTRANCE ||
      roomSubType === HomeRoomSubType.DEATH_CERTIFICATE_ITEMS)
  );
}

/**
 * Helper function to detect if the current room is a Treasure Room created when entering with a
 * Devil's Crown trinket. Under the hood, this checks for the `RoomDescriptorFlag.DEVIL_TREASURE`
 * flag.
 */
export function inDevilsCrownTreasureRoom(): boolean {
  const roomDescriptor = getCurrentRoomDescriptorReadOnly();
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
}

export function inDimension(dimension: Dimension): boolean {
  return dimension === getCurrentDimension();
}

export function inDoubleTrouble(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomVariant = getRoomVariant();

  return (
    roomType === RoomType.ROOM_BOSS &&
    DOUBLE_TROUBLE_ROOM_VARIANTS.has(roomVariant)
  );
}

export function inGenesisRoom(): boolean {
  const roomGridIndex = getRoomGridIndex();
  return roomGridIndex === GridRooms.ROOM_GENESIS_IDX;
}

/** Helper function to determine if the current room shape is one of the four L room shapes. */
export function inLRoom(): boolean {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return (
    roomShape === RoomShape.ROOMSHAPE_LTL ||
    roomShape === RoomShape.ROOMSHAPE_LTR ||
    roomShape === RoomShape.ROOMSHAPE_LBL ||
    roomShape === RoomShape.ROOMSHAPE_LBR
  );
}

export function inMegaSatanRoom(): boolean {
  const roomGridIndex = getRoomGridIndex();
  return roomGridIndex === GridRooms.ROOM_MEGA_SATAN_IDX;
}

/**
 * Helper function to check if the current room is a miniboss room for a particular miniboss. This
 * will only work for minibosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function inMinibossRoomOf(minibossID: MinibossID): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomStageID = getRoomStageID();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_MINIBOSS &&
    roomStageID === StageID.SPECIAL_ROOMS &&
    roomSubType === minibossID
  );
}

/**
 * Helper function for checking if the room is a secret shop (from the Member Card collectible).
 *
 * Secret shops are simply copies of normal shops, but with the backdrop of a secret room. In other
 * words, they will have the same room type, room variant, and room sub-type of a normal shop. Thus,
 * the only way to detect them is by using the grid index.
 */
export function inSecretShop(): boolean {
  const roomGridIndex = getRoomGridIndex();
  return roomGridIndex === GridRooms.ROOM_SECRET_SHOP_IDX;
}

/**
 * Helper function to determine whether or not the current room is the starting room of a floor.
 * It only returns true for the starting room of the primary dimension (meaning that being in the
 * starting room of the mirror world does not count).
 */
export function inStartingRoom(): boolean {
  const level = game.GetLevel();
  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const roomGridIndex = getRoomGridIndex();

  return roomGridIndex === startingRoomGridIndex && inDimension(Dimension.MAIN);
}

/**
 * Helper function to loop through every room on the floor and see if it has been cleared.
 *
 * This function will only check rooms in the current dimension.
 *
 * @param onlyCheckRoomTypes Optional. A whitelist of room types. If specified, room types not in
 * the array will be ignored. If not specified, then all rooms will be checked. Undefined by
 * default.
 */
export function isAllRoomsClear(onlyCheckRoomTypes?: RoomType[]): boolean {
  const roomTypeWhitelist =
    onlyCheckRoomTypes === undefined ? null : new Set(onlyCheckRoomTypes);
  const rooms = getRooms();
  const matchingRooms =
    roomTypeWhitelist === null
      ? rooms
      : rooms.filter(
          (roomDescriptor) =>
            roomDescriptor.Data !== undefined &&
            roomTypeWhitelist.has(roomDescriptor.Data.Type),
        );

  return matchingRooms.every((roomDescriptor) => roomDescriptor.Clear);
}

export function isDoorSlotValidAtGridIndex(
  doorSlot: DoorSlot,
  roomGridIndex: int,
): boolean {
  const allowedDoors = getRoomAllowedDoors(roomGridIndex);
  return allowedDoors.has(doorSlot);
}

export function isDoorSlotValidAtGridIndexForRedRoom(
  doorSlot: DoorSlot,
  roomGridIndex: int,
): boolean {
  const doorSlotValidAtGridIndex = isDoorSlotValidAtGridIndex(
    doorSlot,
    roomGridIndex,
  );
  if (!doorSlotValidAtGridIndex) {
    return false;
  }

  const roomShape = getRoomShape(roomGridIndex);
  if (roomShape === undefined) {
    return false;
  }

  const delta = getGridIndexDelta(roomShape, doorSlot);
  if (delta === undefined) {
    return false;
  }

  const redRoomGridIndex = roomGridIndex + delta;
  return !roomExists(redRoomGridIndex);
}

/**
 * Helper function to detect if the provided room was created by the Red Key item. Under the hood,
 * this checks for the `RoomDescriptorFlag.FLAG_RED_ROOM` flag.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isRedKeyRoom(roomGridIndex?: int): boolean {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.RED_ROOM);
}

/**
 * Helper function to determine if the provided room is part of the floor layout. For
 * example, Devil Rooms and the Mega Satan room are not considered to be inside the map.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isRoomInsideMap(roomGridIndex?: int): boolean {
  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  return roomGridIndex >= 0;
}

/** Helper function to check if a room exists at the given room grid index. */
export function roomExists(roomGridIndex: int): boolean {
  const roomData = getRoomData(roomGridIndex);
  return roomData !== undefined;
}

/**
 * If the `Room.Update` method is called in a PostNewRoom callback, then some entities will slide
 * around (such as the player). Since those entity velocities are already at zero, setting them to
 * zero will have no effect. Thus, a generic solution is to record all of the entity
 * positions/velocities before updating the room, and then restore those positions/velocities.
 */
export function roomUpdateSafe(): void {
  const room = game.GetRoom();
  const entities = getEntities();

  const entityPositions = getEntityPositions(entities);
  const entityVelocities = getEntityVelocities(entities);

  room.Update();

  setEntityPositions(entityPositions, entities);
  setEntityVelocities(entityVelocities, entities);
}

/**
 * Helper function to convert an uncleared room to a cleared room in the PostNewRoom callback. This
 * is useful because if enemies are removed in this callback, a room drop will be awarded and the
 * doors will start closed and then open.
 */
export function setRoomCleared(): void {
  const room = game.GetRoom();
  const roomClear = room.IsClear();

  // If the room is already cleared, we don't have to do anything
  if (roomClear) {
    return;
  }

  room.SetClear(true);

  for (const door of getDoors()) {
    if (isHiddenSecretRoomDoor(door)) {
      continue;
    }

    // We don't use the "EntityDoor.Open" method since that will cause the door to play an animation
    openDoorFast(door);

    // If this is a mini-boss room, then the door would be barred in addition to being closed
    // Ensure that the bar is not visible
    door.ExtraVisible = false;
  }

  sfxManager.Stop(SoundEffect.SOUND_DOOR_HEAVY_OPEN);

  // If the room contained Mom's Hands, then a screen shake will be queued
  // Override it with a 0 frame shake
  game.ShakeScreen(0);
}

/**
 * Helper function to emulate what happens when you bomb an Angel Statue or push a Reward Plate that
 * spawns an NPC.
 */
export function setRoomUncleared(): void {
  const room = game.GetRoom();

  room.SetClear(false);
  closeAllDoors();
}

/**
 * Helper function to change the current room. It can be used for both teleportation and "normal"
 * room transitions, depending on what is passed for the `direction` and `roomTransitionAnim`
 * arguments. Use this function instead of invoking the `Game.StartRoomTransition` method directly
 * so that you do not forget to set `Level.LeaveDoor` property and to prevent crashing on invalid
 * room grid indexes.
 *
 * @param roomGridIndex The room grid index of the destination room.
 * @param direction Optional. Default is `Direction.NO_DIRECTION`.
 * @param roomTransitionAnim Optional. Default is `RoomTransitionAnim.TELEPORT`.
 */
export function teleport(
  roomGridIndex: int,
  direction = Direction.NO_DIRECTION,
  roomTransitionAnim = RoomTransitionAnim.TELEPORT,
): void {
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    error(
      `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
    );
  }

  // This must be set before every `Game.StartRoomTransition` method invocation or else the function
  // can send you to the wrong room
  level.LeaveDoor = -1;

  game.StartRoomTransition(roomGridIndex, direction, roomTransitionAnim);
}
