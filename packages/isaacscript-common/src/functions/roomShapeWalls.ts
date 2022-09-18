import { BossID, RoomShape } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { CornerType } from "../enums/CornerType";
import { Corner } from "../interfaces/Corner";
import { getEnumValues } from "./enums";
import { getGridIndexesBetween } from "./gridIndex";
import { inBossRoomOf, inHomeCloset } from "./rooms";
import { getRoomShapeCorners, isLRoom } from "./roomShape";

const ROOM_SHAPE_TO_WALL_GRID_INDEX_SET = getRoomShapeToWallGridIndexSet();

function getRoomShapeToWallGridIndexSet(): ReadonlyMap<
  RoomShape,
  ReadonlySet<int>
> {
  const roomShapeToWallGridIndexSet = new Map<RoomShape, ReadonlySet<int>>();

  for (const roomShape of getEnumValues(RoomShape)) {
    const gridIndexSet = getVanillaWallGridIndexSetForRoomShape(roomShape);
    roomShapeToWallGridIndexSet.set(roomShape, gridIndexSet);
  }

  return roomShapeToWallGridIndexSet;
}

function getVanillaWallGridIndexSetForRoomShape(
  roomShape: RoomShape,
): ReadonlySet<int> {
  const corners = getRoomShapeCorners(roomShape);
  const lRoom = isLRoom(roomShape);

  if (lRoom && corners.length !== 6) {
    error(
      `Failed to get the correct amount of corners for: RoomShape.${RoomShape[roomShape]} (${roomShape})`,
    );
  }

  if (!lRoom && corners.length !== 4) {
    error(
      `Failed to get the correct amount of corners for: RoomShape.${RoomShape[roomShape]} (${roomShape})`,
    );
  }

  switch (roomShape) {
    // 9
    case RoomShape.LTL: {
      const [topMiddle, topRight, middleLeft, middle, bottomLeft, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new Set([
        // Horizontal
        ...getGridIndexesBetween(topMiddle.gridIndex, topRight.gridIndex),
        ...getGridIndexesBetween(middleLeft.gridIndex, middle.gridIndex),
        ...getGridIndexesBetween(bottomLeft.gridIndex, bottomRight.gridIndex),

        // Vertical
        ...getGridIndexesBetween(middleLeft.gridIndex, bottomLeft.gridIndex),
        ...getGridIndexesBetween(topMiddle.gridIndex, middle.gridIndex),
        ...getGridIndexesBetween(topRight.gridIndex, bottomRight.gridIndex),
      ]);
    }

    // 10
    case RoomShape.LTR: {
      const [topLeft, topMiddle, middle, middleRight, bottomLeft, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new Set([
        // Horizontal
        ...getGridIndexesBetween(topLeft.gridIndex, topMiddle.gridIndex),
        ...getGridIndexesBetween(middle.gridIndex, middleRight.gridIndex),
        ...getGridIndexesBetween(bottomLeft.gridIndex, bottomRight.gridIndex),

        // Vertical
        ...getGridIndexesBetween(topLeft.gridIndex, bottomLeft.gridIndex),
        ...getGridIndexesBetween(topMiddle.gridIndex, middle.gridIndex),
        ...getGridIndexesBetween(middleRight.gridIndex, bottomRight.gridIndex),
      ]);
    }

    // 11
    case RoomShape.LBL: {
      const [topLeft, topRight, middleLeft, middle, bottomMiddle, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new Set([
        // Horizontal
        ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex),
        ...getGridIndexesBetween(middleLeft.gridIndex, middle.gridIndex),
        ...getGridIndexesBetween(bottomMiddle.gridIndex, bottomRight.gridIndex),

        // Vertical
        ...getGridIndexesBetween(topLeft.gridIndex, middleLeft.gridIndex),
        ...getGridIndexesBetween(middle.gridIndex, bottomMiddle.gridIndex),
        ...getGridIndexesBetween(topRight.gridIndex, bottomRight.gridIndex),
      ]);
    }

    // 12
    case RoomShape.LBR: {
      const [topLeft, topRight, middle, middleRight, bottomLeft, bottomMiddle] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new Set([
        // Horizontal
        ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex),
        ...getGridIndexesBetween(middle.gridIndex, middleRight.gridIndex),
        ...getGridIndexesBetween(bottomLeft.gridIndex, bottomMiddle.gridIndex),

        // Vertical
        ...getGridIndexesBetween(topLeft.gridIndex, bottomLeft.gridIndex),
        ...getGridIndexesBetween(middle.gridIndex, bottomMiddle.gridIndex),
        ...getGridIndexesBetween(topRight.gridIndex, middleRight.gridIndex),
      ]);
    }

    default: {
      const [topLeft, topRight, bottomLeft, bottomRight] = corners as [
        Corner,
        Corner,
        Corner,
        Corner,
      ];
      return new Set([
        // Horizontal
        ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex),
        ...getGridIndexesBetween(bottomLeft.gridIndex, bottomRight.gridIndex),

        // Vertical
        ...getGridIndexesBetween(topLeft.gridIndex, bottomLeft.gridIndex),
        ...getGridIndexesBetween(topRight.gridIndex, bottomRight.gridIndex),
      ]);
    }
  }
}

