import { GridCollisionClass, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
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
    collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
      () => new Set(),
    ),
  },
};

/** @internal */
export function postGridEntityCollisionInit(mod: Mod): void {
  saveDataManager("postGridEntityCollision", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postGridEntityCollisionHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const gridEntities = getGridEntities();
  const gridEntitiesWithCollision = gridEntities.filter(
    (gridEntity) => gridEntity.CollisionClass !== GridCollisionClass.NONE,
  );
  for (const gridEntity of gridEntitiesWithCollision) {
    const gridEntityPtrHash = GetPtrHash(gridEntity);
    const oldCollidingEntities =
      v.room.collidingEntitiesMap.getAndSetDefault(gridEntityPtrHash);

    // Check for new colliding entities.
    const collidingEntities = getCollidingEntitiesWithGridEntity(gridEntity);
    for (const entity of collidingEntities) {
      const entityPtrHash = GetPtrHash(entity);
      if (!oldCollidingEntities.has(entityPtrHash)) {
        oldCollidingEntities.add(entityPtrHash);
        postGridEntityCollisionFire(gridEntity, entity);
      }
    }

    // Remove old colliding entities.
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
