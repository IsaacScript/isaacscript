import { GRID_ENTITY_XML_MAP } from "../maps/gridEntityXMLMap";
import { roomUpdateSafe } from "./rooms";

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
 * Helper function to get every grid entity in the current room. Use it with no arguments to get
 * every grid entity, or specify a variadic amount of arguments to match specific grid entity types.
 *
 * Example:
 * ```
 * for (const gridEntity of getGridEntities()) {
 *   print(gridEntity.GetType())
 * }
 * ```
 *
 * Example:
 * ```
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
  const game = Game();
  const room = game.GetRoom();
  const gridSize = room.GetGridSize();
  const gridEntityTypesSet = new Set(gridEntityTypes);

  const gridEntities: GridEntity[] = [];
  for (let gridIndex = 0; gridIndex < gridSize; gridIndex++) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity === undefined) {
      continue;
    }

    if (gridEntityTypes.length === 0) {
      gridEntities.push(gridEntity);
    } else {
      const thisGridEntityType = gridEntity.GetType();
      if (gridEntityTypesSet.has(thisGridEntityType)) {
        gridEntities.push(gridEntity);
      }
    }
  }

  return gridEntities;
}

export function getSurroundingGridEntities(
  gridEntity: GridEntity,
): GridEntity[] {
  const game = Game();
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
 * Helper function to see if all of the pressure plates in the current room are pushed. Returns true
 * if there are no pressure plates in the room.
 */
export function isAllPressurePlatesPushed(): boolean {
  const game = Game();
  const room = game.GetRoom();
  const hasPressurePlates = room.HasTriggerPressurePlates();

  if (!hasPressurePlates) {
    return true;
  }

  for (const gridEntity of getGridEntities(
    GridEntityType.GRID_PRESSURE_PLATE,
  )) {
    const gridEntityDesc = gridEntity.GetSaveState();
    if (gridEntityDesc.State !== PressurePlateState.PRESSURE_PLATE_PRESSED) {
      return false;
    }
  }

  return true;
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
 * ```
 * removeAllGridEntitiesExceptFor(
 *   GridEntityType.GRID_WALL,
 *   GridEntityType.GRID_DOOR,
 * );
 * ```
 */
export function removeAllGridEntitiesExceptFor(
  ...gridEntityTypes: GridEntityType[]
): void {
  const gridEntityTypeExceptions = new Set(gridEntityTypes);
  const gridEntities = getGridEntities();
  for (const gridEntity of gridEntities) {
    const gridEntityType = gridEntity.GetType();
    if (!gridEntityTypeExceptions.has(gridEntityType)) {
      removeGridEntity(gridEntity, false);
    }
  }

  roomUpdateSafe();
}

/**
 * Helper function to remove all of the grid entities in the room that match the grid entity types
 * provided.
 *
 * Example:
 * ```
 * removeAllMatchingGridEntities(
 *   GridEntityType.GRID_ROCK,
 *   GridEntityType.GRID_ROCKB,
 *   GridEntityType.GRID_ROCKT,
 * );
 * ```
 */
export function removeAllMatchingGridEntities(
  ...gridEntityType: GridEntityType[]
): void {
  const gridEntities = getGridEntities(...gridEntityType);
  for (const gridEntity of gridEntities) {
    removeGridEntity(gridEntity, false);
  }

  roomUpdateSafe();
}

/**
 * Helper function to remove a grid entity simply by providing the grid entity object.
 *
 * @param gridEntity The grid entity to remove.
 * @param updateRoom Optional. Whether or not to update the room after the grid entity is removed.
 * True by default. This is generally a good idea because if the room is not updated, you will be
 * unable to spawn another grid entity on the same tile until a frame has passed. However, doing
 * this is expensive, since it involves a call to `Isaac.GetRoomEntities()`, so set it to false if
 * you need to invoke this function multiple times.
 */
export function removeGridEntity(
  gridEntity: GridEntity,
  updateRoom = true,
): void {
  const game = Game();
  const room = game.GetRoom();

  const gridIndex = gridEntity.GetGridIndex();
  room.RemoveGridEntity(gridIndex, 0, false);

  if (updateRoom) {
    roomUpdateSafe();
  }
}

/**
 * Helper function to make a grid entity invisible. This is accomplished by setting its sprite to
 * "gfx/none.png" (a non-existent PNG file).
 *
 * Using this function will cause spurious errors in the "log.txt file". If you want to remove them,
 * create a transparent 1 pixel PNG file in your resources folder at "gfx/none.png".
 */
export function setGridEntityInvisible(gridEntity: GridEntity) {
  const sprite = gridEntity.GetSprite();
  sprite.ReplaceSpritesheet(0, "gfx/none.png");
  sprite.LoadGraphics();
}

export function spawnGiantPoop(topLeftGridIndex: int): void {
  const game = Game();
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

export function spawnGridEntity(
  gridEntityType: GridEntityType,
  gridIndex: int,
): GridEntity {
  return spawnGridEntityWithVariant(gridEntityType, 0, gridIndex);
}

export function spawnGridEntityWithVariant(
  gridEntityType: GridEntityType,
  variant: int,
  gridIndex: int,
): GridEntity {
  const game = Game();
  const room = game.GetRoom();
  const position = room.GetGridPosition(gridIndex);
  const gridEntity = Isaac.GridSpawn(gridEntityType, variant, position, true);

  // For some reason, spawned pits start with a collision class of COLLISION_NONE,
  // so we have to manually set it
  if (gridEntityType === GridEntityType.GRID_PIT) {
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      pit.UpdateCollision();
    }
  }

  return gridEntity;
}
