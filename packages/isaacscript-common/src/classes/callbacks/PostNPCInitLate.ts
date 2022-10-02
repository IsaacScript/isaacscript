import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCInitLate extends CustomCallback<ModCallbackCustom2.POST_NPC_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_NPC_UPDATE, [this.postNPCUpdate]], // 0
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_UPDATE (0)
  private postNPCUpdate = (npc: EntityNPC) => {
    const index = GetPtrHash(npc);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(npc);
    }
  };
}
