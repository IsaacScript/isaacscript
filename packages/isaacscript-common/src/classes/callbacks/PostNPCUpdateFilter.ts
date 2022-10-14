import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCUpdateFilter extends CustomCallback<ModCallbackCustom.POST_NPC_UPDATE_FILTER> {
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

  // ModCallback.POST_NPC_INIT (0)
  private postNPCUpdate = (npc: EntityNPC) => {
    this.fire(npc);
  };
}
