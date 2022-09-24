// This provides the logic for the following callbacks:
// - `POST_GRID_ENTITY_COLLISION`
// - `POST_GRID_ENTITY_CUSTOM_COLLISION`

import { GridCollisionClass, ModCallback } from "isaac-typescript-definitions";
import {
  getCollidingEntitiesWithGridEntity,
  getGridEntities,
} from "../../../functions/gridEntities";
import { PostGridEntityCollision } from "../../callbacks/PostGridEntityCollision";
import { PostGridEntityCustomCollision } from "../../callbacks/PostGridEntityCustomCollision";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import { CustomGridEntities } from "./CustomGridEntities";

export class GridEntityCollisionDetection extends Feature {
  override v = {
    room: {
      /** Indexed by grid entity pointer hash. */
      collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
        () => new Set(),
      ),
    },
  };

  postGridEntityCollision: PostGridEntityCollision;
  postGridEntityCustomCollision: PostGridEntityCustomCollision;
  customGridEntities: CustomGridEntities;

  constructor(
    postGridEntityCollision: PostGridEntityCollision,
    postGridEntityCustomCollision: PostGridEntityCustomCollision,
    customGridEntities: CustomGridEntities,
  ) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];

    this.postGridEntityCollision = postGridEntityCollision;
    this.postGridEntityCustomCollision = postGridEntityCustomCollision;
    this.customGridEntities = customGridEntities;
  }

  // ModCallback.POST_UPDATE (1)
  postUpdate = (): void => {
    const gridEntities = getGridEntities();
    const gridEntitiesWithCollision = gridEntities.filter(
      (gridEntity) => gridEntity.CollisionClass !== GridCollisionClass.NONE,
    );
    for (const gridEntity of gridEntitiesWithCollision) {
      const gridEntityPtrHash = GetPtrHash(gridEntity);
      const oldCollidingEntities =
        this.v.room.collidingEntitiesMap.getAndSetDefault(gridEntityPtrHash);

      // Check for new colliding entities.
      const collidingEntities = getCollidingEntitiesWithGridEntity(gridEntity);
      for (const entity of collidingEntities) {
        const entityPtrHash = GetPtrHash(entity);
        if (!oldCollidingEntities.has(entityPtrHash)) {
          oldCollidingEntities.add(entityPtrHash);
          this.postGridEntityCollision.fire(gridEntity, entity);
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
  };
}
