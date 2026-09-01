import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

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
  private readonly postRockRender = (rock: GridEntityRock) => {
    const text = this.textCallback(rock);
    renderTextOnEntity(rock, text);
  };
}
