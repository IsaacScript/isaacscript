import type { GridEntityXMLType } from "isaac-typescript-definitions";
import {
  BackdropType,
  EffectVariant,
  GridCollisionClass,
  GridEntityType,
  PoopGridEntityVariant,
  StatueVariant,
  TrapdoorVariant,
} from "isaac-typescript-definitions";
import { GRID_ENTITY_XML_TYPE_VALUES } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { DISTANCE_OF_GRID_TILE, VectorOne } from "../core/constants";
import { GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP } from "../maps/gridEntityTypeToBrokenStateMap";
import { GRID_ENTITY_XML_MAP } from "../maps/gridEntityXMLMap";
import {
  DEFAULT_TOP_LEFT_WALL_GRID_INDEX,
  ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP,
} from "../maps/roomShapeToTopLeftWallGridIndexMap";
import { GRID_ENTITY_TYPE_TO_ANM2_PATH } from "../objects/gridEntityTypeToANM2Path";
import { POOP_GRID_ENTITY_XML_TYPES_SET } from "../sets/poopGridEntityXMLTypesSet";
import type { AnyGridEntity } from "../types/AnyGridEntity";
import type { GridEntityID } from "../types/GridEntityID";
import { ReadonlySet } from "../types/ReadonlySet";
import { removeEntities } from "./entities";
import { getEffects } from "./entitiesSpecific";
import { isCircleIntersectingRectangle } from "./math";
import { roomUpdateSafe } from "./rooms";
import { asNumber, isInteger } from "./types";
import { assertDefined, eRange, iRange } from "./utils";
import { isVector, vectorEquals } from "./vector";

/**
 * For some specific grid entities, the variant defined in the XML is what is used by the actual
 * game (which is not the case for e.g. poops).
 */
const GRID_ENTITY_TYPES_THAT_KEEP_GRID_ENTITY_XML_VARIANT = new ReadonlySet([
  GridEntityType.SPIKES_ON_OFF, // 9
  GridEntityType.PRESSURE_PLATE, // 20
  GridEntityType.TELEPORTER, // 23
]);

const BREAKABLE_GRID_ENTITY_TYPES_BY_EXPLOSIONS =
  new ReadonlySet<GridEntityType>([
    GridEntityType.ROCK, // 2
    GridEntityType.ROCK_TINTED, // 4
    GridEntityType.ROCK_BOMB, // 5
    GridEntityType.ROCK_ALT, // 6
    GridEntityType.SPIDER_WEB, // 10
    GridEntityType.TNT, // 12
    // GridEntityType.FIREPLACE (13) does not count since it is turned into a non-grid entity upon
    // spawning.
    GridEntityType.POOP, // 14
    GridEntityType.ROCK_SUPER_SPECIAL, // 22
    GridEntityType.ROCK_SPIKED, // 25
    GridEntityType.ROCK_ALT_2, // 26
    GridEntityType.ROCK_GOLD, // 27
  ]);

const BREAKABLE_GRID_ENTITY_TYPES_VARIANTS_BY_EXPLOSIONS =
  new ReadonlySet<string>([`${GridEntityType.STATUE}.${StatueVariant.ANGEL}`]);

const GRID_ENTITY_XML_TYPES_SET = new ReadonlySet(GRID_ENTITY_XML_TYPE_VALUES);

/**
 * Helper function to convert the grid entity type found in a room XML file to the corresponding
 * grid entity type and variant normally used by the game. For example, `GridEntityXMLType.ROCK` is
 * 1000 (in a room XML file), but `GridEntityType.ROCK` is equal to 2 (in-game).
 */
export function convertXMLGridEntityType(
  gridEntityXMLType: GridEntityXMLType,
  gridEntityXMLVariant: int,
): [GridEntityType, int] | undefined {
  const gridEntityArray = GRID_ENTITY_XML_MAP.get(gridEntityXMLType);
  assertDefined(
    gridEntityArray,
    `Failed to find an entry in the grid entity map for XML entity type: ${gridEntityXMLType}`,
  );

  const gridEntityType = gridEntityArray[0];
  const variant = GRID_ENTITY_TYPES_THAT_KEEP_GRID_ENTITY_XML_VARIANT.has(
    gridEntityType,
  )
    ? gridEntityXMLVariant
    : gridEntityArray[1];

  return [gridEntityType, variant];
}

/**
 * Helper function to check if one or more of a specific kind of grid entity is present in the
 * current room.
 *
 * @param gridEntityType The grid entity type to match.
 * @param variant Optional. Default is -1, which matches every variant.
 */
