import { GridCollisionClass, ModCallback } from "isaac-typescript-definitions";
import {
  getCollidingEntitiesWithGridEntity,
  getGridEntities,
} from "../../../functions/gridEntities";
import { DefaultMap } from "../../DefaultMap";
import type { PostGridEntityCollision } from "../../callbacks/PostGridEntityCollision";
import type { PostGridEntityCustomCollision } from "../../callbacks/PostGridEntityCustomCollision";
import { Feature } from "../../private/Feature";
import type { CustomGridEntities } from "./CustomGridEntities";

const v = {
  room: {
    /** Indexed by grid entity pointer hash. */
    collidingEntitiesMap: new DefaultMap<PtrHash, Set<PtrHash>>(
      () => new Set(),
    ),
  },
};

export class GridEntityCollisionDetection extends Feature {
  public override v = v;

  private readonly postGridEntityCollision: PostGridEntityCollision;
  private readonly postGridEntityCustomCollision: PostGridEntityCustomCollision;
  private readonly customGridEntities: CustomGridEntities;

  constructor(
    postGridEntityCollision: PostGridEntityCollision,
    postGridEntityCustomCollision: PostGridEntityCustomCollision,
    customGridEntities: CustomGridEntities,
  ) {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];

    this.postGridEntityCollision = postGridEntityCollision;
    this.postGridEntityCustomCollision = postGridEntityCustomCollision;
    this.customGridEntities = customGridEntities;
  }

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
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
      for (const oldCollidingEntityPtrHash of oldCollidingEntities) {
        if (!collidingEntitiesPtrHashSet.has(oldCollidingEntityPtrHash)) {
          oldCollidingEntities.delete(oldCollidingEntityPtrHash);
        }
      }
    }
  };
}
