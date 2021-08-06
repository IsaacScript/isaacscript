import { saveDataManager } from "../features/saveDataManager";
import { getPlayers } from "../functions/player";
import * as postEsauJr from "./subscriptions/postEsauJr";
import * as postFirstEsauJr from "./subscriptions/postFirstEsauJr";

const v = {
  run: {
    usedEsauJrFrame: null as int | null,
    usedEsauJrControllerIndex: null as int | null,
    usedEsauJrAtLeastOnce: false,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postEsauJrCallback", v);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemEsauJr,
    CollectibleType.COLLECTIBLE_ESAU_JR,
  ); // 3
}

// ModCallbacks.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const gameFrameCount = Isaac.GetFrameCount();

  // Check to see if it is the frame after the player has used Esau Jr.
  if (
    v.run.usedEsauJrFrame !== null &&
    gameFrameCount >= v.run.usedEsauJrFrame + 1
  ) {
    v.run.usedEsauJrFrame = null;

    // Find the player corresponding to the player who used Esau Jr. a frame ago
    // (via matching the ControllerIndex)
    if (v.run.usedEsauJrControllerIndex === null) {
      return;
    }
    const player = getPlayerWithControllerIndex(
      v.run.usedEsauJrControllerIndex,
    );
    v.run.usedEsauJrControllerIndex = null;
    if (player === null) {
      return;
    }

    if (!v.run.usedEsauJrAtLeastOnce) {
      v.run.usedEsauJrAtLeastOnce = true;
      postFirstEsauJr.fire(player);
    }

    postEsauJr.fire(player);
  }
}

function getPlayerWithControllerIndex(controllerIndex: int) {
  for (const player of getPlayers()) {
    if (player.ControllerIndex === controllerIndex) {
      return player;
    }
  }

  return null;
}

// ModCallbacks.USE_ITEM (3)
// CollectibleType.COLLECTIBLE_ESAU_JR (703)
function useItemEsauJr(
  _collectibleType: CollectibleType | int,
  _rng: RNG,
  _player: EntityPlayer,
  _useFlags: int,
  _activeSlot: int,
  _customVarData: int,
): void {
  if (!hasSubscriptions()) {
    return;
  }

  const gameFrameCount = Isaac.GetFrameCount();

  // The player only changes to Esau Jr. on the frame after the item is used
  v.run.usedEsauJrFrame = gameFrameCount + 1;
}

function hasSubscriptions() {
  return postEsauJr.hasSubscriptions() || postFirstEsauJr.hasSubscriptions();
}
