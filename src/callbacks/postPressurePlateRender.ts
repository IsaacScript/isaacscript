import { ModCallback } from "isaac-typescript-definitions";
import { getPressurePlates } from "../functions/gridEntitySpecific";
import {
  postPressurePlateRenderFire,
  postPressurePlateRenderHasSubscriptions,
} from "./subscriptions/postPressurePlateRender";

/** @internal */
export function postPressurePlateRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postPressurePlateRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const pressurePlate of getPressurePlates()) {
    postPressurePlateRenderFire(pressurePlate);
  }
}
