import { ModCallback } from "isaac-typescript-definitions";
import { getDoors } from "../functions/doors";
import {
  postDoorUpdateFire,
  postDoorUpdateHasSubscriptions,
} from "./subscriptions/postDoorUpdate";

/** @internal */
export function postDoorUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postDoorUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const doors of getDoors()) {
    postDoorUpdateFire(doors);
  }
}
