import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostProjectileInitLate extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 44
      [ModCallback.POST_PROJECTILE_UPDATE, this.postProjectileUpdate],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_UPDATE (44)
  private readonly postProjectileUpdate = (
    projectile: EntityProjectile,
  ): void => {
    const ptrHash = GetPtrHash(projectile);
    if (!v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(projectile);
    }
  };
}
