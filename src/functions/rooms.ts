import { MAX_ROOM_INDEX, NUM_DIMENSIONS } from "../constants";
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

/**
 * Helper function for quickly switching to a new room without playing a particular animation.
 * Use this helper function over invoking `Game().ChangeRoom()` directly to ensure that you do not
 * forget to set the LeaveDoor property and to prevent crashing on invalid room grid indexes.
 */
export function changeRoom(roomGridIndex: int): void {
  const game = Game();
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
  const game = Game();
  const level = game.GetLevel();

  // When in the Death Certificate dimension, the algorithm below will randomly return either
  // "Dimension.SECONDARY" or "Dimension.DEATH_CERTIFICATE"
  // Thus, we revert to an alternate technique to determine if we are in the Death Certificate
  // dimension
  if (inDeathCertificateArea()) {
    return Dimension.DEATH_CERTIFICATE;
  }

  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const startingRoomDesc = level.GetRoomByIdx(
    startingRoomGridIndex,
    Dimension.CURRENT,
  );
  const startingRoomHash = GetPtrHash(startingRoomDesc);

  for (const dimension of range(0, NUM_DIMENSIONS - 1)) {
    const dimensionRoomDesc = level.GetRoomByIdx(
      startingRoomGridIndex,
      dimension,
    );
    const dimensionRoomHash = GetPtrHash(dimensionRoomDesc);
    if (dimensionRoomHash === startingRoomHash) {
      return dimension;
    }
  }

  return error(
    `Failed to get the current dimension using the starting room index of: ${startingRoomGridIndex}`,
  );
}

/**
 * Alias for the `Level.GetCurrentRoomDesc()` method. Use this to make it more clear what type of
 * `RoomDescriptor` object that you are retrieving.
 */
export function getCurrentRoomDescriptorReadOnly(): RoomDescriptorReadOnly {
  const game = Game();
  const level = game.GetLevel();

  return level.GetCurrentRoomDesc();
}

/**
 * Helper function to get the room data for the provided room.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function getRoomData(roomGridIndex?: int): RoomConfig | undefined {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.Data;
}

/**
 * Helper function for getting the type of the room with the given grid index.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 * @returns The room data type. Returns -1 if the type was not found.
 */
export function getRoomType(roomGridIndex?: int): RoomType {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Type;
}

/**
 * Helper function to get the descriptor for a room.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function getRoomDescriptor(roomGridIndex?: int): RoomDescriptor {
  const game = Game();
  const level = game.GetLevel();

  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  return level.GetRoomByIdx(roomGridIndex);
}

/**
 * Helper function to get the grid index of the current room.
 *
 * - If the current room is inside of the grid, this function will return the `SafeGridIndex` from
 *   the room descriptor. (The safe grid index is defined as the top-left 1x1 section that the room
 *   overlaps with, or the top-right 1x1 section of a `RoomType.ROOMSHAPE_LTL` room.)
 * - If the current room is outside of the grid, it will return the index from the
 *   `Level.GetCurrentRoomIndex` method (since `SafeGridIndex` is bugged for these cases).
 *
 * Use this function instead of the `Level.GetCurrentRoomIndex` method directly because the latter
 * will return the specific 1x1 quadrant that the player entered the room at. For most situations,
 * using the safe grid index is more reliable than this.
 *
 * Data structures that store data per room should use the room's `ListIndex` instead of
 * `SafeGridIndex`, since the former is unique across different dimensions.
 */
export function getRoomGridIndex(): int {
  const game = Game();
  const level = game.GetLevel();
  const currentRoomIndex = level.GetCurrentRoomIndex();

  // Both `RoomDescriptor.GridIndex` and `RoomDescriptor.SafeGridIndex` will always be equal to -1
  // for rooms outside of the grid
  // Thus, we revert to using the `Level.GetCurrentRoomIndex` method for these cases
  if (currentRoomIndex < 0) {
    return currentRoomIndex;
  }

  const roomDescriptor = getCurrentRoomDescriptorReadOnly();
  return roomDescriptor.SafeGridIndex;
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
  const game = Game();
  const itemPool = game.GetItemPool();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSeed = room.GetSpawnSeed();

  return itemPool.GetPoolForRoom(roomType, roomSeed);
}

