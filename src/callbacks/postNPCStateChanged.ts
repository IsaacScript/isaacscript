import { ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postNPCStateChangedFire,
  postNPCStateChangedHasSubscriptions,
} from "./subscriptions/postNPCStateChanged";

const v = {
  run: {
    npcStateMap: new DefaultMap<PtrHash, int, [int]>(
      (_ptrHash, state) => state,
    ),
  },
};

/** @internal */
export function postNPCStateChangedCallbackInit(mod: Mod): void {
  saveDataManager("postNPCStateChanged", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_NPC_UPDATE, postNPCUpdate); // 0
}

function hasSubscriptions() {
  return postNPCStateChangedHasSubscriptions();
}

// ModCallback.POST_NPC_UPDATE (0)
function postNPCUpdate(npc: EntityNPC) {
  if (!hasSubscriptions()) {
    return;
  }

  const ptrHash = GetPtrHash(npc);
  const previousState = v.run.npcStateMap.getAndSetDefault(ptrHash, npc.State);
  const currentState = npc.State;
  v.run.npcStateMap.set(ptrHash, currentState);

  if (previousState !== currentState) {
    postNPCStateChangedFire(npc, previousState, currentState);
  }
}