export function doesGridEntityExist(
  gridEntityType: GridEntityType,
  variant = -1,
): boolean {
  const room = game.GetRoom();
  const gridIndexes = getAllGridIndexes();

  return gridIndexes.some((gridIndex) => {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity === undefined) {
      return false;
    }

    const thisGridEntityType = gridEntity.GetType();
    const thisVariant = gridEntity.GetVariant();
    return (
      gridEntityType === thisGridEntityType &&
      (variant === -1 || variant === thisVariant)
    );
  });
}

/**
 * Helper function to get every legal grid index for the current room.
 *
 * Under the hood, this uses the `Room.GetGridSize` method.
 */
export function getAllGridIndexes(): int[] {
  const room = game.GetRoom();
  const gridSize = room.GetGridSize();

  return eRange(gridSize);
}

/**
 * Gets the entities that have a hitbox that overlaps with any part of the square that the grid
 * entity is on.
 *
 * This function is useful because the vanilla collision callbacks do not work with grid entities.
 * This is used by `POST_GRID_ENTITY_COLLISION` custom callback.
 *
 * Note that this function will not work properly in the `POST_NEW_ROOM` callback since entities do
 * not have collision yet in that callback.
 */
export function getCollidingEntitiesWithGridEntity(
  gridEntity: GridEntity,
): Entity[] {
  const { topLeft, bottomRight } = getGridEntityCollisionPoints(gridEntity);

  const closeEntities = Isaac.FindInRadius(
    gridEntity.Position,
    DISTANCE_OF_GRID_TILE * 2,
  );

  return closeEntities.filter(
    (entity) =>
      entity.CollidesWithGrid() &&
      isCircleIntersectingRectangle(
        entity.Position,
        // We arbitrarily add 0.1 to account for entities that are already pushed back by the time
        // the `POST_UPDATE` callback fires.
        entity.Size + 0.1,
        topLeft,
        bottomRight,
      ),
  );
}

/** Helper function to get the grid entity type and variant from a `GridEntityID`. */
export function getConstituentsFromGridEntityID(
  gridEntityID: GridEntityID,
): [gridEntityType: GridEntityType, variant: int] {
  const parts = gridEntityID.split(".");
  if (parts.length !== 2) {
    error(
      `Failed to get the constituents from grid entity ID: ${gridEntityID}`,
    );
  }

  const [gridEntityTypeString, variantString] = parts;

  const gridEntityType = tonumber(gridEntityTypeString);
  assertDefined(
    gridEntityType,
    `Failed to convert the grid entity type to a number: ${gridEntityTypeString}`,
  );

  const variant = tonumber(variantString);
  assertDefined(
    variant,
    `Failed to convert the grid entity variant to a number: ${variantString}`,
  );

  return [gridEntityType, variant];
}

/**
 * Helper function to get every grid entity in the current room.
 *
 * Use this function with no arguments to get every grid entity, or specify a variadic amount of
 * arguments to match specific grid entity types.
 *
 * For example:
 *
 * ```ts
 * for (const gridEntity of getGridEntities()) {
 *   print(gridEntity.GetType())
 * }
 * ```
 *
 * For example:
 *
 * ```ts
 * const rocks = getGridEntities(
 *   GridEntityType.ROCK,
 *   GridEntityType.BLOCK,
 *   GridEntityType.ROCK_TINTED,
 * );
 * ```
 *
 * @allowEmptyVariadic
 */
export function getGridEntities(
  ...gridEntityTypes: GridEntityType[]
): GridEntity[] {
  const gridEntities = getAllGridEntities();

  if (gridEntityTypes.length === 0) {
    return gridEntities;
  }

  const gridEntityTypesSet = new ReadonlySet(gridEntityTypes);
  return gridEntities.filter((gridEntity) => {
    const gridEntityType = gridEntity.GetType();
    return gridEntityTypesSet.has(gridEntityType);
  });
}

/**
 * Helper function to get every grid entity in the current room except for certain specific types.
 *
 * This function is variadic, meaning that you can specify as many grid entity types as you want to
 * exclude.
 */
export function getGridEntitiesExcept(
  ...gridEntityTypes: GridEntityType[]
): GridEntity[] {
  const gridEntities = getAllGridEntities();

  if (gridEntityTypes.length === 0) {
    return gridEntities;
  }

  const gridEntityTypesSet = new ReadonlySet(gridEntityTypes);
  return gridEntities.filter((gridEntity) => {
    const gridEntityType = gridEntity.GetType();
    return !gridEntityTypesSet.has(gridEntityType);
  });
}

