import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayPlayer extends Feature {
  public textCallback: (player: EntityPlayer) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PLAYER_RENDER, [this.postPlayerRender]], // 32
    ];
  }

  // ModCallback.POST_PLAYER_RENDER (32)
  private postPlayerRender = (player: EntityPlayer) => {
    const text = this.textCallback(player);
    renderTextOnEntity(player, text);
  };
}
