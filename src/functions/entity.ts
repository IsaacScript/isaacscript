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
