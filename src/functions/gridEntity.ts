import { MAX_NUM_DOORS, SURROUNDING_GRID_INDEXES_DELTA } from "../constants";

export function getDoors(): GridEntityDoor[] {
  const game = Game();
  const room = game.GetRoom();

  const doors: GridEntityDoor[] = [];
  for (let i = 0; i < MAX_NUM_DOORS; i++) {
    const door = room.GetDoor(i);
    if (door !== null) {
      doors.push(door);
    }
  }

  return doors;
}

export function getGridEntities(): GridEntity[] {
  const game = Game();
  const room = game.GetRoom();
  const gridSize = room.GetGridSize();

  const gridEntities: GridEntity[] = [];
  for (let gridIndex = 0; gridIndex < gridSize; gridIndex++) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== null) {
      gridEntities.push(gridEntity);
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
    if (surroundingGridEntity !== null) {
      surroundingGridEntities.push(surroundingGridEntity);
    }
  }

  return surroundingGridEntities;
}

export function isHiddenSecretRoomDoor(door: GridEntityDoor): boolean {
  const sprite = door.GetSprite();
  const animation = sprite.GetAnimation();

  return isSecretRoomDoor(door) && animation === "Hidden";
}

export function isSecretRoomDoor(door: GridEntityDoor): boolean {
  const sprite = door.GetSprite();
  const filename = sprite.GetFilename();

  return filename === "gfx/grid/Door_08_HoleInWall.anm2";
}

export function openAllDoors(): void {
  for (const door of getDoors()) {
    // If we try to open a hidden Secret Room door (or Super Secret Room door),
    // then nothing will happen
    door.Open();
  }
}
