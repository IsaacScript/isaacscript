import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCInitFilter extends CustomCallback<ModCallbackCustom.POST_NPC_INIT_FILTER> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_NPC_INIT, [this.postNPCInit]], // 27
    ];
  }

  protected override shouldFire = shouldFireNPC;

  // ModCallback.POST_NPC_INIT (27)
  private postNPCInit = (npc: EntityNPC) => {
    this.fire(npc);
  };
}
