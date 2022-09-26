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
  public override v = {
    room: {
      /** Indexed by grid entity pointer hash. */
      collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
        () => new Set(),
      ),
    },
  };

  private postGridEntityCollision: PostGridEntityCollision;
  private postGridEntityCustomCollision: PostGridEntityCustomCollision;
  private customGridEntities: CustomGridEntities;

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
  private postUpdate = (): void => {
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

          const gridEntityTypeCustom =
            this.customGridEntities.getCustomGridEntityType(gridEntity);
          if (gridEntityTypeCustom === undefined) {
            this.postGridEntityCollision.fire(gridEntity, entity);
          } else {
            this.postGridEntityCustomCollision.fire(
              gridEntity,
              gridEntityTypeCustom,
              entity,
            );
          }
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