/** The Home closet is is 9x3, which is different from `RoomShape.IH` (which is 13x3). */
const HOME_CLOSET_CORNERS = [
  {
    type: CornerType.TOP_LEFT,
    gridIndex: 30,
    position: Vector(60, 220),
  },
  {
    type: CornerType.TOP_RIGHT,
    gridIndex: 38,
    position: Vector(340, 220),
  },
  {
    type: CornerType.BOTTOM_LEFT,
    gridIndex: 90,
    position: Vector(60, 340),
  },
  {
    type: CornerType.BOTTOM_RIGHT,
    gridIndex: 98,
    position: Vector(340, 340),
  },
] as const;

const HOME_CLOSET_CORNERS_SET = getHomeClosetCornersSet();

function getHomeClosetCornersSet(): ReadonlySet<int> {
  const [topLeft, topRight, bottomLeft, bottomRight] = HOME_CLOSET_CORNERS as [
    Corner,
    Corner,
    Corner,
    Corner,
  ];

  return new Set([
    // Horizontal
    ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex),
    ...getGridIndexesBetween(bottomLeft.gridIndex, bottomRight.gridIndex),

    // Vertical
    ...getGridIndexesBetween(topLeft.gridIndex, bottomLeft.gridIndex),
    ...getGridIndexesBetween(topRight.gridIndex, bottomRight.gridIndex),
  ]);
}

/**
 * The Mother Boss Room is 15x11, which is different from `RoomShape.SHAPE_1x2` (which is 15x16).
 */
const MOTHER_ROOM_CORNERS = [
  {
    type: CornerType.TOP_LEFT,
    gridIndex: 0,
    position: Vector(60, 140),
  },
  {
    type: CornerType.TOP_RIGHT,
    gridIndex: 14,
    position: Vector(580, 140),
  },
  {
    type: CornerType.BOTTOM_LEFT,
    gridIndex: 150,
    position: Vector(60, 500),
  },
  {
    type: CornerType.BOTTOM_RIGHT,
    gridIndex: 164,
    position: Vector(580, 500),
  },
] as const;

const MOTHER_ROOM_CORNERS_SET = getMotherRoomCornersSet();

function getMotherRoomCornersSet(): ReadonlySet<int> {
  const [topLeft, topRight, bottomLeft, bottomRight] = MOTHER_ROOM_CORNERS as [
    Corner,
    Corner,
    Corner,
    Corner,
  ];

  return new Set([
    // Horizontal
    ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex),
    ...getGridIndexesBetween(bottomLeft.gridIndex, bottomRight.gridIndex),

    // Vertical
    ...getGridIndexesBetween(topLeft.gridIndex, bottomLeft.gridIndex),
    ...getGridIndexesBetween(topRight.gridIndex, bottomRight.gridIndex),
  ]);
}

/**
 * Helper function to determine if a given wall is a "real" wall generated by the vanilla game. This
 * is useful because mods can use custom spawned walls as a stand-in for custom grid entities.
 *
 * This function checks for identity via a combination of `StageAPI.IsCustomGrid` and the
 * `isVanillaWallGridIndex` function.
 */
export function isVanillaWall(gridEntity: GridEntity): boolean {
  const gridIndex = gridEntity.GetGridIndex();

  if (StageAPI !== undefined && StageAPI.IsCustomGrid(gridIndex)) {
    return false;
  }

  return isVanillaWallGridIndex(gridIndex);
}

/**
 * Helper function to determine if a given grid index should have a wall generated by the vanilla
 * game. This is useful as a mechanism to distinguish between real walls and custom walls spawned by
 * mods.
 *
 * This function properly handles the special cases of the Mother boss room and the Home closet
 * rooms, which are both non-standard room shapes.
 */
export function isVanillaWallGridIndex(gridIndex: int): boolean {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  // Handle the special cases of non-standard room shapes.
  let wallGridIndexSet: ReadonlySet<int> | undefined;
  if (inHomeCloset()) {
    wallGridIndexSet = HOME_CLOSET_CORNERS_SET;
  } else if (inBossRoomOf(BossID.MOTHER)) {
    wallGridIndexSet = MOTHER_ROOM_CORNERS_SET;
  } else {
    wallGridIndexSet = ROOM_SHAPE_TO_WALL_GRID_INDEX_SET.get(roomShape);
  }

  if (wallGridIndexSet === undefined) {
    error(
      `Failed to find the wall grid index set for: RoomShape.${RoomShape[roomShape]} (${roomShape})`,
    );
  }

  return wallGridIndexSet.has(gridIndex);
}