function getAllGridEntities(): GridEntity[] {
  const room = game.GetRoom();

  const gridEntities: GridEntity[] = [];
  for (const gridIndex of getAllGridIndexes()) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      gridEntities.push(gridEntity);
    }
  }

  return gridEntities;
}

/** Helper function to get all grid entities in a given radius around a given point. */
export function getGridEntitiesInRadius(
  targetPosition: Vector,
  radius: number,
): GridEntity[] {
  radius = Math.abs(radius);
  const topLeftOffset = VectorOne.mul(-radius);
  const mostTopLeftPosition = targetPosition.add(topLeftOffset);
  const room = game.GetRoom();

  const diameter = radius * 2;
  const iterations = Math.ceil(diameter / DISTANCE_OF_GRID_TILE);
  const separation = diameter / iterations;

  const gridEntities: GridEntity[] = [];
  const registeredGridIndexes = new Set<number>();
  for (const x of iRange(iterations)) {
    for (const y of iRange(iterations)) {
      const position = mostTopLeftPosition.add(
        Vector(x * separation, y * separation),
      );

      const gridIndex = room.GetGridIndex(position);
      const gridEntity = room.GetGridEntityFromPos(position);
      if (gridEntity === undefined || registeredGridIndexes.has(gridIndex)) {
        continue;
      }

      registeredGridIndexes.add(gridIndex);
      const { topLeft, bottomRight } = getGridEntityCollisionPoints(gridEntity);

      if (
        isCircleIntersectingRectangle(
          targetPosition,
          radius,
          topLeft,
          bottomRight,
        )
      ) {
        gridEntities.push(gridEntity);
      }
    }
  }

  return gridEntities;
}

/**
 * Helper function to get a map of every grid entity in the current room. The indexes of the map are
 * equal to the grid index. The values of the map are equal to the grid entities.
 *
 * Use this function with no arguments to get every grid entity, or specify a variadic amount of
 * arguments to match specific grid entity types.
 *
 * @allowEmptyVariadic
 */
export function getGridEntitiesMap(
  ...gridEntityTypes: GridEntityType[]
): Map<int, GridEntity> {
  const gridEntities = getGridEntities(...gridEntityTypes);

  const gridEntityMap = new Map<int, GridEntity>();
  for (const gridEntity of gridEntities) {
    const gridIndex = gridEntity.GetGridIndex();
    gridEntityMap.set(gridIndex, gridEntity);
  }

  return gridEntityMap;
}

/** Helper function to get the ANM2 path for a grid entity type. */
export function getGridEntityANM2Path(
  gridEntityType: GridEntityType,
): string | undefined {
  switch (gridEntityType) {
    // 1
    case GridEntityType.DECORATION: {
      return getGridEntityANM2PathDecoration();
    }

    default: {
      return GRID_ENTITY_TYPE_TO_ANM2_PATH[gridEntityType];
    }
  }
}

/**
 * Helper function to get the ANM2 path for a decoration. This depends on the current room's
 * backdrop.
 */
export function getGridEntityANM2PathDecoration(): string {
  const room = game.GetRoom();
  const backdropType = room.GetBackdropType();

  switch (backdropType) {
    // 1, 2, 3
    case BackdropType.BASEMENT:
    case BackdropType.CELLAR:
    case BackdropType.BURNT_BASEMENT: {
      return "gfx/grid/Props_01_Basement.anm2";
    }

    // 4, 5, 6
    case BackdropType.CAVES:
    case BackdropType.CATACOMBS:
    case BackdropType.FLOODED_CAVES: {
      return "gfx/grid/Props_03_caves.anm2";
    }

    // 7, 8, 9
    case BackdropType.DEPTHS:
    case BackdropType.NECROPOLIS:
    case BackdropType.DANK_DEPTHS: {
      return "gfx/grid/Props_05_depths.anm2";
    }

    // 10, 12
    case BackdropType.WOMB:
    case BackdropType.SCARRED_WOMB: {
      return "gfx/grid/Props_07_the womb.anm2";
    }

    // 11
    case BackdropType.UTERO: {
      return "gfx/grid/Props_07_utero.anm2";
    }

    // 13, 27
    case BackdropType.BLUE_WOMB:
    case BackdropType.BLUE_WOMB_PASS: {
      return "gfx/grid/Props_07_the womb_blue.anm2";
    }

    // 14
    case BackdropType.SHEOL: {
      return "gfx/grid/Props_09_sheol.anm2";
    }

    // 15
    case BackdropType.CATHEDRAL: {
      return "gfx/grid/Props_10_cathedral.anm2";
    }

    // 17
    case BackdropType.CHEST: {
      return "gfx/grid/Props_11_the chest.anm2";
    }

    // 28
    case BackdropType.GREED_SHOP: {
      return "gfx/grid/Props_12_greed.anm2";
    }

    // 31, 36
    case BackdropType.DOWNPOUR:
    case BackdropType.DOWNPOUR_ENTRANCE: {
      return "gfx/grid/Props_01x_downpour.anm2";
    }

    // 32
    case BackdropType.MINES: {
      return "gfx/grid/Props_03x_mines.anm2";
    }

    // 34
    case BackdropType.CORPSE: {
      return "gfx/grid/Props_07_the corpse.anm2";
    }

    // 45
    case BackdropType.DROSS: {
      return "gfx/grid/Props_02x_dross.anm2";
    }

    // 49
    case BackdropType.ISAACS_BEDROOM: {
      return "gfx/grid/Props_0ex_isaacs_bedroom.anm2";
    }

    default: {
      return "gfx/grid/Props_01_Basement.anm2";
    }
  }
}

