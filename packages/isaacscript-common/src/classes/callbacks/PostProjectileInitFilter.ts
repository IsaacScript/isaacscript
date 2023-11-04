import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostProjectileInitFilter extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_INIT_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 43
      [ModCallback.POST_PROJECTILE_INIT, this.postProjectileInit],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_INIT (43)
  private readonly postProjectileInit = (projectile: EntityProjectile) => {
    this.fire(projectile);
  };
}
