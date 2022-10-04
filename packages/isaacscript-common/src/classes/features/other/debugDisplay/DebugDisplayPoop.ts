import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayPoop extends Feature {
  public textCallback: (poop: GridEntityPoop) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_POOP_RENDER, [this.postPoopRender]],
    ];
  }

  // ModCallbackCustom.POST_POOP_RENDER
  private postPoopRender = (poop: GridEntityPoop) => {
    const text = this.textCallback(poop);
    renderTextOnEntity(poop, text);
  };
}
