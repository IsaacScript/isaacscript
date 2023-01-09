import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostProjectileInitLate extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 44
      [ModCallback.POST_PROJECTILE_UPDATE, [this.postProjectileUpdate]],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_UPDATE (44)
  private postProjectileUpdate = (projectile: EntityProjectile): void => {
    const ptrHash = GetPtrHash(projectile);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(projectile);
    }
  };
}
