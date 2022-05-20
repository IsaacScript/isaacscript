import { ModCallback } from "isaac-typescript-definitions";
import { getPits } from "../functions/gridEntitySpecific";
import {
  postPitUpdateFire,
  postPitUpdateHasSubscriptions,
} from "./subscriptions/postPitUpdate";

/** @internal */
export function postPitUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postPitUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const pit of getPits()) {
    postPitUpdateFire(pit);
  }
}
