import { game } from "../cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../constants";
import { GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP } from "../maps/gridEntityTypeToBrokenStateMap";
import { GRID_ENTITY_XML_MAP } from "../maps/gridEntityXMLMap";
import {
  DEFAULT_TOP_LEFT_WALL_GRID_INDEX,
  ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP,
} from "../maps/roomShapeToTopLeftWallGridIndexMap";
import { isCircleIntersectingRectangle, range } from "./math";
import { roomUpdateSafe } from "./rooms";
import { clearSprite } from "./sprite";

const BREAKABLE_GRID_ENTITY_TYPES_BY_EXPLOSIONS: ReadonlySet<GridEntityType> =
  new Set([
    GridEntityType.GRID_ROCK, // 2
    GridEntityType.GRID_ROCKT, // 4
    GridEntityType.GRID_ROCK_BOMB, // 5
    GridEntityType.GRID_ROCK_ALT, // 6
    GridEntityType.GRID_SPIDERWEB, // 10
    GridEntityType.GRID_TNT, // 12

    // GridEntityType.GRID_FIREPLACE (13) does not count since it is turned into a non-grid entity
    // upon spawning

    GridEntityType.GRID_POOP, // 14
    GridEntityType.GRID_ROCK_SS, // 22
    GridEntityType.GRID_ROCK_SPIKED, // 25
    GridEntityType.GRID_ROCK_ALT2, // 26
    GridEntityType.GRID_ROCK_GOLD, // 27
  ]);

const BREAKABLE_GRID_ENTITY_TYPES_VARIANTS_BY_EXPLOSIONS: ReadonlySet<string> =
  new Set([`${GridEntityType.GRID_STATUE}.${StatueVariant.ANGEL}`]);

/**
 * Helper function to convert the grid entity type found in a room XML file to the corresponding
 * grid entity type and variant normally used by the game. For example, a rock is represented as
 * 1000.0 in a room XML file, but `GridEntityType.GRID_ROCK` is equal to 2.
 */
export function convertXMLGridEntityType(
  gridEntityXMLType: int,
  gridEntityXMLVariant: int,
): [int, int] | undefined {
  // Triggers are bugged; spawning one will immediately crash the game
  if (gridEntityXMLType === EntityType.ENTITY_TRIGGER_OUTPUT) {
    return undefined;
  }

  const gridEntityArray = GRID_ENTITY_XML_MAP.get(gridEntityXMLType);
  if (gridEntityArray === undefined) {
    error(
      `Failed to find an entry in the grid entity map for XML entity type: ${gridEntityXMLType}`,
    );
  }
  const gridEntityType = gridEntityArray[0];
  let gridEntityVariant = gridEntityArray[1];

  // For some specific grid entities, the variant defined in the XML is what is used by the actual
  // game (which is not the case for e.g. poops)
  if (
    gridEntityType === GridEntityType.GRID_SPIKES_ONOFF || // 9
    gridEntityType === GridEntityType.GRID_PRESSURE_PLATE || // 20
    gridEntityType === GridEntityType.GRID_TELEPORTER // 23
  ) {
    gridEntityVariant = gridEntityXMLVariant;
  }

  return [gridEntityType, gridEntityVariant];
}

/**
 * Gets the entities that have a hitbox that overlaps with any part of the square that the grid
 * entity is on.
 *
 * Note that this function will not work properly in the PostNewRoom callback, since entities do not
 * have collision yet in that callback.
 */
export function getCollidingEntitiesWithGridEntity(
  gridEntity: GridEntity,
): Entity[] {
  const gridEntityCollisionTopLeft = Vector(
    gridEntity.Position.X - DISTANCE_OF_GRID_TILE / 2,
    gridEntity.Position.Y - DISTANCE_OF_GRID_TILE / 2,
  );

  const gridEntityCollisionBottomRight = Vector(
    gridEntity.Position.X + DISTANCE_OF_GRID_TILE / 2,
    gridEntity.Position.Y + DISTANCE_OF_GRID_TILE / 2,
  );

  const closeEntities = Isaac.FindInRadius(
    gridEntity.Position,
    DISTANCE_OF_GRID_TILE * 2,
  );

  return closeEntities.filter(
    (entity) =>
      entity.CollidesWithGrid() &&
      isCircleIntersectingRectangle(
        entity.Position,
        // We arbitrarily add 0.1 to account for entities that are already pushed back by the time the
        // PostUpdate callback fires
        entity.Size + 0.1,
        gridEntityCollisionTopLeft,
        gridEntityCollisionBottomRight,
      ),
  );
}

/**
 * Helper function to get every grid entity in the current room.
 *
 * Use this function with no arguments to get every grid entity, or specify a variadic amount of
 * arguments to match specific grid entity types.
 *
 * Example:
 * ```ts
 * for (const gridEntity of getGridEntities()) {
 *   print(gridEntity.GetType())
 * }
 * ```
 *
 * Example:
 * ```ts
 * const rocks = getGridEntities(
 *   GridEntityType.GRID_ROCK,
 *   GridEntityType.GRID_ROCKB,
 *   GridEntityType.GRID_ROCKT,
 * );
 * ```
 */
