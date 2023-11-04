import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostTearKill extends CustomCallback<ModCallbackCustom.POST_TEAR_KILL> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 40
      [ModCallback.POST_TEAR_UPDATE, this.postTearUpdate],

      // 42
      [ModCallback.PRE_TEAR_COLLISION, this.preTearCollision],

      // 67
      [ModCallback.POST_ENTITY_REMOVE, this.postEntityRemove],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.POST_PROJECTILE_UPDATE (40)
  private readonly postTearUpdate = (tear: EntityTear) => {
    const ptrHash = GetPtrHash(tear);

    if (tear.CollidesWithGrid() || tear.IsDead()) {
      v.room.firedSet.add(ptrHash);
    }
  };

  // ModCallback.PRE_TEAR_COLLISION (42)
  private readonly preTearCollision = (
    tear: EntityTear,
  ): boolean | undefined => {
    const ptrHash = GetPtrHash(tear);
    v.room.firedSet.add(ptrHash);

    return undefined;
  };

  // ModCallback.POST_ENTITY_REMOVE (67)
  private readonly postEntityRemove = (entity: Entity): void => {
    const tear = entity.ToTear();

    if (tear === undefined) {
      return;
    }

    const ptrHash = GetPtrHash(tear);

    if (v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(tear);
    }
  };
}
