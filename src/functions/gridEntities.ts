import { MAX_NUM_DOORS } from "../constants";

/**
 * @category Grid Entities
 */
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

/**
 * @category Grid Entities
 */
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

/**
 * @category Grid Entities
 */
export function openAllDoors(): void {
  for (const door of getDoors()) {
    // If we try to open a hidden secret room door (or super secret room door),
    // then nothing will happen
    door.Open();
  }
}
