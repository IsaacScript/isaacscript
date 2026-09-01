import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCDeathFilter extends CustomCallback<ModCallbackCustom.POST_NPC_DEATH_FILTER> {
  // ModCallback.POST_NPC_DEATH (29)
  private readonly postNPCDeath = (npc: EntityNPC) => {
    this.fire(npc);
  };

  protected override shouldFire = shouldFireNPC;

  constructor() {
    super();

    this.callbacksUsed = [
      // 29
      [ModCallback.POST_NPC_DEATH, this.postNPCDeath],
    ];
  }
}