/** Helper function to get the top left and bottom right corners of a given grid entity. */
export function getGridEntityCollisionPoints(gridEntity: GridEntity): {
  topLeft: Vector;
  bottomRight: Vector;
} {
  const topLeft = Vector(
    gridEntity.Position.X - DISTANCE_OF_GRID_TILE / 2,
    gridEntity.Position.Y - DISTANCE_OF_GRID_TILE / 2,
  );
  const bottomRight = Vector(
    gridEntity.Position.X + DISTANCE_OF_GRID_TILE / 2,
    gridEntity.Position.Y + DISTANCE_OF_GRID_TILE / 2,
  );

  return { topLeft, bottomRight };
}

/** Helper function to get a string containing the grid entity's type and variant. */
export function getGridEntityID(gridEntity: GridEntity): GridEntityID {
  const gridEntityType = gridEntity.GetType();
  const variant = gridEntity.GetVariant();
  return `${gridEntityType}.${variant}` as GridEntityID;
}

/**
 * Helper function to get a formatted string in the format returned by the `getGridEntityID`
 * function.
 */
export function getGridEntityIDFromConstituents(
  gridEntityType: GridEntityType,
  variant: int,
): GridEntityID {
  return `${gridEntityType}.${variant}` as GridEntityID;
}

/**
 * Helper function to get all of the grid entities in the room that specifically match the type and
 * variant provided.
 *
 * If you want to match every variant, use the `getGridEntities` function instead.
 */
export function getMatchingGridEntities(
  gridEntityType: GridEntityType,
  variant: int,
): GridEntity[] {
  const gridEntities = getGridEntities(gridEntityType);
  return gridEntities.filter(
    (gridEntity) => gridEntity.GetVariant() === variant,
  );
}

export function getRockPNGPath(): string {
  const room = game.GetRoom();
  const backdropType = room.GetBackdropType();

  switch (backdropType) {
    // 1
    case BackdropType.BASEMENT: {
      return "rocks_basement.png";
    }

    // 2
    case BackdropType.CELLAR: {
      return "rocks_cellar.png";
    }

    // 3
    case BackdropType.BURNT_BASEMENT: {
      return "rocks_burningbasement.png"; // cspell:ignore burningbasement
    }

    // 4
    case BackdropType.CAVES: {
      return "rocks_caves.png";
    }

    // 5
    case BackdropType.CATACOMBS: {
      return "rocks_catacombs.png";
    }

    // 6
    case BackdropType.FLOODED_CAVES: {
      return "rocks_drownedcaves.png"; // cspell:ignore drownedcaves
    }

    // 7, 8, 9
    case BackdropType.DEPTHS:
    case BackdropType.NECROPOLIS:
    case BackdropType.DANK_DEPTHS:
    case BackdropType.MAUSOLEUM:
    case BackdropType.MAUSOLEUM_2:
    case BackdropType.MAUSOLEUM_3:
    case BackdropType.MAUSOLEUM_4:
    case BackdropType.MAUSOLEUM_ENTRANCE: {
      return "rocks_depths.png";
    }

    // 10, 11
    case BackdropType.WOMB:
    case BackdropType.UTERO: {
      return "rocks_womb.png";
    }

    // 12
    case BackdropType.SCARRED_WOMB: {
      return "rocks_scarredwomb.png"; // cspell:ignore scarredwomb
    }

    // 13
    case BackdropType.BLUE_WOMB:
    case BackdropType.BLUE_WOMB_PASS: {
      return "rocks_bluewomb.png"; // cspell:ignore bluewomb
    }

    // 14, 16
    case BackdropType.SHEOL:
    case BackdropType.DARK_ROOM: {
      return "rocks_sheol.png";
    }

    // 15
    case BackdropType.CATHEDRAL: {
      return "rocks_cathedral.png";
    }

    // 23
    case BackdropType.SECRET: {
      return "rocks_secretroom.png"; // cspell:ignore secretroom
    }

    default: {
      return "rocks_basement.png";
    }
  }
}

