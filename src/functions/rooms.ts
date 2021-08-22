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

export function getCurrentDimension(): Dimension | null {
  const game = Game();
  const level = game.GetLevel();

  const roomIndex = getRoomIndex();
  const currentRoomDesc = level.GetCurrentRoomDesc();
  const currentRoomHash = GetPtrHash(currentRoomDesc);

  for (let dimension = 0; dimension <= 2; dimension++) {
    const dimensionRoomDesc = level.GetRoomByIdx(roomIndex, dimension);
    const dimensionRoomHash = GetPtrHash(dimensionRoomDesc);
    if (dimensionRoomHash === currentRoomHash) {
      return dimension;
    }
  }

  return null;
}

export function getRoomData(): RoomConfig | null {
  const game = Game();
  const level = game.GetLevel();
  const roomIndex = getRoomIndex();
  const roomDesc = level.GetRoomByIdx(roomIndex);

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

  if (roomData === null) {
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
 * Helper function to get the stage ID for the room from the XML/STB data. The room stage ID will
 * correspond to the first number in the filename of the XML/STB file. For example, a Depths room
 * would have a stage ID of 7.
 *
 * @returns The room stage ID. Returns -1 if the stage ID was not found.
 */
export function getRoomStageID(): int {
  const roomData = getRoomData();

  if (roomData === null) {
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

  if (roomData === null) {
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

  if (roomData === null) {
    return -1;
  }

  return roomData.Variant;
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
