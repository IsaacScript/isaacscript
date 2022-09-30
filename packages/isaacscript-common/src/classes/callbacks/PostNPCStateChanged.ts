import { ModCallback, NpcState } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { DefaultMap } from "../DefaultMap";
import { CustomCallbackNPC } from "./validation/CustomCallbackNPC";

export class PostNPCStateChanged extends CustomCallbackNPC<ModCallbackCustom2.POST_NPC_STATE_CHANGED> {
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
