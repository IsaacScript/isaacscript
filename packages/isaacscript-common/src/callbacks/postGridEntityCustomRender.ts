import { GridEntityType, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { getCustomGridEntities } from "../features/customGridEntity";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postGridEntityCustomRenderFire,
  postGridEntityCustomRenderHasSubscriptions,
} from "./subscriptions/postGridEntityCustomRender";

type GridEntityTuple = [
  gridEntityType: GridEntityType,
  gridEntityVariant: int,
  state: int,
];

const v = {
  room: {
    /** Indexed by grid index. */
    initializedGridEntities: new Map<int, GridEntityTuple>(),
  },
};

/** @internal */
export function postGridEntityCustomRenderInit(mod: ModUpgraded): void {
  saveDataManager("postGridEntityCustomRender", v, hasSubscriptions);

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
