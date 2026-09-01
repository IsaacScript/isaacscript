import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

export class DebugDisplaySpikes extends Feature {
  // ModCallbackCustom.POST_SPIKES_RENDER
  private readonly postSpikesRender = (spikes: GridEntitySpikes) => {
    const text = this.textCallback(spikes);
    renderTextOnEntity(spikes, text);
  };

  public textCallback: (spikes: GridEntitySpikes) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_SPIKES_RENDER, this.postSpikesRender],
    ];
  }
}
