import { saveDataManager } from "../features/saveDataManager/exports";
import {
  getCollidingEntitiesWithGridEntity,
  getGridEntities,
} from "../functions/gridEntity";
import { DefaultMap } from "../types/DefaultMap";
import {
  postGridEntityCollisionFire,
  postGridEntityCollisionHasSubscriptions,
} from "./subscriptions/postGridEntityCollision";

const v = {
  room: {
    /** Indexed by grid entity pointer hash. */
    collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
      () => new Set(),
    ),
  },
};

/** @internal */
export function postGridEntityCollisionInit(mod: Mod): void {
  saveDataManager("postGridEntityCollision", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postGridEntityCollisionHasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    if (gridEntity.CollisionClass === GridCollisionClass.COLLISION_NONE) {
      continue;
    }

    const gridEntityPtrHash = GetPtrHash(gridEntity);
    const oldCollidingEntities =
      v.room.collidingEntitiesMap.getAndSetDefault(gridEntityPtrHash);

    // Check for new colliding entities
    const collidingEntities = getCollidingEntitiesWithGridEntity(gridEntity);
    for (const entity of collidingEntities) {
      const entityPtrHash = GetPtrHash(entity);
      if (!oldCollidingEntities.has(entityPtrHash)) {
        oldCollidingEntities.add(entityPtrHash);
        postGridEntityCollisionFire(gridEntity, entity);
      }
    }

    // Remove old colliding entities
    const collidingEntitiesPtrHashes = collidingEntities.map((entity) =>
      GetPtrHash(entity),
    );
    const collidingEntitiesPtrHashSet = new Set(collidingEntitiesPtrHashes);
    for (const oldCollidingEntityPtrHash of oldCollidingEntities.values()) {
      if (!collidingEntitiesPtrHashSet.has(oldCollidingEntityPtrHash)) {
        oldCollidingEntities.delete(oldCollidingEntityPtrHash);
      }
    }
  }
}
