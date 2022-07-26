import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { getCustomGridEntities } from "../features/customGridEntity";
import {
  postGridEntityCustomRenderFire,
  postGridEntityCustomRenderHasSubscriptions,
} from "./subscriptions/postGridEntityCustomRender";

/** @internal */
export function postGridEntityCustomRenderInit(mod: ModUpgraded): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postGridEntityCustomRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  const customGridEntities = getCustomGridEntities();
  for (const [gridEntity, data] of customGridEntities) {
    postGridEntityCustomRenderFire(gridEntity, data.gridEntityTypeCustom);
  }
}
