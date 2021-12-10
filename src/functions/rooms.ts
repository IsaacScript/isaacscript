import {
  GENESIS_ROOM_SUBTYPE,
  GENESIS_ROOM_VARIANT,
  MAX_ROOM_INDEX,
} from "../constants";
import { closeAllDoors, getDoors, isHiddenSecretRoomDoor } from "./doors";
import {
  getEntities,
  getEntityPositions,
  getEntityVelocities,
  setEntityPositions,
  setEntityVelocities,
} from "./entity";
import { hasFlag } from "./flag";

/**
 * Helper function for quickly switching to a new room without playing a particular animation.
 * Always use this helper function over invoking `Game().ChangeRoom()` directly to ensure that you
 * do not forget to set the LeaveDoor property.
 */
export function changeRoom(roomGridIndex: int): void {
  const game = Game();
  const level = game.GetLevel();

  // LeaveDoor must be set before every ChangeRoom() invocation or else the function can send you to
  // the wrong room
  level.LeaveDoor = -1;

  game.ChangeRoom(roomGridIndex);
}

export function getAllRoomGridIndexes(): int[] {
  const allRoomGridIndexes: int[] = [];
  for (const roomDesc of getRooms()) {
    allRoomGridIndexes.push(roomDesc.SafeGridIndex);
  }

  return allRoomGridIndexes;
}

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

  for (let dimension = 0; dimension <= 2; dimension++) {
    const dimensionRoomDesc = level.GetRoomByIdx(
      startingRoomGridIndex,
      dimension,
    );
    const dimensionRoomHash = GetPtrHash(dimensionRoomDesc);
    if (dimensionRoomHash === startingRoomHash) {
      return dimension;
    }
  }

  error(
    `Failed to get the current dimension using the starting room index of: ${startingRoomGridIndex}`,
  );
  return 0;
}

/** An alias to the `Level.GetCurrentRoomDesc()` method. */
export function getCurrentRoomDescReadOnly(): RoomDescriptorReadOnly {
  const game = Game();
  const level = game.GetLevel();

  return level.GetCurrentRoomDesc();
}

export function getRoomData(): RoomConfig | undefined {
  const game = Game();
  const level = game.GetLevel();
  const roomSafeGridIndex = getRoomSafeGridIndex();
  const roomDesc = level.GetRoomByIdx(roomSafeGridIndex);
  // (we don't use "level.GetCurrentRoomDesc()" since it returns a read-only copy of the data)

  return roomDesc.Data;
}

/**
 * Helper function to get the type for the room from the XML/STB data. The room data type will
 * correspond to different things depending on what XML/STB file it draws from. For example, in the
 * "00.special rooms.stb" file, a room type of 2 corresponds to a shop, a room type of 3 corresponds
 * to an I AM ERROR room, and so on.
 *
 * @returns The room data type. Returns -1 if the type was not found.
 */
export function getRoomDataType(): int {
  const roomData = getRoomData();

  if (roomData === undefined) {
    return -1;
  }

  return roomData.Type;
}

/**
 * Helper function to get the list grid index of the current room, which is equal to the index in
 * the `Level.GetRooms().Get()` method. In other words, this is equal to the order that the room was
 * created by the floor generation algorithm.
 *
 * Use this as an index for data structures that store data per room, since it is unique across
 * different dimensions.
 */
export function getRoomListIndex(): int {
  const roomDesc = getCurrentRoomDescReadOnly();
  return roomDesc.ListIndex;
}

/**
 * Helper function to get the safe grid index of the current room. The safe grid index is defined as
 * the top-left 1x1 section that the room overlaps with (or the top-right 1x1 section of a
 * `RoomType.ROOMSHAPE_LTL` room).
 *
 * In most situations, using the safe grid index is more reliable than using the `GridIndex` or the
 * `Level.GetCurrentRoomIndex()` method directly. `GridIndex` can return quadrants that are not on
 * the map, and `Level.GetCurrentRoomIndex()` returns the specific 1x1 quadrant that the player
 * entered the room at.
 *
 * Data structures that store data per room should use the room's `ListIndex` instead of
 * `SafeGridIndex`, since the former is unique across different dimensions.
 */
export function getRoomSafeGridIndex(): int {
  const roomDesc = getCurrentRoomDescReadOnly();
  return roomDesc.SafeGridIndex;
}

/**
 * Helper function to get an array of all of the safe grid indexes for rooms that match the
 * specified room type.
 *
 * This function only searches through rooms in the current dimension.
 */
