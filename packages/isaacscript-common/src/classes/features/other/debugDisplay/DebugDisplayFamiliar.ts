import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayFamiliar extends Feature {
  public textCallback: (familiar: EntityFamiliar) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 25
      [ModCallback.POST_FAMILIAR_RENDER, this.postFamiliarRender],
    ];
  }

  // ModCallback.POST_FAMILIAR_RENDER (25)
  private readonly postFamiliarRender = (familiar: EntityFamiliar) => {
    const text = this.textCallback(familiar);
    renderTextOnEntity(familiar, text);
  };
}
