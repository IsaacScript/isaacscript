import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayBomb extends Feature {
  public textCallback: (bomb: EntityBomb) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 59
      [ModCallback.POST_BOMB_RENDER, this.postBombRender],
    ];
  }

  // ModCallback.POST_BOMB_RENDER (59)
  private readonly postBombRender = (bomb: EntityBomb) => {
    const text = this.textCallback(bomb);
    renderTextOnEntity(bomb, text);
  };
}