/**
 * Helper function to get the list grid index of the provided room, which is equal to the index in
 * the `Level.GetRooms().Get()` method. In other words, this is equal to the order that the room was
 * created by the floor generation algorithm.
 *
 * Use this as an index for data structures that store data per room, since it is unique across
 * different dimensions.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function getRoomListIndex(roomGridIndex?: int): int {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.ListIndex;
}

/**
 * Helper function to get the name of the room as it appears in the STB/XML data.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 * @returns The room name. Returns "Unknown" if the type was not found.
 */
export function getRoomName(roomGridIndex?: int): string {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? "Unknown" : roomData.Name;
}

/**
 * Helper function to get the stage ID for a room from the XML/STB data. The room stage ID will
 * correspond to the first number in the filename of the XML/STB file. For example, a Depths room
 * would have a stage ID of 7.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 * @returns The room stage ID. Returns -1 if the stage ID was not found.
 */
export function getRoomStageID(roomGridIndex?: int): StageID {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.StageID;
}

/**
 * Helper function to get the sub-type for a room from the XML/STB data. The room sub-type will
 * correspond to different things depending on what XML/STB file it draws from. For example, in the
 * "00.special rooms.stb" file, an Angel Room with a sub-type of 0 will correspond to a normal Angel
 * Room and a sub-type of 1 will correspond to an Angel Room shop for The Stairway.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 * @returns The room sub-type. Returns -1 if the sub-type was not found.
 */
export function getRoomSubType(roomGridIndex?: int): int {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Subtype;
}

/**
 * Helper function to get the variant for a room from the XML/STB data. You can think of a room
 * variant as its identifier. For example, to go to Basement room #123, you would use a console
 * command of `goto d.123` while on the Basement.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 * @returns The room variant. Returns -1 if the variant was not found.
 */
export function getRoomVariant(roomGridIndex?: int): int {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Variant;
}

/**
 * Note that the room visited count will be inaccurate during the period before the PostNewRoom
 * callback has fired (i.e. when entities are initializing and performing their first update). This
 * is because the variable is only incremented immediately before the PostNewRoom callback fires.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function getRoomVisitedCount(roomGridIndex?: int): int {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.VisitedCount;
}

/**
 * Helper function to get the room descriptor for every room on the level. Uses the
 * `Level.GetRooms()` method to accomplish this.
 *
 * @param includeExtraDimensionalRooms Optional. On some floors (e.g. Downpour 2, Mines 2),
 * extra-dimensional rooms are automatically be generated and can be seen when you iterate over the
 * `RoomList`. False by default.
 */
export function getRooms(
  includeExtraDimensionalRooms = false,
): RoomDescriptor[] {
  const game = Game();
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
 * Converts a room X and Y coordinate to a position. For example, the coordinates of 0, 0 are
 * equal to `Vector(80, 160)`.
 */
export function gridToPos(x: int, y: int): Vector {
  const game = Game();
  const room = game.GetRoom();

  x += 1;
  y += 1;

  const gridIndex = y * room.GetGridWidth() + x;

  return room.GetGridPosition(gridIndex);
}

/**
 * Helper function to determine if the current room shape is equal to `RoomShape.ROOMSHAPE_1x2` or
 * `RoomShape.ROOMSHAPE_2x1`.
 */
export function in2x1Room(): boolean {
  const game = Game();
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return (
    roomShape === RoomShape.ROOMSHAPE_1x2 ||
    roomShape === RoomShape.ROOMSHAPE_2x1
  );
}

export function inAngelShop(): boolean {
  const game = Game();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_ANGEL && roomSubType === AngelRoomSubType.SHOP
  );
}