/**
 * Helper function to get the grid entities on the surrounding tiles from the provided grid entity.
 *
 * For example, if a rock was surrounded by rocks on all sides, this would return an array of 8
 * rocks (e.g. top-left + top + top-right + left + right + bottom-left + bottom + right).
 */
export function getSurroundingGridEntities(
  gridEntity: GridEntity,
): GridEntity[] {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();
  const gridIndex = gridEntity.GetGridIndex();

  const surroundingGridIndexes: int[] = [
    gridIndex - 1, // Left
    gridIndex + 1, // Right

    gridIndex - gridWidth - 1, // Top-left
    gridIndex - gridWidth, // Top
    gridIndex - gridWidth + 1, // Top-right

    gridIndex + gridWidth - 1, // Bottom-left
    gridIndex + gridWidth, // Bottom
    gridIndex + gridWidth + 1, // Bottom-right
  ];

  const surroundingGridEntities: GridEntity[] = [];
  for (const surroundingGridIndex of surroundingGridIndexes) {
    const surroundingGridEntity = room.GetGridEntity(surroundingGridIndex);
    if (surroundingGridEntity !== undefined) {
      surroundingGridEntities.push(surroundingGridEntity);
    }
  }

  return surroundingGridEntities;
}

/**
 * Helper function to get the top left wall in the current room.
 *
 * This function can be useful in certain situations to determine if the room is currently loaded.
 */
export function getTopLeftWall(): GridEntity | undefined {
  const room = game.GetRoom();
  const topLeftWallGridIndex = getTopLeftWallGridIndex();
  return room.GetGridEntity(topLeftWallGridIndex);
}

/**
 * Helper function to get the grid index of the top left wall. (This will depend on what the current
 * room shape is.)
 *
 * This function can be useful in certain situations to determine if the room is currently loaded.
 */
export function getTopLeftWallGridIndex(): int {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  const topLeftWallGridIndex =
    ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP.get(roomShape);
  return topLeftWallGridIndex ?? DEFAULT_TOP_LEFT_WALL_GRID_INDEX;
}

/**
 * Helper function to detect if a particular grid entity would "break" if it was touched by an
 * explosion.
 *
 * For example, rocks and pots are breakable by explosions, but blocks are not.
 */
export function isGridEntityBreakableByExplosion(
  gridEntity: GridEntity,
): boolean {
  const gridEntityType = gridEntity.GetType();
  const variant = gridEntity.GetVariant();
  const gridEntityTypeVariant = `${gridEntityType}.${variant}`;

  return (
    BREAKABLE_GRID_ENTITY_TYPES_BY_EXPLOSIONS.has(gridEntityType) ||
    BREAKABLE_GRID_ENTITY_TYPES_VARIANTS_BY_EXPLOSIONS.has(
      gridEntityTypeVariant,
    )
  );
}

/**
 * Helper function to see if the provided grid entity is in its respective broken state. See the
 * `GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP` constant for more details.
 *
 * Note that in the case of `GridEntityType.LOCK` (11), the state will turn to being broken before
 * the actual collision for the entity is removed.
 */
export function isGridEntityBroken(gridEntity: GridEntity): boolean {
  const gridEntityType = gridEntity.GetType();
  const brokenState = GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP.get(gridEntityType);
  return gridEntity.State === brokenState;
}

/**
 * Helper function to see if an arbitrary number is a valid `GridEntityXMLType`. This is useful in
 * the `PRE_ROOM_ENTITY_SPAWN` callback for narrowing the type of the first argument.
 */
export function isGridEntityXMLType(num: number): num is GridEntityXMLType {
  return GRID_ENTITY_XML_TYPES_SET.has(num); // eslint-disable-line isaacscript/strict-enums
}

