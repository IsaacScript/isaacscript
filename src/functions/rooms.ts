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
 * Helper function to get the room index of the current room. Use this instead of calling
 * `Game().GetLevel().GetCurrentRoomIndex()` directly to avoid bugs with big rooms.
 * (Big rooms can return the specific 1x1 quadrant that the player is in, which can break data
 * structures that use the room index as an index.)
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
  const roomDesc = level.GetRoomByIdx(roomIndex);
  return roomDesc.SafeGridIndex;
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
  const level = game.GetLevel();
  const roomIndex = getRoomIndex();
  const roomDesc = level.GetRoomByIdx(roomIndex);
  const roomData = roomDesc.Data;
  const roomSubType = roomData.Subtype;
  const room = game.GetRoom();
  const roomType = room.GetType();

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
  const game = Game();
  const level = game.GetLevel();
  const roomIndex = getRoomIndex();
  const roomDesc = level.GetRoomByIdx(roomIndex);
  const roomData = roomDesc.Data;
  const roomSubType = roomData.Subtype;

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
