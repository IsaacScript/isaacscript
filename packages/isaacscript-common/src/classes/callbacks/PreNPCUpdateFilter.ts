import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreNPCUpdateFilter extends CustomCallback<ModCallbackCustom.PRE_NPC_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.PRE_NPC_UPDATE, [this.preNPCUpdate]], // 69
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.PRE_NPC_UPDATE (69)
  private preNPCUpdate = (npc: EntityNPC) => this.fire(npc);
}