/** Helper function to see if a `GridEntityXMLType` is some kind of poop. */
export function isPoopGridEntityXMLType(
  gridEntityXMLType: GridEntityXMLType,
): boolean {
  return POOP_GRID_ENTITY_XML_TYPES_SET.has(gridEntityXMLType);
}

/**
 * Helper function to detect whether a given Void Portal is one that randomly spawns after a boss is
 * defeated or is one that naturally spawns in the room after Hush.
 *
 * Under the hood, this is determined by looking at the `VarData` of the entity:
 * - The `VarData` of Void Portals that are spawned after bosses will be equal to 1.
 * - The `VarData` of the Void Portal in the room after Hush is equal to 0.
 */
export function isPostBossVoidPortal(gridEntity: GridEntity): boolean {
  const saveState = gridEntity.GetSaveState();

  return (
    saveState.Type === GridEntityType.TRAPDOOR &&
    saveState.Variant === TrapdoorVariant.VOID_PORTAL &&
    saveState.VarData === 1
  );
}

/**
 * Helper function to all grid entities in the room except for ones matching the grid entity types
 * provided.
 *
 * Note that this function will automatically update the room. (This means that you can spawn new
 * grid entities on the same tile on the same frame, if needed.)
 *
 * For example:
 *
 * ```ts
 * removeAllGridEntitiesExcept(
 *   GridEntityType.WALL,
 *   GridEntityType.DOOR,
 * );
 * ```
 *
 * @returns The grid entities that were removed.
 */
export function removeAllGridEntitiesExcept(
  ...gridEntityTypes: GridEntityType[]
): GridEntity[] {
  const gridEntityTypeExceptions = new ReadonlySet(gridEntityTypes);
  const gridEntities = getGridEntities();
  const removedGridEntities: GridEntity[] = [];
  for (const gridEntity of gridEntities) {
    const gridEntityType = gridEntity.GetType();
    if (!gridEntityTypeExceptions.has(gridEntityType)) {
      removeGridEntity(gridEntity, false);
      removedGridEntities.push(gridEntity);
    }
  }

  if (removedGridEntities.length > 0) {
    roomUpdateSafe();
  }

  return removedGridEntities;
}

/**
 * Helper function to remove all of the grid entities in the room that match the grid entity types
 * provided.
 *
 * Note that this function will automatically update the room. (This means that you can spawn new
 * grid entities on the same tile on the same frame, if needed.)
 *
 * For example:
 *
 * ```ts
 * removeAllMatchingGridEntities(
 *   GridEntityType.ROCK,
 *   GridEntityType.BLOCK,
 *   GridEntityType.ROCK_TINTED,
 * );
 * ```
 *
 * @returns An array of the grid entities removed.
 */
export function removeAllMatchingGridEntities(
  ...gridEntityType: GridEntityType[]
): GridEntity[] {
  const gridEntities = getGridEntities(...gridEntityType);
  if (gridEntities.length === 0) {
    return [];
  }

  for (const gridEntity of gridEntities) {
    removeGridEntity(gridEntity, false);
  }

  roomUpdateSafe();
  return gridEntities;
}

/**
 * Helper function to remove all entities that just spawned from a grid entity breaking.
 * Specifically, this is any entities that overlap with the position of a grid entity and are on
 * frame 0.
 *
 * You must specify an array of entities to look through.
 */
export function removeEntitiesSpawnedFromGridEntity(
  entities: Entity[],
  gridEntity: GridEntity,
): void {
  const entitiesFromGridEntity = entities.filter(
    (entity) =>
      entity.FrameCount === 0 &&
      vectorEquals(entity.Position, gridEntity.Position),
  );
  removeEntities(entitiesFromGridEntity);
}

/**
 * Helper function to remove all of the grid entities in the supplied array.
 *
 * @param gridEntities The array of grid entities to remove.
 * @param updateRoom Whether to update the room after the grid entities are removed. This is
 *                   generally a good idea because if the room is not updated, you will be unable to
 *                   spawn another grid entity on the same tile until a frame has passed. However,
 *                   doing this is expensive, since it involves a call to `Isaac.GetRoomEntities`,
 *                   so set this to false if you need to run this function multiple times.
 * @param cap Optional. If specified, will only remove the given amount of entities.
 * @returns An array of the entities that were removed.
 */
export function removeGridEntities<T extends AnyGridEntity>(
  gridEntities: T[],
  updateRoom: boolean,
  cap?: int,
): T[] {
  if (gridEntities.length === 0) {
    return [];
  }

  const gridEntitiesRemoved: T[] = [];
  for (const gridEntity of gridEntities) {
    removeGridEntity(gridEntity, false);

    gridEntitiesRemoved.push(gridEntity);
    if (cap !== undefined && gridEntitiesRemoved.length >= cap) {
      break;
    }
  }

  if (updateRoom) {
    roomUpdateSafe();
  }

  return gridEntitiesRemoved;
}

