import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEffect } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEffectInitFilter extends CustomCallback<ModCallbackCustom.POST_EFFECT_INIT_FILTER> {
  // ModCallback.POST_EFFECT_INIT (54)
  private readonly postEffectInit = (effect: EntityEffect) => {
    this.fire(effect);
  };

  protected override shouldFire = shouldFireEffect;

  constructor() {
    super();

    this.callbacksUsed = [
      // 54
      [ModCallback.POST_EFFECT_INIT, this.postEffectInit],
    ];
  }
}
