import { GridEntityType, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { getCustomGridEntities } from "../features/customGridEntity";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postGridEntityCustomUpdateFire,
  postGridEntityCustomUpdateHasSubscriptions,
} from "./subscriptions/postGridEntityCustomUpdate";

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
export function postGridEntityCustomUpdateInit(mod: ModUpgraded): void {
  saveDataManager("postGridEntityCustomUpdate", v, hasSubscriptions);

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