/**
 * Helper function to remove a grid entity by providing the grid entity object or the grid index
 * inside of the room.
 *
 * If removing a Devil Statue or an Angel Statue, this will also remove the associated effect
 * (`EffectVariant.DEVIL` (6) or `EffectVariant.ANGEL` (9), respectively.)
 *
 * @param gridEntityOrGridIndex The grid entity or grid index to remove.
 * @param updateRoom Whether to update the room after the grid entity is removed. This is generally
 *                   a good idea because if the room is not updated, you will be unable to spawn
 *                   another grid entity on the same tile until a frame has passed. However, doing
 *                   this is expensive, since it involves a call to `Isaac.GetRoomEntities`, so set
 *                   this to false if you need to run this function multiple times.
 */
export function removeGridEntity(
  gridEntityOrGridIndex: GridEntity | int,
  updateRoom: boolean,
): void {
  const room = game.GetRoom();

  const gridEntity = isInteger(gridEntityOrGridIndex)
    ? room.GetGridEntity(gridEntityOrGridIndex)
    : gridEntityOrGridIndex;
  if (gridEntity === undefined) {
    // There is no grid entity to remove.
    return;
  }

  const gridEntityType = gridEntity.GetType();
  const variant = gridEntity.GetVariant();
  const position = gridEntity.Position;

  const gridIndex = isInteger(gridEntityOrGridIndex)
    ? gridEntityOrGridIndex
    : gridEntityOrGridIndex.GetGridIndex();
  room.RemoveGridEntity(gridIndex, 0, false);

  if (updateRoom) {
    roomUpdateSafe();
  }

  // In the special case of removing a Devil Statue or Angel Statue, we also need to delete the
  // corresponding effect.
  if (gridEntityType === GridEntityType.STATUE) {
    const effectVariant =
      variant === asNumber(StatueVariant.DEVIL)
        ? EffectVariant.DEVIL
        : EffectVariant.ANGEL;
    const effects = getEffects(effectVariant);
    const effectsOnTile = effects.filter((effect) =>
      vectorEquals(effect.Position, position),
    );
    removeEntities(effectsOnTile);
  }
}

/**
 * Helper function to make a grid entity invisible. This is accomplished by resetting the sprite.
 *
 * Note that this function is destructive such that once you make a grid entity invisible, it can no
 * longer become visible. (This is because the information about the sprite is lost when it is
 * reset.)
 */
export function setGridEntityInvisible(gridEntity: GridEntity): void {
  const sprite = gridEntity.GetSprite();
  sprite.Reset();
}

/**
 * Helper function to change the type of a grid entity to another type. Use this instead of the
 * `GridEntity.SetType` method since that does not properly handle updating the sprite of the grid
 * entity after the type is changed.
 *
 * Setting the new type to `GridEntityType.NULL` (0) will have no effect.
 */
export function setGridEntityType(
  gridEntity: GridEntity,
  gridEntityType: GridEntityType,
): void {
  gridEntity.SetType(gridEntityType);

  const sprite = gridEntity.GetSprite();
  const anm2Path = getGridEntityANM2Path(gridEntityType);
  if (anm2Path === undefined) {
    return;
  }

  sprite.Load(anm2Path, false);

  if (gridEntityType === GridEntityType.ROCK) {
    const pngPath = getRockPNGPath();
    sprite.ReplaceSpritesheet(0, pngPath);
  }

  sprite.LoadGraphics();
  const defaultAnimation = sprite.GetDefaultAnimation();
  sprite.Play(defaultAnimation, true);
}

/**
 * Helper function to spawn a giant poop. This is performed by spawning each of the four quadrant
 * grid entities in the appropriate positions.
 *
 * @returns Whether spawning the four quadrants was successful.
 */
