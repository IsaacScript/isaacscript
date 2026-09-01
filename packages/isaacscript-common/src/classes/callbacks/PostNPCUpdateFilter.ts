import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCUpdateFilter extends CustomCallback<ModCallbackCustom.POST_NPC_UPDATE_FILTER> {
  // ModCallback.POST_NPC_INIT (0)
  private readonly postNPCUpdate = (npc: EntityNPC) => {
    this.fire(npc);
  };

  protected override shouldFire = shouldFireNPC;

  constructor() {
    super();

    this.callbacksUsed = [
      // 0
      [ModCallback.POST_NPC_UPDATE, this.postNPCUpdate],
    ];
  }
}
