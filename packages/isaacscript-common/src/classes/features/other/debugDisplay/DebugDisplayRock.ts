import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayRock extends Feature {
  public textCallback: (rock: GridEntityRock) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_ROCK_RENDER, this.postRockRender],
    ];
  }

  // ModCallbackCustom.POST_ROCK_RENDER
  private postRockRender = (rock: GridEntityRock) => {
    const text = this.textCallback(rock);
    renderTextOnEntity(rock, text);
  };
}
