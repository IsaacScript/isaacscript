import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

export class DebugDisplayPoop extends Feature {
  // ModCallbackCustom.POST_POOP_RENDER
  private readonly postPoopRender = (poop: GridEntityPoop) => {
    const text = this.textCallback(poop);
    renderTextOnEntity(poop, text);
  };

  public textCallback: (poop: GridEntityPoop) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_POOP_RENDER, this.postPoopRender],
    ];
  }
}
