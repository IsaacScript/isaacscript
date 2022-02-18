import { saveDataManager } from "../features/saveDataManager/exports";
import {
  getCollidingEntitiesWithGridEntity,
  getGridEntities,
} from "../functions/gridEntity";
import {
  postGridEntityCollisionFire,
  postGridEntityCollisionHasSubscriptions,
} from "./subscriptions/postGridEntityCollision";

const v = {
  room: {
    /** Indexed by grid entity pointer hash. */
    collidingEntitiesMap: new Map<PtrHash, Set<PtrHash>>(),
  },
};

/** @internal */
export function postGridEntityCollisionInit(mod: Mod): void {
  saveDataManager("postGridEntity", v, hasSubscriptions);

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

    let oldCollidingEntities =
      v.room.collidingEntitiesMap.get(gridEntityPtrHash);
    if (oldCollidingEntities === undefined) {
      oldCollidingEntities = new Set();
      v.room.collidingEntitiesMap.set(gridEntityPtrHash, oldCollidingEntities);
    }

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
