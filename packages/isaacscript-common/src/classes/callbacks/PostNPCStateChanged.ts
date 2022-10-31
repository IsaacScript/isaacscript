import { ModCallback, NpcState } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireNPC } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostNPCStateChanged extends CustomCallback<ModCallbackCustom.POST_NPC_STATE_CHANGED> {
  public override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, NpcState, [NpcState]>(
        (state) => state, // eslint-disable-line isaacscript/strict-enums
      ),
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
    const ptrHash = GetPtrHash(npc);
    const previousState = this.v.run.stateMap.getAndSetDefault(
      ptrHash,
      npc.State,
    );
    const currentState = npc.State;
    this.v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(npc, previousState, currentState);
    }
  };
}
