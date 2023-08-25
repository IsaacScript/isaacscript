import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

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
