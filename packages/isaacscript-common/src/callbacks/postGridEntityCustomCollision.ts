import { GridCollisionClass, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { getCustomGridEntities } from "../features/customGridEntity";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getCollidingEntitiesWithGridEntity } from "../functions/gridEntities";
import {
  postGridEntityCustomCollisionFire,
  postGridEntityCustomCollisionHasSubscriptions,
} from "./subscriptions/postGridEntityCustomCollision";

const v = {
  room: {
    /** Indexed by grid entity pointer hash. */
    collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
      () => new Set(),
    ),
  },
};

/** @internal */
export function postGridEntityCustomCollisionInit(mod: ModUpgraded): void {
  saveDataManager("postGridEntityCustomCollisionInit", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postGridEntityCustomCollisionHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const customGridEntities = getCustomGridEntities();
  for (const [gridEntity, data] of customGridEntities) {
    if (gridEntity.CollisionClass === GridCollisionClass.NONE) {
      continue;
    }

    // The following code is copied from the `POST_GRID_ENTITY_COLLISION` callback.
    const gridEntityPtrHash = GetPtrHash(gridEntity);
    const oldCollidingEntities =
      v.room.collidingEntitiesMap.getAndSetDefault(gridEntityPtrHash);

    // Check for new colliding entities.
    const collidingEntities = getCollidingEntitiesWithGridEntity(gridEntity);
    for (const entity of collidingEntities) {
      const entityPtrHash = GetPtrHash(entity);
      if (!oldCollidingEntities.has(entityPtrHash)) {
        oldCollidingEntities.add(entityPtrHash);
        postGridEntityCustomCollisionFire(
          gridEntity,
          data.gridEntityTypeCustom,
          entity,
        );
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
