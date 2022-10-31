import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayNPC extends Feature {
  public textCallback: (npc: EntityNPC) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_NPC_RENDER, [this.postNPCRender]], // 28
    ];
  }

  // ModCallback.POST_NPC_RENDER (28)
  private postNPCRender = (npc: EntityNPC) => {
    const text = this.textCallback(npc);
    renderTextOnEntity(npc, text);
  };
}
