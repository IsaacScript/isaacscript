import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

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
  private postTNTRender = (tnt: GridEntityTNT) => {
    const text = this.textCallback(tnt);
    renderTextOnEntity(tnt, text);
  };
}
