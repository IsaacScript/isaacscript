import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackProjectile } from "./validation/CustomCallbackProjectile";

export class PostProjectileInitLate extends CustomCallbackProjectile<ModCallbackCustom2.POST_PROJECTILE_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PROJECTILE_UPDATE, [this.postProjectileUpdate]], // 44
    ];
  }

  // ModCallback.POST_PROJECTILE_UPDATE (44)
  private postProjectileUpdate = (projectile: EntityProjectile): void => {
    const ptrHash = GetPtrHash(projectile);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(projectile);
    }
  };
}
