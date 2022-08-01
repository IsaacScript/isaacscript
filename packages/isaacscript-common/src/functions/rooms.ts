import {
  AngelRoomSubType,
  BackdropType,
  BossID,
  Dimension,
  DoorSlot,
  DungeonSubType,
  GridRoom,
  HomeRoomSubType,
  ItemPoolType,
  MinibossID,
  RoomDescriptorFlag,
  RoomShape,
  RoomType,
  SoundEffect,
  StageID,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../core/cachedClasses";
import { MAX_LEVEL_GRID_INDEX, NUM_DIMENSIONS } from "../core/constants";
import { ROOM_TYPE_NAMES } from "../objects/roomTypeNames";
import { MINE_SHAFT_ROOM_SUB_TYPE_SET } from "../sets/mineShaftRoomSubTypesSet";
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
  getRoomName,
  getRoomStageID,
  getRoomSubType,
} from "./roomData";
import { reloadRoom } from "./roomTransition";
import { getGotoCommand } from "./stage";
import { erange, irange } from "./utils";

/**
 * Helper function for quickly switching to a new room without playing a particular animation. Use
 * this helper function over invoking the `Game.ChangeRoom` method directly to ensure that you do
 * not forget to set the `LeaveDoor` field and to prevent crashing on invalid room grid indexes.
 */
export function changeRoom(roomGridIndex: int): void {
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    error(
      `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
    );
  }

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
  const rooms = getRoomsInsideGrid();
  return rooms.length;
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
 */
export function getRoomDataForTypeVariant(
  roomType: RoomType,
  roomVariant: int,
  cancelRoomTransition = true,
): Readonly<RoomConfig> | undefined {
  const command = getGotoCommand(roomType, roomVariant);
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
 * - If you want just the rooms inside of the grid, use the `getRoomsInGrid` helper function.
 * - If you want just the rooms outside of the grid, use the `getRoomsOutsideGrid` helper function.
 *
 * @param includeExtraDimensionalRooms Optional. On some floors (e.g. Downpour 2, Mines 2),
 *                                 extra-dimensional rooms are automatically generated. Default is
 *                                 false.
 */
export function getRooms(
  includeExtraDimensionalRooms = false,
): RoomDescriptor[] {
  // The obvious way to get all of the rooms would be to iterate over the `RoomList` from the
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
    ? (erange(NUM_DIMENSIONS) as Dimension[])
    : [Dimension.CURRENT];

  /** We use a map instead of an array because room shapes occupy more than one room grid index. */
  const roomDescriptorMap = new Map<PtrHash, RoomDescriptor>();

  for (const dimension of dimensions) {
    for (const roomGridIndex of irange(MAX_LEVEL_GRID_INDEX)) {
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

  for (const roomGridIndex of irange(MAX_LEVEL_GRID_INDEX)) {
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
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return roomShape === RoomShape.SHAPE_1x2 || roomShape === RoomShape.SHAPE_2x1;
}

export function inAngelShop(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  // eslint-disable-next-line isaacscript/strict-enums
  return roomType === RoomType.ANGEL && roomSubType === AngelRoomSubType.SHOP;
}

export function inBeastRoom(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  return (
    // eslint-disable-next-line isaacscript/strict-enums
    roomType === RoomType.DUNGEON && roomSubType === DungeonSubType.BEAST_ROOM
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
    roomType === RoomType.BOSS &&
    roomStageID === StageID.SPECIAL_ROOMS &&
    roomSubType === bossID // eslint-disable-line isaacscript/strict-enums
  );
}

/**
 * Helper function for determining whether the current room is a crawl space. Use this function over
 * comparing to `RoomType.DUNGEON` or `GridRoom.DUNGEON_IDX` since there is a special case of the
 * player being in a boss fight that take place in a dungeon.
 */
export function inCrawlSpace(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomSubType = getRoomSubType();

  // eslint-disable-next-line isaacscript/strict-enums
  return roomType === RoomType.DUNGEON && roomSubType === DungeonSubType.NORMAL;
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
    // eslint-disable-next-line isaacscript/strict-enums
    (roomSubType === HomeRoomSubType.DEATH_CERTIFICATE_ENTRANCE ||
      // eslint-disable-next-line isaacscript/strict-enums
      roomSubType === HomeRoomSubType.DEATH_CERTIFICATE_ITEMS)
  );
}

/**
 * Helper function to detect if the current room is a Treasure Room created when entering with a
 * Devil's Crown trinket. Under the hood, this checks for the `RoomDescriptorFlag.DEVIL_TREASURE`
 * flag.
 */
export function inDevilsCrownTreasureRoom(): boolean {
  const roomDescriptor = getRoomDescriptorReadOnly();
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
}

export function inDoubleTrouble(): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomName = getRoomName();

  return roomType === RoomType.BOSS && roomName.includes("Double Trouble");
}

export function inGenesisRoom(): boolean {
  const roomGridIndex = getRoomGridIndex();

  // eslint-disable-next-line isaacscript/strict-enums
  return roomGridIndex === GridRoom.GENESIS;
}

/** Helper function to determine if the current room shape is one of the four L room shapes. */
export function inLRoom(): boolean {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  return (
    roomShape === RoomShape.LTL ||
    roomShape === RoomShape.LTR ||
    roomShape === RoomShape.LBL ||
    roomShape === RoomShape.LBR
  );
}

export function inMegaSatanRoom(): boolean {
  const roomGridIndex = getRoomGridIndex();

  // eslint-disable-next-line isaacscript/strict-enums
  return roomGridIndex === GridRoom.MEGA_SATAN;
}

/**
 * Helper function to determine if the current room is part of the Repentance "escape sequence" in
 * the Mines/Ashpit.
 */
export function inMineShaft(): boolean {
  const roomStageID = getRoomStageID();
  const roomSubType = getRoomSubType();

  return (
    (roomStageID === StageID.MINES || roomStageID === StageID.ASHPIT) &&
    // eslint-disable-next-line isaacscript/strict-enums
    MINE_SHAFT_ROOM_SUB_TYPE_SET.has(roomSubType)
  );
}

/**
 * Helper function to check if the current room is a miniboss room for a particular miniboss. This
 * will only work for mini-bosses that have dedicated boss rooms in the "00.special rooms.stb" file.
 */
export function inMinibossRoomOf(minibossID: MinibossID): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomStageID = getRoomStageID();
  const roomSubType = getRoomSubType();

  return (
    roomType === RoomType.MINI_BOSS &&
    roomStageID === StageID.SPECIAL_ROOMS &&
    roomSubType === minibossID // eslint-disable-line isaacscript/strict-enums
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

  // eslint-disable-next-line isaacscript/strict-enums
  return roomGridIndex === GridRoom.SECRET_SHOP;
}

/**
 * Helper function to determine whether or not the current room is the starting room of a floor. It
 * only returns true for the starting room of the primary dimension (meaning that being in the
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
 * This function will only check rooms inside the gird and inside the current dimension.
 *
 * @param onlyCheckRoomTypes Optional. A whitelist of room types. If specified, room types not in
 *                           the array will be ignored. If not specified, then all rooms will be
 *                           checked. Undefined by default.
 */
export function isAllRoomsClear(onlyCheckRoomTypes?: RoomType[]): boolean {
  const roomTypeWhitelist =
    onlyCheckRoomTypes === undefined ? null : new Set(onlyCheckRoomTypes);
  const rooms = getRoomsInsideGrid();
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

/** Helper function to set the backdrop of the current room. */
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
