import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreNPCUpdateFilter extends CustomCallback<ModCallbackCustom.PRE_NPC_UPDATE_FILTER> {
  // ModCallback.PRE_NPC_UPDATE (69)
  private readonly preNPCUpdate = (npc: EntityNPC) => this.fire(npc);
  protected override shouldFire = shouldFireNPC;

  constructor() {
    super();

    this.callbacksUsed = [
      // 69
      [ModCallback.PRE_NPC_UPDATE, this.preNPCUpdate],
    ];
  }
}