export function getGridEntities(
  ...gridEntityTypes: GridEntityType[]
): GridEntity[] {
  const gridEntities = getAllGridEntities();

  if (gridEntityTypes.length === 0) {
    return gridEntities;
  }

  const gridEntityTypesSet = new Set(gridEntityTypes);
  return gridEntities.filter((gridEntity) => {
    const gridEntityType = gridEntity.GetType();
    return gridEntityTypesSet.has(gridEntityType);
  });
}

function getAllGridEntities(): GridEntity[] {
  const room = game.GetRoom();
  const gridSize = room.GetGridSize();

  const gridEntities: GridEntity[] = [];
  for (const gridIndex of range(gridSize - 1)) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      gridEntities.push(gridEntity);
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

export function getTopLeftWall(): GridEntity | undefined {
  const room = game.GetRoom();
  const topLeftWallGridIndex = getTopLeftWallGridIndex();
  return room.GetGridEntity(topLeftWallGridIndex);
}

/**
 * Helper function to get the grid index of the top left wall.
 * (This will depend on what the current room shape is.)
 */
export function getTopLeftWallGridIndex(): int {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  const topLeftWallGridIndex =
    ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP.get(roomShape);
  return topLeftWallGridIndex === undefined
    ? DEFAULT_TOP_LEFT_WALL_GRID_INDEX
    : topLeftWallGridIndex;
}

/**
 * Helper function to determine if all of the pressure plates in the current room are pushed.
 * Returns true if there are no pressure plates in the room.
 */
export function isAllPressurePlatesPushed(): boolean {
  const room = game.GetRoom();
  const hasPressurePlates = room.HasTriggerPressurePlates();

  if (!hasPressurePlates) {
    return true;
  }

  const pressurePlates = getGridEntities(GridEntityType.GRID_PRESSURE_PLATE);
  return pressurePlates.every(
    (pressurePlate) =>
      pressurePlate.State === PressurePlateState.PRESSURE_PLATE_PRESSED,
  );
}

export function isGridEntityBreakableByExplosion(
  gridEntity: GridEntity,
): boolean {
  const gridEntityType = gridEntity.GetType();
  const gridEntityVariant = gridEntity.GetVariant();
  const gridEntityTypeVariant = `${gridEntityType}.${gridEntityVariant}`;

  return (
    BREAKABLE_GRID_ENTITY_TYPES_BY_EXPLOSIONS.has(gridEntityType) ||
    BREAKABLE_GRID_ENTITY_TYPES_VARIANTS_BY_EXPLOSIONS.has(
      gridEntityTypeVariant,
    )
  );
}

/**
 * Helper function to see if the provided gridEntity is in its respective broken state. See the
 * `GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP` constant for more details.
 *
 * Note that in the case of `GridEntityType.GRID_LOCK` (11), the state will turn to being broken
 * before the actual collision for the entity is removed.
 */
export function isGridEntityBroken(gridEntity: GridEntity): boolean {
  const gridEntityType = gridEntity.GetType();
  const brokenState = GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP.get(gridEntityType);
  return gridEntity.State === brokenState;
}

/**
 * Helper function to detect whether a given Void Portal is one that randomly spawns after a boss is
 * defeated or is one that naturally spawns in the room after Hush. (This is determined by looking
 * at the VarData of the entity.)
 */
export function isPostBossVoidPortal(gridEntity: GridEntity): boolean {
  // The VarData of Void Portals that are spawned after bosses will be equal to 1
  // The VarData of the Void Portal in the room after Hush is equal to 0
  const saveState = gridEntity.GetSaveState();
  return saveState.VarData === 1;
}

/**
 * Helper function to all grid entities in the room except for ones matching the grid entity types
 * provided.
 *
 * Example:
 * ```ts
 * removeAllGridEntitiesExceptFor(
 *   GridEntityType.GRID_WALL,
 *   GridEntityType.GRID_DOOR,
 * );
 * ```
 *
 * @returns True if one or more grid entities were removed, false otherwise.
 */
export function removeAllGridEntitiesExceptFor(
  ...gridEntityTypes: GridEntityType[]
): boolean {
  const gridEntityTypeExceptions = new Set(gridEntityTypes);
  const gridEntities = getGridEntities();
  let removedOneOrMoreGridEntities = false;
  for (const gridEntity of gridEntities) {
    const gridEntityType = gridEntity.GetType();
    if (!gridEntityTypeExceptions.has(gridEntityType)) {
      removeGridEntity(gridEntity, false);
      removedOneOrMoreGridEntities = true;
    }
  }

  if (removedOneOrMoreGridEntities) {
    roomUpdateSafe();
  }

  return removedOneOrMoreGridEntities;
}

/**
 * Helper function to remove all of the grid entities in the room that match the grid entity types
 * provided.
 *
 * Example:
 * ```ts
 * removeAllMatchingGridEntities(
 *   GridEntityType.GRID_ROCK,
 *   GridEntityType.GRID_ROCKB,
 *   GridEntityType.GRID_ROCKT,
 * );
 * ```
 *
 * @returns True if one or more grid entities were removed, false otherwise.
 */
export function removeAllMatchingGridEntities(
  ...gridEntityType: GridEntityType[]
): boolean {
  const gridEntities = getGridEntities(...gridEntityType);
  if (gridEntities.length === 0) {
    return false;
  }

  for (const gridEntity of gridEntities) {
    removeGridEntity(gridEntity, false);
  }

  roomUpdateSafe();
  return true;
}

/**
 * Helper function to remove a grid entity simply by providing the grid entity object.
 *
 * @param gridEntity The grid entity to remove.
 * @param updateRoom Optional. Whether or not to update the room after the grid entity is removed.
 * Default is true. This is generally a good idea because if the room is not updated, you will be
 * unable to spawn another grid entity on the same tile until a frame has passed. However, doing
 * this is expensive, since it involves a call to `Isaac.GetRoomEntities`, so set it to false if you
 * need to invoke this function multiple times.
 */
export function removeGridEntity(
  gridEntity: GridEntity,
  updateRoom = true,
): void {
  const room = game.GetRoom();

  const gridIndex = gridEntity.GetGridIndex();
  room.RemoveGridEntity(gridIndex, 0, false);

  if (updateRoom) {
    roomUpdateSafe();
  }
}

/**
 * Helper function to make a grid entity invisible. This is accomplished by setting its sprite to
 * an empty/missing PNG file.
 *
 * For more information, see the documentation for the `clearSprite` helper function.
 */
export function setGridEntityInvisible(gridEntity: GridEntity): void {
  const sprite = gridEntity.GetSprite();
  clearSprite(sprite);
}

/**
 * Helper function to spawn a giant poop. This is performed by spawning each of the four quadrant
 * grid entities in the appropriate positions.
 */
export function spawnGiantPoop(topLeftGridIndex: int): void {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  const topRightGridIndex = topLeftGridIndex + 1;
  const bottomLeftGridIndex = topLeftGridIndex + gridWidth;
  const bottomRightGridIndex = bottomLeftGridIndex + 1;

  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopGridEntityVariant.GIGA_TOP_LEFT,
    topLeftGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopGridEntityVariant.GIGA_TOP_RIGHT,
    topRightGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopGridEntityVariant.GIGA_BOTTOM_LEFT,
    bottomLeftGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopGridEntityVariant.GIGA_BOTTOM_RIGHT,
    bottomRightGridIndex,
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
 * - allows you to specify the grid index instead of the position
 */
export function spawnGridEntity(
  gridEntityType: GridEntityType,
  gridIndex: int,
): GridEntity | undefined {
  return spawnGridEntityWithVariant(gridEntityType, 0, gridIndex);
}

/**
 * Helper function to spawn a grid entity with a specific variant.
 *
 * Use this instead of the `Isaac.GridSpawn` method since it:
 * - handles giving pits collision
 * - removes existing grid entities on the same tile, if any
 * - allows you to specify the grid index instead of the position
 */
export function spawnGridEntityWithVariant(
  gridEntityType: GridEntityType,
  variant: int,
  gridIndex: int,
): GridEntity | undefined {
  const room = game.GetRoom();

  const existingGridEntity = room.GetGridEntity(gridIndex);
  if (existingGridEntity !== undefined) {
    removeGridEntity(existingGridEntity);
  }

  const position = room.GetGridPosition(gridIndex);
  const gridEntity = Isaac.GridSpawn(gridEntityType, variant, position, true);
  if (gridEntity === undefined) {
    return gridEntity;
  }

  if (gridEntityType === GridEntityType.GRID_PIT) {
    // For some reason, spawned pits start with a collision class of COLLISION_NONE,
    // so we have to manually set it
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      pit.UpdateCollision();
    }
  } else if (gridEntityType === GridEntityType.GRID_WALL) {
    // For some reason, spawned walls start with a collision class of COLLISION_NONE,
    // so we have to manually set it
    gridEntity.CollisionClass = GridCollisionClass.COLLISION_WALL;
  }

  return gridEntity;
}

/**
 * Helper function to spawn a Void Portal. This is more complicated than simply spawning a trapdoor
 * with the appropriate variant, as the game does not give it the correct sprite automatically.
 */
export function spawnVoidPortal(gridIndex: int): GridEntity | undefined {
  const voidPortal = spawnGridEntityWithVariant(
    GridEntityType.GRID_TRAPDOOR,
    TrapdoorVariant.VOID_PORTAL,
    gridIndex,
  );
  if (voidPortal === undefined) {
    return voidPortal;
  }

  // If Void Portals are not given a VarData of 1, they will send the player to the next floor
  // instead of The Void
  voidPortal.VarData = 1;

  const sprite = voidPortal.GetSprite();
  sprite.Load("gfx/grid/voidtrapdoor.anm2", true);

  return voidPortal;
}
