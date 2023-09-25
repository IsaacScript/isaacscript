import type {
  BackdropType,
  BossID,
  ItemPoolType,
  MinibossID,
} from "isaac-typescript-definitions";
import {
  AngelRoomSubType,
  Dimension,
  DoorSlot,
  DownpourRoomSubType,
  DungeonSubType,
  GridRoom,
  HomeRoomSubType,
  RoomDescriptorFlag,
  RoomShape,
  RoomType,
  SoundEffect,
  StageID,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../core/cachedClasses";
import { DIMENSIONS, MAX_LEVEL_GRID_INDEX } from "../core/constants";
import { ROOM_TYPE_NAMES } from "../objects/roomTypeNames";
import { MINE_SHAFT_ROOM_SUB_TYPE_SET } from "../sets/mineShaftRoomSubTypesSet";
import { ReadonlySet } from "../types/ReadonlySet";
import { inDimension } from "./dimensions";
import {
  closeAllDoors,
  getDoors,
  isHiddenSecretRoomDoor,
  openDoorFast,
} from "./doors";
import { getEntities } from "./entities";
import { hasFlag } from "./flag";
import {
  getEntityPositions,
  getEntityVelocities,
  setEntityPositions,
  setEntityVelocities,
} from "./positionVelocity";
import {
  getRoomData,
  getRoomDescriptor,
  getRoomDescriptorReadOnly,
  getRoomGridIndex,
} from "./roomData";
import { isLRoomShape } from "./roomShape";
import { reloadRoom } from "./roomTransition";
import { getGotoCommand } from "./stage";
import { asNumber } from "./types";
import { assertDefined, iRange } from "./utils";

const SECRET_ROOM_TYPES = new ReadonlySet([
  RoomType.SECRET,
  RoomType.SUPER_SECRET,
  RoomType.ULTRA_SECRET,
]);

/**
 * Helper function for quickly switching to a new room without playing a particular animation. Use
 * this helper function over invoking the `Game.ChangeRoom` method directly to ensure that you do
 * not forget to set the `LeaveDoor` field and to prevent crashing on invalid room grid indexes.
 */
export function changeRoom(roomGridIndex: int): void {
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  assertDefined(
    roomData,
    `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
  );

  // LeaveDoor must be set before every `Game.ChangeRoom` invocation or else the function can send
  // you to the wrong room.
  level.LeaveDoor = DoorSlot.NO_DOOR_SLOT;

  game.ChangeRoom(roomGridIndex);
}

/**
 * Helper function to get the number of rooms that are currently on the floor layout. This does not
 * include off-grid rooms, like the Devil Room.
 */
export function getNumRooms(): int {
  const roomsInsideGrid = getRoomsInsideGrid();
  return roomsInsideGrid.length;
}

/**
 * Helper function to get a read-only copy of the room descriptor for every room on the level. This
 * includes off-grid rooms, such as the Devil Room, and extra-dimensional rooms, if they are
 * generated and exist.
 *
 * Room descriptors without any data are assumed to be non-existent and are not included.
 *
 * Under the hood, this is performed by iterating over the `RoomList` from the `Level.GetRooms`
 * method. This is the best way to see if off-grid rooms have been initialized, since it is possible
 * for mods to insert room data at non-official negative room grid indexes.
 */
export function getReadOnlyRooms(): Array<Readonly<RoomDescriptor>> {
  const level = game.GetLevel();
  const roomList = level.GetRooms();

  const readOnlyRoomDescriptors: Array<Readonly<RoomDescriptor>> = [];

  for (let i = 0; i < roomList.Size; i++) {
    const readOnlyRoomDescriptor = roomList.Get(i);
    if (
      readOnlyRoomDescriptor !== undefined &&
      readOnlyRoomDescriptor.Data !== undefined
    ) {
      readOnlyRoomDescriptors.push(readOnlyRoomDescriptor);
    }
  }

  return readOnlyRoomDescriptors;
}

/**
 * Helper function to get the room data for a specific room type and variant combination. This is
 * accomplished by using the "goto" console command to load the specified room into the
 * `GridRoom.DEBUG` slot.
 *
 * Returns undefined if the provided room type and variant combination were not found. (A warning
 * message will also appear on the console, since the "goto" command will fail.)
 *
 * Note that the side effect of using the "goto" console command is that it will trigger a room
 * transition after a short delay. By default, this function cancels the incoming room transition by
 * using the `Game.StartRoomTransition` method to travel to the same room.
 *
 * @param roomType The type of room to retrieve.
 * @param roomVariant The room variant to retrieve. (The room variant is the "ID" of the room in
 *                    Basement Renovator.)
 * @param cancelRoomTransition Optional. Whether to cancel the room transition by using the
 *                             `Game.StartRoomTransition` method to travel to the same room. Default
 *                             is true. Set this to false if you are getting the data for many rooms
 *                             at the same time, and then use the `teleport` helper function when
 *                             you are finished.
 * @param useSpecialRoomsForRoomTypeDefault Optional. Whether to use `s.default` as the prefix for
 *                                 the `goto` command (instead of `d`) if the room type is
 *                                 `RoomType.DEFAULT` (1). False by default.
 */
export function getRoomDataForTypeVariant(
  roomType: RoomType,
  roomVariant: int,
  cancelRoomTransition = true,
  useSpecialRoomsForRoomTypeDefault = false,
): Readonly<RoomConfig> | undefined {
  const command = getGotoCommand(
    roomType,
    roomVariant,
    useSpecialRoomsForRoomTypeDefault,
  );
  Isaac.ExecuteCommand(command);
  const newRoomData = getRoomData(GridRoom.DEBUG);

  if (cancelRoomTransition) {
    reloadRoom();
  }

  return newRoomData;
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
 * Helper function to get the proper name of a room type.
 *
 * For example, `RoomType.TREASURE` will return "Treasure Room".
 */
export function getRoomTypeName(roomType: RoomType): string {
  return ROOM_TYPE_NAMES[roomType];
}

/**
 * Helper function to get the room descriptor for every room on the level. This includes off-grid
 * rooms, such as the Devil Room.
 *
 * Room descriptors without any data are assumed to be non-existent and are not included.
 *
 * - If you want just the rooms inside of the grid, use the `getRoomsInsideGrid` helper function.
 * - If you want just the rooms outside of the grid, use the `getRoomsOutsideGrid` helper function.
 *
 * @param includeExtraDimensionalRooms Optional. On some floors (e.g. Downpour 2, Mines 2),
 *                                 extra-dimensional rooms are automatically generated. Default is
 *                                 false.
 */
export function getRooms(
  includeExtraDimensionalRooms = false,
): RoomDescriptor[] {
  // The naive way to get all of the rooms would be to iterate over the `RoomList` from the
  // `Level.GetRooms` method. However, this results in read-only data, and we want to return a
  // writable object. Instead, we let the heavy lifting be handled by other functions.
  const roomsInGrid = getRoomsInsideGrid(includeExtraDimensionalRooms);
  const roomsOutsideGrid = getRoomsOutsideGrid();
  return [...roomsInGrid, ...roomsOutsideGrid];
}

/**
 * Helper function to get the room descriptor for every room on the level that is on the grid. (For
 * example, Devil Rooms are excluded.)
 *
 * Room descriptors without any data are assumed to be non-existent and are not included.
 *
 * @param includeExtraDimensionalRooms Optional. On some floors (e.g. Downpour 2, Mines 2),
 *                                 extra-dimensional rooms are automatically be generated. Default
 *                                 is false.
 */
export function getRoomsInsideGrid(
  includeExtraDimensionalRooms = false,
): RoomDescriptor[] {
  const level = game.GetLevel();

  const dimensions = includeExtraDimensionalRooms
    ? DIMENSIONS
    : [Dimension.CURRENT];

  /** We use a map instead of an array because room shapes occupy more than one room grid index. */
  const roomDescriptorMap = new Map<PtrHash, RoomDescriptor>();

  for (const dimension of dimensions) {
    for (const roomGridIndex of iRange(MAX_LEVEL_GRID_INDEX)) {
      const roomDescriptor = level.GetRoomByIdx(roomGridIndex, dimension);
      if (roomDescriptor.Data !== undefined) {
        const ptrHash = GetPtrHash(roomDescriptor);
        roomDescriptorMap.set(ptrHash, roomDescriptor);
      }
    }
  }

  return [...roomDescriptorMap.values()];
}

/**
 * Helper function to get the room descriptor for every room on the level in a specific dimension.
 * This will not include any off-grid rooms, such as the Devil Room.
 *
 * Room descriptors without any data are assumed to be non-existent and are not included.
 */
export function getRoomsOfDimension(dimension: Dimension): RoomDescriptor[] {
  const level = game.GetLevel();

  /** We use a map instead of an array because room shapes occupy more than one room grid index. */
  const roomsMap = new Map<PtrHash, RoomDescriptor>();

  for (const roomGridIndex of iRange(MAX_LEVEL_GRID_INDEX)) {
    const roomDescriptor = level.GetRoomByIdx(roomGridIndex, dimension);
    if (roomDescriptor.Data !== undefined) {
      const ptrHash = GetPtrHash(roomDescriptor);
      roomsMap.set(ptrHash, roomDescriptor);
    }
  }

  return [...roomsMap.values()];
}

/**
 * Helper function to get the room descriptor for every room on the level that is outside of the
 * grid (like a Devil Room).
 *
 * Room descriptors without any data are assumed to be non-existent and are not included.
 */
export function getRoomsOutsideGrid(): RoomDescriptor[] {
  // We filter an array of all rooms instead of iterating over the `GridRoom` enum because it is
  // possible for mods to insert data at arbitrary negative room grid indexes.
  const readOnlyRooms = getReadOnlyRooms();
  const readOnlyRoomsOffGrid = readOnlyRooms.filter(
    (readOnlyRoomDescriptor) => readOnlyRoomDescriptor.SafeGridIndex < 0,
  );

  return readOnlyRoomsOffGrid.map((readOnlyRoomDescriptor) =>
    getRoomDescriptor(readOnlyRoomDescriptor.SafeGridIndex),
  );
}

/**
 * Helper function to determine if the current room shape is equal to `RoomShape.1x2` or
 * `RoomShape.2x1`.
 */
export function in2x1Room(): boolean {
  const roomData = getRoomData();
  return is2x1Room(roomData);
}

export function inAngelShop(): boolean {
  const roomData = getRoomData();
  return isAngelShop(roomData);
}

/**
 * Helper function to check to see if the current room is a boss room for The Beast.
 *
 * Under the hood, this checks the room type and sub-type.
 */
export function inBeastRoom(): boolean {
  const roomData = getRoomData();
  return isBeastRoom(roomData);
}

/**
 * Helper function to check if the current room is a boss room for a particular boss. This will only
 * work for bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function inBossRoomOf(bossID: BossID): boolean {
  const roomData = getRoomData();
  return isBossRoomOf(roomData, bossID);
}

/**
 * Helper function for determining whether the current room is a crawl space. Use this function over
 * comparing to `RoomType.DUNGEON` or `GridRoom.DUNGEON_IDX` since there is a special case of the
 * player being in a boss fight that takes place in a dungeon.
 */
export function inCrawlSpace(): boolean {
  const roomData = getRoomData();
  return isCrawlSpace(roomData);
}

/**
 * Helper function to detect if the current room is one of the rooms in the Death Certificate area.
 */
export function inDeathCertificateArea(): boolean {
  const roomData = getRoomData();
  return isDeathCertificateArea(roomData);
}

/**
 * Helper function to detect if the current room is a Treasure Room created when entering with a
 * Devil's Crown trinket.
 *
 * Under the hood, this checks for `RoomDescriptorFlag.DEVIL_TREASURE`.
 */
export function inDevilsCrownTreasureRoom(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return isDevilsCrownTreasureRoom(roomDescriptor);
}

/**
 * Helper function to detect if the current room is a Double Trouble Boss Room.
 *
 * This is performed by checking for the string "Double Trouble" inside of the room name. The
 * vanilla game uses this convention for every Double Trouble Boss Room. Note that this method might
 * fail for mods that add extra Double Trouble rooms but do not follow the convention.
 *
 * Internally, the game is coded to detect Double Trouble Boss Rooms by checking for the variant
 * range of 3700 through 3850. We intentionally do not use this method since it may not work as well
 * with modded rooms.
 */
export function inDoubleTrouble(): boolean {
  const roomData = getRoomData();
  return isDoubleTrouble(roomData);
}

/** Helper function to determine if the current room index is equal to `GridRoom.GENESIS`. */
export function inGenesisRoom(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return isGenesisRoom(roomDescriptor);
}

/**
 * Helper function to check if the current room is either the left Home closet (behind the red door)
 * or the right Home closet (with one random pickup).
 *
 * Home closets have a unique shape that is different from any other room in the game.
 */
export function inHomeCloset(): boolean {
  const roomData = getRoomData();
  return isHomeCloset(roomData);
}

/** Helper function to determine if the current room shape is one of the four L room shapes. */
export function inLRoom(): boolean {
  const roomData = getRoomData();
  return isLRoom(roomData);
}

/** Helper function to determine if the current room index is equal to `GridRoom.MEGA_SATAN`. */
export function inMegaSatanRoom(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return isMegaSatanRoom(roomDescriptor);
}

/**
 * Helper function to determine if the current room is part of the Repentance "escape sequence" in
 * the Mines/Ashpit.
 */
export function inMineShaft(): boolean {
  const roomData = getRoomData();
  return isMineShaft(roomData);
}

/**
 * Helper function to check if the current room is a miniboss room for a particular miniboss. This
 * will only work for mini-bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function inMinibossRoomOf(minibossID: MinibossID): boolean {
  const roomData = getRoomData();
  return isMinibossRoomOf(roomData, minibossID);
}

/**
 * Helper function to check if the current room is a "mirror room" in Downpour or Dross. (These
 * rooms are marked with a specific sub-type.)
 */
export function inMirrorRoom(): boolean {
  const roomData = getRoomData();
  return isMirrorRoom(roomData);
}

/**
 * Helper function to check if the current room shape matches one of the given room shapes.
 *
 * This function is variadic, which means you can pass as many room shapes as you want to match for.
 */
export function inRoomShape(...roomShapes: RoomShape[]): boolean {
  const roomData = getRoomData();
  return isRoomShape(roomData, ...roomShapes);
}

/**
 * Helper function to check if the current room matches one of the given room types.
 *
 * This function is variadic, which means you can pass as many room types as you want to match for.
 */
export function inRoomType(...roomTypes: RoomType[]): boolean {
  const roomData = getRoomData();
  return isRoomType(roomData, ...roomTypes);
}

/**
 * Helper function for checking if the current room is a secret exit that leads to a Repentance
 * floor.
 */
export function inSecretExit(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return isSecretExit(roomDescriptor);
}

/**
 * Helper function for checking if the current room is a secret shop (from the Member Card
 * collectible).
 *
 * Secret shops are simply copies of normal shops, but with the backdrop of a secret room. In other
 * words, they will have the same room type, room variant, and room sub-type of a normal shop. Thus,
 * the only way to detect them is by using the grid index.
 */
export function inSecretShop(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return isSecretShop(roomDescriptor);
}

/**
 * Helper function to determine whether the current room is the starting room of a floor. It only
 * returns true for the starting room of the primary dimension (meaning that being in the starting
 * room of the mirror world does not count).
 */
export function inStartingRoom(): boolean {
  const level = game.GetLevel();
  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const roomGridIndex = getRoomGridIndex();

  return roomGridIndex === startingRoomGridIndex && inDimension(Dimension.MAIN);
}

/**
 * Helper function to determine if the provided room is equal to `RoomShape.1x2` or `RoomShape.2x1`.
 */
export function is2x1Room(roomData: RoomConfig): boolean {
  return (
    roomData.Shape === RoomShape.SHAPE_1x2 ||
    roomData.Shape === RoomShape.SHAPE_2x1
  );
}

/**
 * Helper function to loop through every room on the floor and see if it has been cleared.
 *
 * This function will only check rooms inside the gird and inside the current dimension.
 *
 * @param onlyCheckRoomTypes Optional. A whitelist of room types. If specified, room types not in
 *                           the array will be ignored. If not specified, then all rooms will be
 *                           checked. Undefined by default.
 * @param includeSecretAndSuperSecretRoom Optional. Whether to include the Secret Room and the Super
 *                                 Secret Room. Default is false.
 * @param includeUltraSecretRoom Optional. Whether to include the Ultra Secret Room. Default is
 *                               false.
 * @allowEmptyVariadic
 */
export function isAllRoomsClear(
  onlyCheckRoomTypes?: RoomType[] | readonly RoomType[],
  includeSecretAndSuperSecretRoom = false,
  includeUltraSecretRoom = false,
): boolean {
  const roomsInsideGrid = getRoomsInsideGrid();

  let matchingRooms: RoomDescriptor[];
  if (onlyCheckRoomTypes === undefined) {
    matchingRooms = roomsInsideGrid;
  } else {
    const roomTypeWhitelist = new ReadonlySet(onlyCheckRoomTypes);
    matchingRooms = roomsInsideGrid.filter(
      (roomDescriptor) =>
        roomDescriptor.Data !== undefined &&
        roomTypeWhitelist.has(roomDescriptor.Data.Type),
    );
  }

  if (!includeSecretAndSuperSecretRoom) {
    matchingRooms = matchingRooms.filter(
      (roomDescriptor) =>
        roomDescriptor.Data !== undefined &&
        roomDescriptor.Data.Type !== RoomType.SECRET &&
        roomDescriptor.Data.Type !== RoomType.SUPER_SECRET,
    );
  }

  if (!includeUltraSecretRoom) {
    matchingRooms = matchingRooms.filter(
      (roomDescriptor) =>
        roomDescriptor.Data !== undefined &&
        roomDescriptor.Data.Type !== RoomType.ULTRA_SECRET,
    );
  }

  return matchingRooms.every((roomDescriptor) => roomDescriptor.Clear);
}

export function isAngelShop(roomData: RoomConfig): boolean {
  return (
    roomData.Type === RoomType.ANGEL &&
    roomData.Subtype === asNumber(AngelRoomSubType.SHOP)
  );
}

/**
 * Helper function to check to see if the provided room is a boss room for The Beast.
 *
 * Under the hood, this checks the room type and sub-type.
 */
export function isBeastRoom(roomData: RoomConfig): boolean {
  return (
    roomData.Type === RoomType.DUNGEON &&
    roomData.Subtype === asNumber(DungeonSubType.BEAST_ROOM)
  );
}

/**
 * Helper function to check if the provided room is a boss room for a particular boss. This will
 * only work for bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function isBossRoomOf(roomData: RoomConfig, bossID: BossID): boolean {
  return (
    roomData.Type === RoomType.BOSS &&
    roomData.StageID === StageID.SPECIAL_ROOMS &&
    roomData.Subtype === asNumber(bossID)
  );
}

/**
 * Helper function for determining whether the provided room is a crawl space. Use this function
 * over comparing to `RoomType.DUNGEON` or `GridRoom.DUNGEON_IDX` since there is a special case of
 * the player being in a boss fight that takes place in a dungeon.
 */
export function isCrawlSpace(roomData: RoomConfig): boolean {
  return (
    roomData.Type === RoomType.DUNGEON &&
    roomData.Subtype === asNumber(DungeonSubType.NORMAL)
  );
}

/**
 * Helper function to detect if the provided room is one of the rooms in the Death Certificate area.
 */
export function isDeathCertificateArea(roomData: RoomConfig): boolean {
  return (
    roomData.StageID === StageID.HOME &&
    (roomData.Subtype ===
      asNumber(HomeRoomSubType.DEATH_CERTIFICATE_ENTRANCE) ||
      roomData.Subtype === asNumber(HomeRoomSubType.DEATH_CERTIFICATE_ITEMS))
  );
}

/**
 * Helper function to detect if the provided room is a Treasure Room created when entering with a
 * Devil's Crown trinket.
 *
 * Under the hood, this checks for `RoomDescriptorFlag.DEVIL_TREASURE`.
 */
export function isDevilsCrownTreasureRoom(
  roomDescriptor: RoomDescriptor,
): boolean {
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
}

/**
 * Helper function to detect if the provided room is a Double Trouble Boss Room.
 *
 * This is performed by checking for the string "Double Trouble" inside of the room name. The
 * vanilla game uses this convention for every Double Trouble Boss Room. Note that this method might
 * fail for mods that add extra Double Trouble rooms but do not follow the convention.
 *
 * Internally, the game is coded to detect Double Trouble Boss Rooms by checking for the variant
 * range of 3700 through 3850. We intentionally do not use this method since it may not work as well
 * with modded rooms.
 */
export function isDoubleTrouble(roomData: RoomConfig): boolean {
  return (
    roomData.Type === RoomType.BOSS && roomData.Name.includes("Double Trouble")
  );
}

/**
 * Helper function to determine if the index of the provided room is equal to `GridRoom.GENESIS`.
 */
export function isGenesisRoom(roomDescriptor: RoomDescriptor): boolean {
  return roomDescriptor.GridIndex === asNumber(GridRoom.GENESIS);
}

/**
 * Helper function to check if the provided room is either the left Home closet (behind the red
 * door) or the right Home closet (with one random pickup).
 *
 * Home closets have a unique shape that is different from any other room in the game.
 */
export function isHomeCloset(roomData: RoomConfig): boolean {
  return (
    roomData.StageID === StageID.HOME &&
    (roomData.Subtype === asNumber(HomeRoomSubType.CLOSET_LEFT) ||
      roomData.Subtype === asNumber(HomeRoomSubType.CLOSET_RIGHT))
  );
}

/** Helper function to determine if the provided room is one of the four L room shapes. */
export function isLRoom(roomData: RoomConfig): boolean {
  return isLRoomShape(roomData.Shape);
}

/**
 * Helper function to determine if the index of the provided room is equal to `GridRoom.MEGA_SATAN`.
 */
export function isMegaSatanRoom(roomDescriptor: RoomDescriptor): boolean {
  return roomDescriptor.GridIndex === asNumber(GridRoom.MEGA_SATAN);
}

/**
 * Helper function to determine if the provided room is part of the Repentance "escape sequence" in
 * the Mines/Ashpit.
 */
export function isMineShaft(roomData: RoomConfig): boolean {
  return (
    (roomData.StageID === StageID.MINES ||
      roomData.StageID === StageID.ASHPIT) &&
    // eslint-disable-next-line isaacscript/strict-enums
    MINE_SHAFT_ROOM_SUB_TYPE_SET.has(roomData.Subtype)
  );
}

/**
 * Helper function to check if the provided room is a miniboss room for a particular miniboss. This
 * will only work for mini-bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function isMinibossRoomOf(
  roomData: RoomConfig,
  minibossID: MinibossID,
): boolean {
  return (
    roomData.Type === RoomType.MINI_BOSS &&
    roomData.StageID === StageID.SPECIAL_ROOMS &&
    roomData.Subtype === asNumber(minibossID)
  );
}

/**
 * Helper function to check if the provided room is a "mirror room" in Downpour or Dross. (These
 * rooms are marked with a specific sub-type.)
 */
export function isMirrorRoom(roomData: RoomConfig): boolean {
  return (
    roomData.Type === RoomType.DEFAULT &&
    (roomData.StageID === StageID.DOWNPOUR ||
      roomData.StageID === StageID.DROSS) &&
    roomData.Subtype === asNumber(DownpourRoomSubType.MIRROR)
  );
}

/**
 * Helper function to check if the provided room matches one of the given room shapes.
 *
 * This function is variadic, which means you can pass as many room shapes as you want to match for.
 */
export function isRoomShape(
  roomData: RoomConfig,
  ...roomShapes: RoomShape[]
): boolean {
  return roomShapes.includes(roomData.Shape);
}

/**
 * Helper function to check if the provided room matches one of the given room types.
 *
 * This function is variadic, which means you can pass as many room types as you want to match for.
 */
export function isRoomType(
  roomData: RoomConfig,
  ...roomTypes: RoomType[]
): boolean {
  return roomTypes.includes(roomData.Type);
}

/**
 * Helper function for checking if the provided room is a secret exit that leads to a Repentance
 * floor.
 */
export function isSecretExit(roomDescriptor: RoomDescriptor): boolean {
  return roomDescriptor.GridIndex === asNumber(GridRoom.SECRET_EXIT);
}

/**
 * Helper function to detect if a room type is a Secret Room, a Super Secret Room, or an Ultra
 * Secret Room.
 */
export function isSecretRoomType(roomType: RoomType): boolean {
  return SECRET_ROOM_TYPES.has(roomType);
}

/**
 * Helper function for checking if the provided room is a secret shop (from the Member Card
 * collectible).
 *
 * Secret shops are simply copies of normal shops, but with the backdrop of a secret room. In other
 * words, they will have the same room type, room variant, and room sub-type of a normal shop. Thus,
 * the only way to detect them is by using the grid index.
 */
export function isSecretShop(roomDescriptor: RoomDescriptor): boolean {
  return roomDescriptor.GridIndex === asNumber(GridRoom.SECRET_SHOP);
}

/**
 * If the `Room.Update` method is called in a `POST_NEW_ROOM` callback, then some entities will
 * slide around (such as the player). Since those entity velocities are already at zero, setting
 * them to zero will have no effect. Thus, a generic solution is to record all of the entity
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

/** Helper function to set the backdrop (i.e. background) of the current room. */
export function setBackdrop(backdropType: BackdropType): void {
  game.ShowHallucination(0, backdropType);
  sfxManager.Stop(SoundEffect.DEATH_CARD);
}

/**
 * Helper function to convert an uncleared room to a cleared room in the `POST_NEW_ROOM` callback.
 * This is useful because if enemies are removed in this callback, a room drop will be awarded and
 * the doors will start closed and then open.
 */
export function setRoomCleared(): void {
  const room = game.GetRoom();
  const roomClear = room.IsClear();

  // If the room is already cleared, we don't have to do anything.
  if (roomClear) {
    return;
  }

  room.SetClear(true);

  for (const door of getDoors()) {
    if (isHiddenSecretRoomDoor(door)) {
      continue;
    }

    // We don't use the `EntityDoor.Open` method since that will cause the door to play an
    // animation.
    openDoorFast(door);

    // If this is a mini-boss room, then the door would be barred in addition to being closed.
    // Ensure that the bar is not visible.
    door.ExtraVisible = false;
  }

  sfxManager.Stop(SoundEffect.DOOR_HEAVY_OPEN);

  // If the room contained Mom's Hands, then a screen shake will be queued. Override it with a 0
  // frame shake.
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
