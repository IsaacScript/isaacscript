import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayPlayer extends Feature {
  public textCallback: (player: EntityPlayer) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PLAYER_RENDER_REORDERED,
        this.postPlayerRenderReordered,
      ],
    ];
  }

  // ModCallbackCustom.POST_PLAYER_RENDER_REORDERED
  private readonly postPlayerRenderReordered = (player: EntityPlayer) => {
    const text = this.textCallback(player);
    renderTextOnEntity(player, text);
  };
}
