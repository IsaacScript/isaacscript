import { BossID, RoomShape } from "isaac-typescript-definitions";
import { ROOM_SHAPE_VALUES } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { CornerType } from "../enums/CornerType";
import type { Corner } from "../interfaces/Corner";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { ReadonlySet } from "../types/ReadonlySet";
import { getGridIndexesBetween } from "./gridIndex";
import { getRoomShapeCorners, isLRoomShape } from "./roomShape";
import { inBossRoomOf, inHomeCloset } from "./rooms";
import { assertDefined } from "./utils";

const ROOM_SHAPE_TO_WALL_GRID_INDEX_MAP = new ReadonlyMap(
  ROOM_SHAPE_VALUES.map((roomShape) => [
    roomShape,
    getVanillaWallGridIndexSetForRoomShape(roomShape),
  ]),
);

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

const HOME_CLOSET_CORNERS_SET = getVanillaWallGridIndexSetForRectangleRoomShape(
  RoomShape.IH,
  HOME_CLOSET_CORNERS,
);

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

const MOTHER_ROOM_CORNERS_SET = getVanillaWallGridIndexSetForRectangleRoomShape(
  RoomShape.SHAPE_1x2,
  MOTHER_ROOM_CORNERS,
);

/**
 * Helper function to get the set of grid indexes that represent where the walls are supposed to be
 * in a given room shape.
 *
 * This function only works reliably in vanilla rooms because in a modded room, it is possible to
 * place walls in a non-standard location.
 */
export function getVanillaWallGridIndexSetForRoomShape(
  roomShape: RoomShape,
): ReadonlySet<int> {
  const corners = getRoomShapeCorners(roomShape);
  const lRoom = isLRoomShape(roomShape);

  if (lRoom && corners.length !== 6) {
    error(
      `Failed to get the correct amount of corners for: RoomShape.${RoomShape[roomShape]} (${roomShape})`,
    );
  }

  switch (roomShape) {
    // 9
    case RoomShape.LTL: {
      const [topMiddle, topRight, middleLeft, middle, bottomLeft, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new ReadonlySet([
        // Horizontal
        ...getGridIndexesBetween(
          topMiddle.gridIndex,
          topRight.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middleLeft.gridIndex,
          middle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          bottomLeft.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),

        // Vertical
        ...getGridIndexesBetween(
          middleLeft.gridIndex,
          bottomLeft.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          topMiddle.gridIndex,
          middle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          topRight.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),
      ]);
    }

    // 10
    case RoomShape.LTR: {
      const [topLeft, topMiddle, middle, middleRight, bottomLeft, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new ReadonlySet([
        // Horizontal
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          topMiddle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middle.gridIndex,
          middleRight.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          bottomLeft.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),

        // Vertical
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          bottomLeft.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          topMiddle.gridIndex,
          middle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middleRight.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),
      ]);
    }

    // 11
    case RoomShape.LBL: {
      const [topLeft, topRight, middleLeft, middle, bottomMiddle, bottomRight] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new ReadonlySet([
        // Horizontal
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          topRight.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middleLeft.gridIndex,
          middle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          bottomMiddle.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),

        // Vertical
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          middleLeft.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middle.gridIndex,
          bottomMiddle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          topRight.gridIndex,
          bottomRight.gridIndex,
          roomShape,
        ),
      ]);
    }

    // 12
    case RoomShape.LBR: {
      const [topLeft, topRight, middle, middleRight, bottomLeft, bottomMiddle] =
        corners as [Corner, Corner, Corner, Corner, Corner, Corner];
      return new ReadonlySet([
        // Horizontal
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          topRight.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middle.gridIndex,
          middleRight.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          bottomLeft.gridIndex,
          bottomMiddle.gridIndex,
          roomShape,
        ),

        // Vertical
        ...getGridIndexesBetween(
          topLeft.gridIndex,
          bottomLeft.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          middle.gridIndex,
          bottomMiddle.gridIndex,
          roomShape,
        ),
        ...getGridIndexesBetween(
          topRight.gridIndex,
          middleRight.gridIndex,
          roomShape,
        ),
      ]);
    }

    default: {
      return getVanillaWallGridIndexSetForRectangleRoomShape(
        roomShape,
        corners,
      );
    }
  }
}

/**
 * Providing the room shape is necessary so that the `getGridIndexesBetween` function can use the
 * corresponding grid width.
 */
function getVanillaWallGridIndexSetForRectangleRoomShape(
  roomShape: RoomShape,
  corners: readonly Corner[],
): ReadonlySet<int> {
  if (corners.length !== 4) {
    error(
      "Failed to get the correct amount of corners for rectangular room shape.",
    );
  }

  const [topLeft, topRight, bottomLeft, bottomRight] = corners as [
    Corner,
    Corner,
    Corner,
    Corner,
  ];

  return new ReadonlySet([
    // Horizontal
    ...getGridIndexesBetween(topLeft.gridIndex, topRight.gridIndex, roomShape),
    ...getGridIndexesBetween(
      bottomLeft.gridIndex,
      bottomRight.gridIndex,
      roomShape,
    ),

    // Vertical
    ...getGridIndexesBetween(
      topLeft.gridIndex,
      bottomLeft.gridIndex,
      roomShape,
    ),
    ...getGridIndexesBetween(
      topRight.gridIndex,
      bottomRight.gridIndex,
      roomShape,
    ),
  ]);
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
    wallGridIndexSet = ROOM_SHAPE_TO_WALL_GRID_INDEX_MAP.get(roomShape);
    assertDefined(
      wallGridIndexSet,
      `Failed to find the wall grid index set for: RoomShape.${RoomShape[roomShape]} (${roomShape})`,
    );
  }

  return wallGridIndexSet.has(gridIndex);
}
