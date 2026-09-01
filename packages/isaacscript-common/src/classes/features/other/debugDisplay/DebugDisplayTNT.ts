import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

export class DebugDisplayTNT extends Feature {
  public textCallback: (tnt: GridEntityTNT) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_TNT_RENDER, this.postTNTRender],
    ];
  }

  // ModCallbackCustom.POST_TNT_RENDER
  private readonly postTNTRender = (tnt: GridEntityTNT) => {
    const text = this.textCallback(tnt);
    renderTextOnEntity(tnt, text);
  };
}
