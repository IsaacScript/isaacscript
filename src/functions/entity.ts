import { GLITCHED_ITEM_THRESHOLD } from "../constants";

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

/**
 * Returns whether or not the given collectible is a "glitched" item. All items are replaced by
 * glitched items once a player has TMTRAINER. However, glitched items can also "naturally" appear
 * in secret rooms and I AM ERROR rooms if the "Corrupted Data" achievement is unlocked.
 */
export function isGlitchedCollectible(entity: Entity): boolean {
  return (
    entity.Type === EntityType.ENTITY_PICKUP &&
    entity.Variant === PickupVariant.PICKUP_COLLECTIBLE &&
    entity.SubType > GLITCHED_ITEM_THRESHOLD
  );
}
