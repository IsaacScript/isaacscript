import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreNPCCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_NPC_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.PRE_NPC_COLLISION, [this.preNPCCollision]], // 30
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.PRE_NPC_COLLISION (30)
  private preNPCCollision = (npc: EntityNPC, collider: Entity, low: boolean) =>
    this.fire(npc, collider, low);
}
