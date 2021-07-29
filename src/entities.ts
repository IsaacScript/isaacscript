import { MAX_NUM_DOORS } from "./constants";
import { game } from "./game";

export function getDoors(): GridEntityDoor[] {
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
  const room = game.GetRoom();

  const gridEntities: GridEntity[] = [];
  for (let gridIndex = 0; gridIndex < room.GetGridSize(); gridIndex++) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== null) {
      gridEntities.push(gridEntity);
    }
  }

  return gridEntities;
}

/**
 * Helper function to get all the NPCs in the room. Due to bugs with `Isaac.FindInRadius()`,
 * this function uses `Isaac.GetRoomEntities()`, which is more expensive but also more robust.
 *
 * Example:
 * ```
 * // Remove all of the enemies in the room
 * for (const npc of getRoomNPCs()) {
 *   npc.Remove();
 * }
 * ```
 */
export function getRoomNPCs(): EntityNPC[] {
  const npcs: EntityNPC[] = [];
  for (const entity of Isaac.GetRoomEntities()) {
    const npc = entity.ToNPC();
    if (npc !== null) {
      npcs.push(npc);
    }
  }

  return npcs;
}
