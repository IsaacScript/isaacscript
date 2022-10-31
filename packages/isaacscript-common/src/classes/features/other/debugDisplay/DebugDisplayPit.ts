import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayPit extends Feature {
  public textCallback: (pit: GridEntityPit) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_PIT_RENDER, [this.postPitRender]],
    ];
  }

  // ModCallbackCustom.POST_PIT_RENDER
  private postPitRender = (pit: GridEntityPit) => {
    const text = this.textCallback(pit);
    renderTextOnEntity(pit, text);
  };
}
