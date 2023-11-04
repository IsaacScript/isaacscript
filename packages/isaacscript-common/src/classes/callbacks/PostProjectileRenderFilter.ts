import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostProjectileRenderFilter extends CustomCallback<ModCallbackCustom.POST_PROJECTILE_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 45
      [ModCallback.POST_PROJECTILE_RENDER, this.postProjectileRender],
    ];
  }

  protected override shouldFire = shouldFireProjectile;

  // ModCallback.POST_PROJECTILE_RENDER (45)
  private readonly postProjectileRender = (
    projectile: EntityProjectile,
    renderOffset: Vector,
  ) => {
    this.fire(projectile, renderOffset);
  };
}
