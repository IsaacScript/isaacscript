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

export function spawnGiantPoop(topLeftGridIndex: int): void {
  const game = Game();
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();
  const topRightGridIndex = topLeftGridIndex + 1;
  const bottomLeftGridIndex = topLeftGridIndex + gridWidth;
  const bottomRightGridIndex = bottomLeftGridIndex + 1;

  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopVariant.GIGA_TOP_LEFT,
    topLeftGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopVariant.GIGA_TOP_RIGHT,
    topRightGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopVariant.GIGA_BOTTOM_LEFT,
    bottomLeftGridIndex,
  );
  spawnGridEntityWithVariant(
    GridEntityType.GRID_POOP,
    PoopVariant.GIGA_BOTTOM_RIGHT,
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

  return Isaac.GridSpawn(gridEntityType, variant, position, true);
}
