// This provides the logic for PostEsauJr and PostFirstEsauJr

import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayers } from "../functions/player";
import {
  postEsauJrFire,
  postEsauJrHasSubscriptions,
} from "./subscriptions/postEsauJr";
import {
  postFirstEsauJrFire,
  postFirstEsauJrHasSubscriptions,
} from "./subscriptions/postFirstEsauJr";

const v = {
  run: {
    usedEsauJrFrame: null as int | null,
    usedEsauJrControllerIndex: null as int | null,
    usedEsauJrAtLeastOnce: false,
  },
};

/** @internal */
export function postEsauJrCallbacksInit(mod: Mod): void {
  saveDataManager("postEsauJr", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemEsauJr,
    CollectibleType.COLLECTIBLE_ESAU_JR,
  ); // 3
}

function hasSubscriptions() {
  return postEsauJrHasSubscriptions() || postFirstEsauJrHasSubscriptions();
}

// ModCallbacks.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  // Check to see if it is the frame after the player has used Esau Jr.
  if (
    v.run.usedEsauJrFrame === null ||
    gameFrameCount < v.run.usedEsauJrFrame + 1
  ) {
    return;
  }
  v.run.usedEsauJrFrame = null;

  // Find the player corresponding to the player who used Esau Jr. a frame ago
  // (via matching the ControllerIndex)
  if (v.run.usedEsauJrControllerIndex === null) {
    return;
  }
  const player = getPlayerWithControllerIndex(v.run.usedEsauJrControllerIndex);
  v.run.usedEsauJrControllerIndex = null;
  if (player === undefined) {
    return;
  }

  if (!v.run.usedEsauJrAtLeastOnce) {
    v.run.usedEsauJrAtLeastOnce = true;
    postFirstEsauJrFire(player);
  }

  postEsauJrFire(player);
}

function getPlayerWithControllerIndex(controllerIndex: int) {
  for (const player of getPlayers()) {
    if (player.ControllerIndex === controllerIndex) {
      return player;
    }
  }

  return undefined;
}

// ModCallbacks.USE_ITEM (3)
// CollectibleType.COLLECTIBLE_ESAU_JR (703)
function useItemEsauJr(
  _collectibleType: CollectibleType | int,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: int,
  _activeSlot: int,
  _customVarData: int,
) {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  // The player only changes to Esau Jr. on the frame after the item is used
  v.run.usedEsauJrFrame = gameFrameCount + 1;
  v.run.usedEsauJrControllerIndex = player.ControllerIndex;
}
