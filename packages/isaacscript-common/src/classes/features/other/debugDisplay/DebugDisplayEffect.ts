import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayEffect extends Feature {
  public textCallback: (effect: EntityEffect) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 56
      [ModCallback.POST_EFFECT_RENDER, this.postEffectRender],
    ];
  }

  // ModCallback.POST_EFFECT_RENDER (56)
  private readonly postEffectRender = (effect: EntityEffect) => {
    const text = this.textCallback(effect);
    renderTextOnEntity(effect, text);
  };
}