export function inBeastRoom(): boolean {
  const game = Game();
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
export function inBossRoomOf(bossID: BossID) {
  const game = Game();
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
  const game = Game();
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
export function inDevilsCrownTreasureRoom() {
  const roomDescriptor = getCurrentRoomDescriptorReadOnly();
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
}

export function inDimension(dimension: Dimension): boolean {
  return dimension === getCurrentDimension();
}

/** Helper function to determine if the current room shape is one of the four L room shapes. */
export function inLRoom(): boolean {
  const game = Game();
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return (
    roomShape === RoomShape.ROOMSHAPE_LTL ||
    roomShape === RoomShape.ROOMSHAPE_LTR ||
    roomShape === RoomShape.ROOMSHAPE_LBL ||
    roomShape === RoomShape.ROOMSHAPE_LBR
  );
}

export function inGenesisRoom(): boolean {
  const game = Game();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_ISAACS &&
    roomSubType === IsaacsRoomSubType.GENESIS
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
export function inMinibossRoomOf(minibossID: MinibossID) {
  const game = Game();
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
  return getRoomGridIndex() === GridRooms.ROOM_SECRET_SHOP_IDX;
}

/**
 * Helper function to determine whether or not the current room is the starting room of a floor.
 * Only returns true for the starting room of the primary dimension (meaning that being in the
 * starting room of the mirror world does not count).
 */
export function inStartingRoom(): boolean {
  const game = Game();
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

/**
 * Helper function to detect if the provided room was created by the Red Key item. Under the hood,
 * this checks for the `RoomDescriptorFlag.FLAG_RED_ROOM` flag.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function isRedKeyRoom(roomGridIndex?: int): boolean {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.RED_ROOM);
}

/**
 * Helper function to determine if the provided room is part of the floor layout. For
 * example, Devil Rooms and the Mega Satan room are not considered to be inside the map.
 *
 * @param roomGridIndex Optional. Equal to the current room index by default.
 */
export function isRoomInsideMap(roomGridIndex?: int): boolean {
  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  return roomGridIndex >= 0;
}

/**
 * If `Room.Update()` is called in a PostNewRoom callback, then some entities will slide around
 * (such as the player). Since those entity velocities are already at zero, setting them to zero
 * will have no effect. Thus, a generic solution is to record all of the entity positions/velocities
 * before updating the room, and then restore those positions/velocities.
 */
export function roomUpdateSafe(): void {
  const game = Game();
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
  const game = Game();
  const room = game.GetRoom();
  const roomClear = room.IsClear();
  const sfx = SFXManager();

  // If the room is already cleared, we don't have to do anything
  if (roomClear) {
    return;
  }

  room.SetClear(true);

  for (const door of getDoors()) {
    if (isHiddenSecretRoomDoor(door)) {
      continue;
    }

    // We don't use the "door.Open()" method since that will cause the door to play an animation
    openDoorFast(door);

    // If this is a mini-boss room, then the door would be barred in addition to being closed
    // Ensure that the bar is not visible
    door.ExtraVisible = false;
  }

  sfx.Stop(SoundEffect.SOUND_DOOR_HEAVY_OPEN);

  // If the room contained Mom's Hands, then a screen shake will be queued
  // Override it with a 0 frame shake
  game.ShakeScreen(0);
}

/**
 * Helper function to emulate what happens when you bomb an Angel Statue or push a Reward Plate that
 * spawns an NPC.
 */
export function setRoomUncleared(): void {
  const game = Game();
  const room = game.GetRoom();

  room.SetClear(false);
  closeAllDoors();
}

/**
 * Helper function to change the current room. It can be used for both teleportation and "normal"
 * room transitions, depending on what is passed for the `direction` and `roomTransitionAnim`
 * arguments. Use this function instead of invoking `Game.StartRoomTransition()` directly so that
 * you do not forget to set `Level.LeaveDoor` property and to prevent crashing on invalid room grid
 * indexes.
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
  const game = Game();
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    error(
      `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
    );
  }

  // This must be set before every `Game.StartRoomTransition()` invocation or else the function can
  // send you to the wrong room
  level.LeaveDoor = -1;

  game.StartRoomTransition(roomGridIndex, direction, roomTransitionAnim);
}
