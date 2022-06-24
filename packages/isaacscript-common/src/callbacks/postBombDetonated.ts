import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postBombDetonatedFire,
  postBombDetonatedHasSubscriptions,
} from "./subscriptions/postBoneDetonated";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postBombDetonatedInit(mod: Mod): void {
  saveDataManager("postBombDetonated", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombDetonatedHasSubscriptions();
}

// ModCallback.POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(bomb);

  // TODO

  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postBombDetonatedFire(bomb);
  }
}
