import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCRenderFilter extends CustomCallback<ModCallbackCustom.POST_NPC_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_NPC_RENDER, [this.postNPCRender]], // 28
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_RENDER (28)
  private postNPCRender = (npc: EntityNPC, renderOffset: Vector) => {
    this.fire(npc, renderOffset);
  };
}
