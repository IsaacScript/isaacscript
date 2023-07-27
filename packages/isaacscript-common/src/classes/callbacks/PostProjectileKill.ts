import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostProjectileKill extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_KILL> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 44
      [ModCallback.POST_PROJECTILE_UPDATE, this.postProjectileUpdate],

      // 46
      [ModCallback.PRE_PROJECTILE_COLLISION, this.preProjectileCollision],

      // 67
      [ModCallback.POST_ENTITY_REMOVE, this.postEntityRemove],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_UPDATE (44)
  private readonly postProjectileUpdate = (projectile: EntityProjectile) => {
    const ptrHash = GetPtrHash(projectile);

    if (projectile.CollidesWithGrid() || projectile.IsDead()) {
      v.room.firedSet.add(ptrHash);
    }
  };

  // ModCallback.PRE_PROJECTILE_COLLISION (46)
  private readonly preProjectileCollision = (
    projectile: EntityProjectile,
  ): boolean | undefined => {
    const ptrHash = GetPtrHash(projectile);
    v.room.firedSet.add(ptrHash);

    return undefined;
  };

  // ModCallback.POST_ENTITY_REMOVE (67)
  private readonly postEntityRemove = (entity: Entity): void => {
    const projectile = entity.ToProjectile();

    if (projectile === undefined) {
      return;
    }

    const ptrHash = GetPtrHash(projectile);

    if (v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(projectile);
    }
  };
}
