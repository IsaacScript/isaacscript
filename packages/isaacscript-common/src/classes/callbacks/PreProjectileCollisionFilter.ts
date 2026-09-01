import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireProjectile } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreProjectileCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_PROJECTILE_COLLISION_FILTER> {
  // ModCallback.PRE_PROJECTILE_COLLISION (46)
  private readonly preProjectileCollision = (
    projectile: EntityProjectile,
    collider: Entity,
    low: boolean,
  ): boolean | undefined => this.fire(projectile, collider, low);

  protected override shouldFire = shouldFireProjectile;

  constructor() {
    super();

    this.callbacksUsed = [
      // 46
      [ModCallback.PRE_PROJECTILE_COLLISION, this.preProjectileCollision],
    ];
  }
}
