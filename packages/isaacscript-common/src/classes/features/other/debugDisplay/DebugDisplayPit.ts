import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

export class DebugDisplayPit extends Feature {
  public textCallback: (pit: GridEntityPit) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_PIT_RENDER, this.postPitRender],
    ];
  }

  // ModCallbackCustom.POST_PIT_RENDER
  private readonly postPitRender = (pit: GridEntityPit) => {
    const text = this.textCallback(pit);
    renderTextOnEntity(pit, text);
  };
}
