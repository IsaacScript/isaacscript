import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayBomb extends Feature {
  public textCallback: (bomb: EntityBomb) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_BOMB_RENDER, [this.postBombRender]], // 59
    ];
  }

  // ModCallback.POST_BOMB_RENDER (59)
  private postBombRender = (bomb: EntityBomb) => {
    const text = this.textCallback(bomb);
    renderTextOnEntity(bomb, text);
  };
}
