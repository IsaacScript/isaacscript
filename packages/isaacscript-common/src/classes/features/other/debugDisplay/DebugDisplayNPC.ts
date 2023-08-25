import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayNPC extends Feature {
  public textCallback: (npc: EntityNPC) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 28
      [ModCallback.POST_NPC_RENDER, this.postNPCRender],
    ];
  }

  // ModCallback.POST_NPC_RENDER (28)
  private readonly postNPCRender = (npc: EntityNPC) => {
    const text = this.textCallback(npc);
    renderTextOnEntity(npc, text);
  };
}