export function getRoomGridIndexesForType(roomType: RoomType): int[] {
  const roomGridIndexes: int[] = [];
  for (const roomDesc of getRooms()) {
    if (roomDesc.Data !== undefined && roomDesc.Data.Type === roomType) {
      roomGridIndexes.push(roomDesc.SafeGridIndex);
    }
  }

  return roomGridIndexes;
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
 * Helper function to get the name of the room as it appears in the STB/XML data.
 *
 * @returns The room name. Returns "Unknown" if the type was not found.
 */
export function getRoomName(): string {
  const roomData = getRoomData();

  if (roomData === undefined) {
    return "Unknown";
  }

  return roomData.Name;
}

/**
 * Helper function to get the stage ID for the room from the XML/STB data. The room stage ID will
 * correspond to the first number in the filename of the XML/STB file. For example, a Depths room
 * would have a stage ID of 7.
 *
 * @returns The room stage ID. Returns -1 if the stage ID was not found.
 */
export function getRoomStageID(): StageID {
  const roomData = getRoomData();

  if (roomData === undefined) {
    return -1;
  }

  return roomData.StageID;
}

/**
 * Helper function to get the subtype for the room from the XML/STB data. The room subtype will
 * correspond to different things depending on what XML/STB file it draws from. For example, in the
 * "00.special rooms.stb" file, an Angel Room with a subtype of 0 will correspond to a normal Angel
 * Room and a subtype of 1 will correspond to an Angel Room shop for The Stairway.
 *
 * @returns The room subtype. Returns -1 if the subtype was not found.
 */
export function getRoomSubType(): int {
  const roomData = getRoomData();

  if (roomData === undefined) {
    return -1;
  }

  return roomData.Subtype;
}

/**
 * Helper function to get the variant for the current room from the XML/STB data. You can think of a
 * room variant as its identifier. For example, to go to Basement room #123, you would use a console
 * command of `goto d.123` while on the Basement.
 *
 * @returns The room variant. Returns -1 if the variant was not found.
 */
export function getRoomVariant(): int {
  const roomData = getRoomData();

  if (roomData === undefined) {
    return -1;
  }

  return roomData.Variant;
}

/**
 * The room visited count will be inaccurate during the period before the PostNewRoom callback has
 * fired (i.e. when entities are initializing and performing their first update). This is because
 * the variable is only incremented immediately before the PostNewRoom callback fires.
 */
export function getRoomVisitedCount(): int {
  const roomDesc = getCurrentRoomDescReadOnly();
  return roomDesc.VisitedCount;
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
      const roomDesc = roomList.Get(i);
      if (roomDesc !== undefined) {
        rooms.push(roomDesc);
      }
    }
  } else {
    for (let i = 0; i <= MAX_ROOM_INDEX; i++) {
      const roomDesc = level.GetRoomByIdx(i);
      if (roomDesc !== undefined) {
        rooms.push(roomDesc);
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
  const roomSafeGridIndex = getRoomSafeGridIndex();
  const roomSubType = getRoomSubType();

  return (
    roomSafeGridIndex === GridRooms.ROOM_DUNGEON_IDX &&
    roomSubType === HomeRoomSubType.BEAST_ROOM
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
 * comparing to `GridRooms.ROOM_DUNGEON_IDX` directly since there is a special case of the player
 * being in The Beast room.
 */
export function inCrawlspace(): boolean {
  const roomSafeGridIndex = getRoomSafeGridIndex();
  const roomSubType = getRoomSubType();

  return (
    roomSafeGridIndex === GridRooms.ROOM_DUNGEON_IDX &&
    roomSubType !== HomeRoomSubType.BEAST_ROOM
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
  const roomDesc = getCurrentRoomDescReadOnly();
  return hasFlag(roomDesc.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
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
  const roomVariant = getRoomVariant();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.ROOM_ISAACS &&
    roomVariant === GENESIS_ROOM_VARIANT &&
    roomSubType === GENESIS_ROOM_SUBTYPE
  );
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
 * Helper function to determine whether or not the current room is the starting room of a floor.
 * Only returns true for the starting room of the primary dimension (meaning that being in the
 * starting room of the mirror world does not count).
 */
export function inStartingRoom(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const roomSafeGridIndex = getRoomSafeGridIndex();

  return (
    roomSafeGridIndex === startingRoomGridIndex && inDimension(Dimension.MAIN)
  );
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

  for (const roomDesc of getRooms()) {
    const roomData = roomDesc.Data;
    if (roomData === undefined) {
      continue;
    }

    const roomType = roomData.Type;
    if (roomTypeWhitelist !== null && !roomTypeWhitelist.has(roomType)) {
      continue;
    }

    if (!roomDesc.Clear) {
      return false;
    }
  }

  return true;
}

/**
 * Helper function to detect if the current room was created by the Red Key item. Under the hood,
 * this checks for the `RoomDescriptorFlag.FLAG_RED_ROOM` flag.
 */
export function isRedKeyRoom(): boolean {
  const roomDesc = getCurrentRoomDescReadOnly();
  return hasFlag(roomDesc.Flags, RoomDescriptorFlag.RED_ROOM);
}

/**
 * Helper function to determine whether or not the current room is part of the floor layout. For
 * example, Devil Rooms and the Mega Satan room are not considered to be inside the map.
 */
export function isRoomInsideMap(): boolean {
  const roomSafeGridIndex = getRoomSafeGridIndex();

  return roomSafeGridIndex >= 0;
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

    door.State = DoorState.STATE_OPEN;

    const sprite = door.GetSprite();
    sprite.Play("Opened", true);

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
