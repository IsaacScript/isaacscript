import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostProjectileUpdateFilter extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 44
      [ModCallback.POST_PROJECTILE_UPDATE, this.postProjectileUpdate],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_UPDATE (44)
  private readonly postProjectileUpdate = (projectile: EntityProjectile) => {
    this.fire(projectile);
  };
}
