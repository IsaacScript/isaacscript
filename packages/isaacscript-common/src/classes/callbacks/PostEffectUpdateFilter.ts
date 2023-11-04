import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEffect } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEffectUpdateFilter extends CustomCallback<ModCallbackCustom.POST_EFFECT_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 55
      [ModCallback.POST_EFFECT_UPDATE, this.postEffectUpdate],
    ];
  }

  protected override shouldFire = shouldFireEffect;

  // ModCallback.POST_EFFECT_UPDATE (55)
  private readonly postEffectUpdate = (effect: EntityEffect) => {
    this.fire(effect);
  };
}
