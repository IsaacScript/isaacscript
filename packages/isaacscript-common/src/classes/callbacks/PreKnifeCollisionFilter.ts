import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreKnifeCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_KNIFE_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 53
      [ModCallback.PRE_KNIFE_COLLISION, this.preKnifeCollision],
    ];
  }

  protected override shouldFire = shouldFireKnife;

  // ModCallback.PRE_KNIFE_COLLISION (53)
  private readonly preKnifeCollision = (
    knife: EntityKnife,
    collider: Entity,
    low: boolean,
  ): boolean | undefined => this.fire(knife, collider, low);
}
