import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "preventChildEntities";

const v = {
  room: {
    preventingEntities: new Set<PtrHash>(),
  },
};

export function preventChildEntitiesInit(mod: Mod): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_NPC_INIT, postNPCInit); // 27
}

// ModCallback.POST_NPC_INIT (27)
function postNPCInit(npc: EntityNPC) {
  const spawnerEntityMatch =
    npc.SpawnerEntity !== undefined &&
    v.room.preventingEntities.has(GetPtrHash(npc.SpawnerEntity));

  const parentMatch =
    npc.Parent !== undefined &&
    v.room.preventingEntities.has(GetPtrHash(npc.Parent));

  if (spawnerEntityMatch || parentMatch) {
    npc.Remove();
  }
}

/**
 * Helper function to prevent an entity from spawning any other entities. Meant to be used on NPCs
 * like Squirts. This behavior will only last for the current room.
 *
 * Under the hood, this function will remove any new NPCs spawned that have a `Entity.SpawnerEntity`
 * or `Entity.Parent` value that matches the provided entity. (They are removed during the
 * `POST_NPC_INIT` callback specifically.)
 */
export function preventChildEntities(entity: Entity): void {
  const ptrHash = GetPtrHash(entity);
  v.room.preventingEntities.add(ptrHash);
}
