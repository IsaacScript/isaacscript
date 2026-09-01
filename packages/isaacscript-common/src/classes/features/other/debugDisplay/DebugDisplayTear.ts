import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayTear extends Feature {
  // ModCallback.POST_TEAR_RENDER (41)
  private readonly postTearRender = (tear: EntityTear) => {
    const text = this.textCallback(tear);
    renderTextOnEntity(tear, text);
  };

  public textCallback: (tear: EntityTear) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 41
      [ModCallback.POST_TEAR_RENDER, this.postTearRender],
    ];
  }
}