export function spawnGiantPoop(topLeftGridIndex: int): boolean {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  const topRightGridIndex = topLeftGridIndex + 1;
  const bottomLeftGridIndex = topLeftGridIndex + gridWidth;
  const bottomRightGridIndex = bottomLeftGridIndex + 1;

  // First, check to see if all of the tiles are open.
  for (const gridIndex of [
    topLeftGridIndex,
    topRightGridIndex,
    bottomLeftGridIndex,
    bottomRightGridIndex,
  ]) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      return false;
    }
  }

  const topLeft = spawnGridEntityWithVariant(
    GridEntityType.POOP,
    PoopGridEntityVariant.GIANT_TOP_LEFT,
    topLeftGridIndex,
  );
  const topRight = spawnGridEntityWithVariant(
    GridEntityType.POOP,
    PoopGridEntityVariant.GIANT_TOP_RIGHT,
    topRightGridIndex,
  );
  const bottomLeft = spawnGridEntityWithVariant(
    GridEntityType.POOP,
    PoopGridEntityVariant.GIANT_BOTTOM_LEFT,
    bottomLeftGridIndex,
  );
  const bottomRight = spawnGridEntityWithVariant(
    GridEntityType.POOP,
    PoopGridEntityVariant.GIANT_BOTTOM_RIGHT,
    bottomRightGridIndex,
  );

  return (
    topLeft !== undefined &&
    topLeft.GetType() === GridEntityType.POOP &&
    topLeft.GetVariant() === PoopGridEntityVariant.GIANT_TOP_LEFT &&
    topRight !== undefined &&
    topRight.GetType() === GridEntityType.POOP &&
    topRight.GetVariant() === PoopGridEntityVariant.GIANT_TOP_RIGHT &&
    bottomLeft !== undefined &&
    bottomLeft.GetType() === GridEntityType.POOP &&
    bottomLeft.GetVariant() === PoopGridEntityVariant.GIANT_BOTTOM_LEFT &&
    bottomRight !== undefined &&
    bottomRight.GetType() === GridEntityType.POOP &&
    bottomRight.GetVariant() === PoopGridEntityVariant.GIANT_BOTTOM_RIGHT
  );
}

/**
 * Helper function to spawn a grid entity.
 *
 * This function assumes you want to give the grid entity a variant of 0. If you want to specify a
 * variant, use the `spawnGridEntityWithVariant` helper function instead.
 *
 * Use this instead of the `Isaac.GridSpawn` method since it:
 * - handles giving pits collision
 * - removes existing grid entities on the same tile, if any
 * - allows you to specify either the grid index or the position
 */
export function spawnGridEntity(
  gridEntityType: GridEntityType,
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnGridEntityWithVariant(gridEntityType, 0, gridIndexOrPosition);
}

/**
 * Helper function to spawn a grid entity with a specific variant.
 *
 * Use this instead of the `Isaac.GridSpawn` method since it:
 * - handles giving pits collision
 * - removes existing grid entities on the same tile, if any
 * - allows you to specify the grid index or the position
 */
export function spawnGridEntityWithVariant(
  gridEntityType: GridEntityType,
  variant: int,
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  const room = game.GetRoom();

  const existingGridEntity = isVector(gridIndexOrPosition)
    ? room.GetGridEntityFromPos(gridIndexOrPosition)
    : room.GetGridEntity(gridIndexOrPosition);
  if (existingGridEntity !== undefined) {
    removeGridEntity(existingGridEntity, true);
  }

  const position = isVector(gridIndexOrPosition)
    ? gridIndexOrPosition
    : room.GetGridPosition(gridIndexOrPosition);
  const gridEntity = Isaac.GridSpawn(gridEntityType, variant, position);
  if (gridEntity === undefined) {
    return gridEntity;
  }

  if (gridEntityType === GridEntityType.PIT) {
    // For some reason, spawned pits start with a collision class of `NONE`, so we have to manually
    // set it.
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      pit.UpdateCollision();
    }
  } else if (gridEntityType === GridEntityType.WALL) {
    // For some reason, spawned walls start with a collision class of `NONE`, so we have to manually
    // set it.
    gridEntity.CollisionClass = GridCollisionClass.WALL;
  }

  return gridEntity;
}

/**
 * Helper function to spawn a Void Portal. This is more complicated than simply spawning a trapdoor
 * with the appropriate variant, as the game does not give it the correct sprite automatically.
 */
export function spawnVoidPortal(gridIndex: int): GridEntity | undefined {
  const voidPortal = spawnGridEntityWithVariant(
    GridEntityType.TRAPDOOR,
    TrapdoorVariant.VOID_PORTAL,
    gridIndex,
  );
  if (voidPortal === undefined) {
    return voidPortal;
  }

  // If Void Portals are not given a VarData of 1, they will send the player to the next floor
  // instead of The Void.
  voidPortal.VarData = 1;

  const sprite = voidPortal.GetSprite();
  sprite.Load("gfx/grid/voidtrapdoor.anm2", true);

  return voidPortal;
}
