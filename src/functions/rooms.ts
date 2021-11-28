import {
  DEFAULT_ITEM_POOL_TYPE,
  GENESIS_ROOM_SUBTYPE,
  GENESIS_ROOM_VARIANT,
  MAX_ROOM_INDEX,
} from "../constants";
import { ROOM_TYPE_TO_ITEM_POOL_TYPE_MAP } from "../maps/roomTypeToItemPoolMap";
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
export function changeRoom(roomIndex: int): void {
  const game = Game();
  const level = game.GetLevel();

  // LeaveDoor must be set before every ChangeRoom() invocation or else the function can send you to
  // the wrong room
  level.LeaveDoor = -1;

  game.ChangeRoom(roomIndex);
}

/**
 * This function will not work properly for the Death Certificate dimension. When in the Death
 * Certificate dimension, this function will randomly return either `Dimension.SECONDARY` or
 * `Dimension.DEATH_CERTIFICATE`. Use the `inDeathCertificateArea` function instead for that
 * purpose.
 */
export function getCurrentDimension(): Dimension {
  const game = Game();
  const level = game.GetLevel();

  const startingRoomIndex = level.GetStartingRoomIndex();
  const startingRoomDesc = level.GetRoomByIdx(
    startingRoomIndex,
    Dimension.CURRENT,
  );
  const startingRoomHash = GetPtrHash(startingRoomDesc);

  for (let dimension = 0; dimension <= 2; dimension++) {
    const dimensionRoomDesc = level.GetRoomByIdx(startingRoomIndex, dimension);
    const dimensionRoomHash = GetPtrHash(dimensionRoomDesc);
    if (dimensionRoomHash === startingRoomHash) {
      return dimension;
    }
  }

  error(
    `Failed to get the current dimension using the starting room index of: ${startingRoomIndex}`,
  );
  return 0;
}

export function getRoomData(): RoomConfig | undefined {
  const game = Game();
  const level = game.GetLevel();
  const roomIndex = getRoomIndex();
  const roomDesc = level.GetRoomByIdx(roomIndex);
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
 * Helper function to get the room index of the current room. Use this instead of calling
 * `Game().GetLevel().GetCurrentRoomIndex()` directly to avoid bugs with big rooms.
 * (Big rooms will return the specific 1x1 quadrant that the player entered the room at,
 * which can break data structures that use the room index as an index.)
 */
export function getRoomIndex(): int {
  const game = Game();
  const level = game.GetLevel();
  const roomIndex = level.GetCurrentRoomIndex();

  if (roomIndex < 0) {
    // SafeGridIndex is always -1 for rooms outside the grid,
    // so default to returning the room index provided by the "GetCurrentRoomIndex() function"
    return roomIndex;
  }

  // SafeGridIndex is equal to the top-left index of the room
  const roomDesc = level.GetCurrentRoomDesc();
  return roomDesc.SafeGridIndex;
}

/**
 * Helper function to get an array of all of the safe grid indexes for rooms that match the
 * specified room type.
 *
 * This function only searches through rooms in the current dimension.
 */
export function getRoomIndexesForType(roomType: RoomType): Set<int> {
  const game = Game();
  const level = game.GetLevel();

  // We do not use the "GetRooms()" method since it returns extra-dimensional rooms
  const roomIndexes = new Set<int>();
  for (let i = 0; i <= MAX_ROOM_INDEX; i++) {
    const room = level.GetRoomByIdx(i);
    if (
      room !== undefined &&
      room.Data !== undefined &&
      room.Data.Type === roomType
    ) {
      roomIndexes.add(room.SafeGridIndex);
    }
  }

  return roomIndexes;
}

/**
 * Helper function to get the item pool type for the current room. For example, this returns
 * `ItemPoolType.ItemPoolType.POOL_ANGEL` if you are in an Angel Room. Returns
 * `DEFAULT_ITEM_POOL_TYPE` if there is no particular pool associated with the current room type.
 */
export function getRoomItemPoolType(): ItemPoolType {
  const game = Game();
  const room = game.GetRoom();
  const roomType = room.GetType();

  const itemPoolType = ROOM_TYPE_TO_ITEM_POOL_TYPE_MAP.get(roomType);
  return itemPoolType === undefined ? DEFAULT_ITEM_POOL_TYPE : itemPoolType;
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

export function getRoomVisitedCount(): int {
  const game = Game();
  const level = game.GetLevel();
  const roomDesc = level.GetCurrentRoomDesc();

  return roomDesc.VisitedCount;
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
 * Helper function to see if the current room shape is equal to `RoomShape.ROOMSHAPE_1x2` or
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
  const roomIndex = getRoomIndex();
  const roomSubType = getRoomSubType();

  return (
    roomIndex === GridRooms.ROOM_DUNGEON_IDX &&
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
  const roomIndex = getRoomIndex();
  const roomSubType = getRoomSubType();

  return (
    roomIndex === GridRooms.ROOM_DUNGEON_IDX &&
    roomSubType !== HomeRoomSubType.BEAST_ROOM
  );
}

/**
 * We cannot use the `inDimension` function for this since it is bugged with the Death Certificate
 * area.
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

export function isDevilsCrownTreasureRoom() {
  const game = Game();
  const level = game.GetLevel();
  const roomDesc = level.GetCurrentRoomDesc();

  return hasFlag(roomDesc.Flags, RoomDescriptorFlag.DEVIL_TREASURE);
}

export function inDimension(dimension: Dimension): boolean {
  return dimension === getCurrentDimension();
}

/** Helper function to see if the current room shape is one of the four L room shapes. */
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

export function inStartingRoom(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const startingRoomIndex = level.GetStartingRoomIndex();
  const roomIndex = getRoomIndex();

  return roomIndex === startingRoomIndex;
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
