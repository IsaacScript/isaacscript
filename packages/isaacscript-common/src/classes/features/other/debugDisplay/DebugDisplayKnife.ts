import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayKnife extends Feature {
  public textCallback: (knife: EntityKnife) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 52
      [ModCallback.POST_KNIFE_RENDER, this.postKnifeRender],
    ];
  }

  // ModCallback.POST_KNIFE_RENDER (52)
  private readonly postKnifeRender = (knife: EntityKnife) => {
    const text = this.textCallback(knife);
    renderTextOnEntity(knife, text);
  };
}
