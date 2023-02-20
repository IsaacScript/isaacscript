import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

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
  private postPlayerRenderReordered = (player: EntityPlayer) => {
    const text = this.textCallback(player);
    renderTextOnEntity(player, text);
  };
}
