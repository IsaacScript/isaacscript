import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayEffect extends Feature {
  public textCallback: (effect: EntityEffect) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_EFFECT_RENDER, [this.postEffectRender]], // 56
    ];
  }

  // ModCallback.POST_EFFECT_RENDER (56)
  private postEffectRender = (effect: EntityEffect) => {
    const text = this.textCallback(effect);
    renderTextOnEntity(effect, text);
  };
}
