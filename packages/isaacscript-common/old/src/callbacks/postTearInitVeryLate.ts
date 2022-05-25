import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postTearInitVeryLateFire,
  postTearInitVeryLateHasSubscriptions,
} from "./subscriptions/postTearInitVeryLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postTearInitVeryLateCallbackInit(mod: Mod): void {
  saveDataManager("postTearInitVeryLate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, postTearUpdate); // 40
}

function hasSubscriptions() {
  return postTearInitVeryLateHasSubscriptions();
}

// ModCallback.POST_TEAR_UPDATE (40)
function postTearUpdate(tear: EntityTear) {
  if (!hasSubscriptions()) {
    return;
  }

  // This callback fires on frame 1.
  if (tear.FrameCount === 0) {
    return;
  }

  const index = GetPtrHash(tear);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postTearInitVeryLateFire(tear);
  }
}
