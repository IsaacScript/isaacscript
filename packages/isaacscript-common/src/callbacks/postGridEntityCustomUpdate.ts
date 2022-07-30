import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { getCustomGridEntities } from "../features/customGridEntity";
import {
  postGridEntityCustomUpdateFire,
  postGridEntityCustomUpdateHasSubscriptions,
} from "./subscriptions/postGridEntityCustomUpdate";

export function postGridEntityCustomUpdateInit(mod: ModUpgraded): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postGridEntityCustomUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const customGridEntities = getCustomGridEntities();
  for (const [gridEntity, data] of customGridEntities) {
    postGridEntityCustomUpdateFire(gridEntity, data.gridEntityTypeCustom);
  }
}
