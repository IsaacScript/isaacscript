import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCInitFilter extends CustomCallback<ModCallbackCustom.POST_NPC_INIT_FILTER> {
  // ModCallback.POST_NPC_INIT (27)
  private readonly postNPCInit = (npc: EntityNPC) => {
    this.fire(npc);
  };

  protected override shouldFire = shouldFireNPC;

  constructor() {
    super();

    this.callbacksUsed = [
      // 27
      [ModCallback.POST_NPC_INIT, this.postNPCInit],
    ];
  }
}
