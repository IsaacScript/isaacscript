import { saveDataManager } from "../features/saveDataManager/main";
import * as postBombInitLate from "./subscriptions/postBombInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postBombInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(bomb);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postBombInitLate.fire(bomb);
  }
}
