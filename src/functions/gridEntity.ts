const SURROUNDING_GRID_INDEXES_DELTA = [
  -16, // Above-left
  -15, // Above
  -14, // Above-right
  -1, // Left
  1, // Right
  14, // Below-left
  15, // Below
  16, // Below-right
];

export function getGridEntities(gridEntityType?: GridEntityType): GridEntity[] {
  const game = Game();
  const room = game.GetRoom();
  const gridSize = room.GetGridSize();

  const gridEntities: GridEntity[] = [];
  for (let gridIndex = 0; gridIndex < gridSize; gridIndex++) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity === undefined) {
      continue;
    }

    if (gridEntityType === undefined) {
      gridEntities.push(gridEntity);
    } else {
      const thisGridEntityType = gridEntity.GetType();
      if (thisGridEntityType === gridEntityType) {
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
  const gridIndex = gridEntity.GetGridIndex();

  const surroundingGridEntities: GridEntity[] = [];
  for (const delta of SURROUNDING_GRID_INDEXES_DELTA) {
    const surroundingGridIndex = gridIndex + delta;
    const surroundingGridEntity = room.GetGridEntity(surroundingGridIndex);
    if (surroundingGridEntity !== undefined) {
      surroundingGridEntities.push(surroundingGridEntity);
    }
  }

  return surroundingGridEntities;
}
