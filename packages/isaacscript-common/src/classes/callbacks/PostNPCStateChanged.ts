import type { NPCState } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    stateMap: new DefaultMap<PtrHash, NPCState, [NPCState]>(
      (state) => state, // eslint-disable-line complete/strict-enums
    ),
  },
};

export class PostNPCStateChanged extends CustomCallback<ModCallbackCustom.POST_NPC_STATE_CHANGED> {
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
    const ptrHash = GetPtrHash(npc);
    const previousState = v.run.stateMap.getAndSetDefault(ptrHash, npc.State);
    const currentState = npc.State;
    v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(npc, previousState, currentState);
    }
  };
}
