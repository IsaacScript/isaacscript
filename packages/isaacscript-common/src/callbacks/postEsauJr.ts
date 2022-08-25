// This provides the logic for the following callbacks:
// - `POST_ESAU_JR`
// - `POST_FIRST_ESAU_JR`

import {
  CollectibleType,
  ControllerIndex,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayersWithControllerIndex } from "../functions/players";
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
    usedEsauJrControllerIndex: null as ControllerIndex | null,
    usedEsauJrAtLeastOnce: false,
  },
};

export function postEsauJrCallbacksInit(mod: Mod): void {
  saveDataManager("postEsauJr", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    useItemEsauJr,
    CollectibleType.ESAU_JR,
  ); // 3
}

function hasSubscriptions() {
  return postEsauJrHasSubscriptions() || postFirstEsauJrHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const gameFrameCount = game.GetFrameCount();

  // Check to see if it is the frame after the player has used Esau Jr.
  if (
    v.run.usedEsauJrFrame === null ||
    gameFrameCount < v.run.usedEsauJrFrame + 1
  ) {
    return;
  }
  v.run.usedEsauJrFrame = null;

  // Find the player corresponding to the player who used Esau Jr. a frame ago (via matching the
  // ControllerIndex).
  if (v.run.usedEsauJrControllerIndex === null) {
    return;
  }
  const players = getPlayersWithControllerIndex(
    v.run.usedEsauJrControllerIndex,
  );
  v.run.usedEsauJrControllerIndex = null;

  const player = players[0];
  if (player === undefined) {
    return;
  }

  if (!v.run.usedEsauJrAtLeastOnce) {
    v.run.usedEsauJrAtLeastOnce = true;
    postFirstEsauJrFire(player);
  }

  postEsauJrFire(player);
}

// ModCallback.POST_USE_ITEM (3)
// CollectibleType.ESAU_JR (703)
function useItemEsauJr(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: int,
  _customVarData: int,
): boolean | undefined {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const gameFrameCount = game.GetFrameCount();

  // The player only changes to Esau Jr. on the frame after the item is used.
  v.run.usedEsauJrFrame = gameFrameCount + 1;
  v.run.usedEsauJrControllerIndex = player.ControllerIndex;

  return undefined;
}
