import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreNPCCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_NPC_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 30
      [ModCallback.PRE_NPC_COLLISION, this.preNPCCollision],
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.PRE_NPC_COLLISION (30)
  private readonly preNPCCollision = (
    npc: EntityNPC,
    collider: Entity,
    low: boolean,
  ) => this.fire(npc, collider, low);
}
