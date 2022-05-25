import { ModCallback } from "isaac-typescript-definitions";
import { getSpikes } from "../functions/gridEntitySpecific";
import {
  postSpikesUpdateFire,
  postSpikesUpdateHasSubscriptions,
} from "./subscriptions/postSpikesUpdate";

/** @internal */
export function postSpikesUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postSpikesUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const spikes of getSpikes()) {
    postSpikesUpdateFire(spikes);
  }
}
