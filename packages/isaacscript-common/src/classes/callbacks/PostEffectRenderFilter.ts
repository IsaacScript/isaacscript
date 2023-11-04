import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEffect } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEffectRenderFilter extends CustomCallback<ModCallbackCustom.POST_EFFECT_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 56
      [ModCallback.POST_EFFECT_RENDER, this.postEffectRender],
    ];
  }

  protected override shouldFire = shouldFireEffect;

  // ModCallback.POST_EFFECT_RENDER (56)
  private readonly postEffectRender = (
    effect: EntityEffect,
    renderOffset: Vector,
  ) => {
    this.fire(effect, renderOffset);
  };
}
