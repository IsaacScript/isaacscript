import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreFamiliarCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_FAMILIAR_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 26
      [ModCallback.PRE_FAMILIAR_COLLISION, this.preFamiliarCollision],
    ];
  }

  protected override shouldFire = shouldFireFamiliar;

  // ModCallback.PRE_FAMILIAR_COLLISION (26)
  private readonly preFamiliarCollision = (
    familiar: EntityFamiliar,
    collider: Entity,
    low: boolean,
  ): boolean | undefined => this.fire(familiar, collider, low);
}
