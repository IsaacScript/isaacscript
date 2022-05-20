import { ModCallback } from "isaac-typescript-definitions";
import { getPressurePlates } from "../functions/gridEntitySpecific";
import {
  postPressurePlateUpdateFire,
  postPressurePlateUpdateHasSubscriptions,
} from "./subscriptions/postPressurePlateUpdate";

/** @internal */
export function postPressurePlateUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postPressurePlateUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const pressurePlate of getPressurePlates()) {
    postPressurePlateUpdateFire(pressurePlate);
  }
}
