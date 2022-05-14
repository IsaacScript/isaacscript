import { ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postFamiliarStateChangedFire,
  postFamiliarStateChangedHasSubscriptions,
} from "./subscriptions/postFamiliarStateChanged";

const v = {
  run: {
    familiarStateMap: new DefaultMap<PtrHash, int, [int]>(
      (_initSeed, state) => state,
    ),
  },
};

/** @internal */
export function postFamiliarStateChangedCallbackInit(mod: Mod): void {
  saveDataManager("postFamiliarStateChanged", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_FAMILIAR_UPDATE, postFamiliarUpdate); // 6
}

function hasSubscriptions() {
  return postFamiliarStateChangedHasSubscriptions();
}

// ModCallback.POST_FAMILIAR_UPDATE (6)
function postFamiliarUpdate(familiar: EntityFamiliar) {
  if (!hasSubscriptions()) {
    return;
  }

  const ptrHash = GetPtrHash(familiar);
  const previousState = v.run.familiarStateMap.getAndSetDefault(
    ptrHash,
    familiar.State,
  );
  const currentState = familiar.State;
  v.run.familiarStateMap.set(ptrHash, currentState);

  if (previousState !== currentState) {
    postFamiliarStateChangedFire(familiar, previousState, currentState);
  }
}
