import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreTearCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_TEAR_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 42
      [ModCallback.PRE_TEAR_COLLISION, this.preTearCollision],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.PRE_TEAR_COLLISION (42)
  private readonly preTearCollision = (
    tear: EntityTear,
    collider: Entity,
    low: boolean,
  ): boolean | undefined => this.fire(tear, collider, low);
}
