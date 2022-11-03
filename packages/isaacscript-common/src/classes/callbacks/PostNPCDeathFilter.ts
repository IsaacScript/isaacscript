import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCDeathFilter extends CustomCallback<ModCallbackCustom.POST_NPC_DEATH_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_NPC_DEATH, [this.postNPCRender]], // 29
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_DEATH (29)
  private postNPCRender = (npc: EntityNPC) => {
    this.fire(npc);
  };
}
