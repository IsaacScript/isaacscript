import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostNPCInitLate extends CustomCallback<ModCallbackCustom.POST_NPC_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 0
      [ModCallback.POST_NPC_UPDATE, this.postNPCUpdate],
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_UPDATE (0)
  private readonly postNPCUpdate = (npc: EntityNPC) => {
    const index = GetPtrHash(npc);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(npc);
    }
  };
}
