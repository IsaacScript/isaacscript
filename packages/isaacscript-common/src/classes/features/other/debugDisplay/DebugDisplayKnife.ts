import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayKnife extends Feature {
  public textCallback: (knife: EntityKnife) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 52
      [ModCallback.POST_KNIFE_RENDER, [this.postKnifeRender]],
    ];
  }

  // ModCallback.POST_KNIFE_RENDER (52)
  private postKnifeRender = (knife: EntityKnife) => {
    const text = this.textCallback(knife);
    renderTextOnEntity(knife, text);
  };
}
