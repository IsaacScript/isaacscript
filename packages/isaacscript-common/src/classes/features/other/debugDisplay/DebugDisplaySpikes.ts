import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplaySpikes extends Feature {
  public textCallback: (spikes: GridEntitySpikes) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_SPIKES_RENDER, this.postSpikesRender],
    ];
  }

  // ModCallbackCustom.POST_SPIKES_RENDER
  private postSpikesRender = (spikes: GridEntitySpikes) => {
    const text = this.textCallback(spikes);
    renderTextOnEntity(spikes, text);
  };
}
