import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCRenderFilter extends CustomCallback<ModCallbackCustom.POST_NPC_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 28
      [ModCallback.POST_NPC_RENDER, this.postNPCRender],
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_RENDER (28)
  private readonly postNPCRender = (npc: EntityNPC, renderOffset: Vector) => {
    this.fire(npc, renderOffset);
  };
}
