// This handles logic for the following callbacks:
// - POST_PEFFECT_UPDATE_REORDERED
// - POST_PLAYER_RENDER_REORDERED
// - POST_PLAYER_UPDATE_REORDERED

import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import { emptyArray } from "../functions/array";
import { getPlayerFromIndex, getPlayerIndex } from "../functions/playerIndex";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPEffectUpdateReorderedFire,
  postPEffectUpdateReorderedHasSubscriptions,
} from "./subscriptions/postPEffectUpdateReordered";
import {
  postPlayerRenderReorderedFire,
  postPlayerRenderReorderedHasSubscriptions,
} from "./subscriptions/postPlayerRenderReordered";
import {
  postPlayerUpdateReorderedFire,
  postPlayerUpdateReorderedHasSubscriptions,
} from "./subscriptions/postPlayerUpdateReordered";

const v = {
  run: {
    postGameStartedFiredOnThisRun: false,

    postPEffectUpdateQueue: [] as PlayerIndex[],
    postPlayerUpdateQueue: [] as PlayerIndex[],
    postPlayerRenderQueue: [] as PlayerIndex[],
  },
};

/** @internal */
export function postPlayerReorderedCallbacksInit(mod: Mod): void {
  saveDataManager("postPlayerReordered", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallback.POST_PLAYER_UPDATE, postPlayerUpdate); // 31
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, postPlayerRender); // 32
}

function hasSubscriptions() {
  return (
    postPEffectUpdateReorderedHasSubscriptions() ||
    postPlayerUpdateReorderedHasSubscriptions() ||
    postPlayerRenderReorderedHasSubscriptions()
  );
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPEffectUpdateReorderedFire(player);
  } else {
    // Defer callback execution until the `POST_GAME_STARTED` callback fires.
    const playerIndex = getPlayerIndex(player);
    v.run.postPEffectUpdateQueue.push(playerIndex);
  }
}

// ModCallback.POST_PLAYER_UPDATE (31)
function postPlayerUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerUpdateReorderedFire(player);
  } else {
    // Defer callback execution until the `POST_GAME_STARTED` callback fires.
    const playerIndex = getPlayerIndex(player);
    v.run.postPlayerUpdateQueue.push(playerIndex);
  }
}

// ModCallback.POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerRenderReorderedFire(player);
  } else {
    // Defer callback execution until the `POST_GAME_STARTED` callback fires.
    const playerIndex = getPlayerIndex(player);
    v.run.postPlayerRenderQueue.push(playerIndex);
  }
}

// ModCallback.POST_GAME_STARTED (15)
function postGameStarted() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.postGameStartedFiredOnThisRun = true;

  dequeue(v.run.postPEffectUpdateQueue, postPEffectUpdateReorderedFire);
  dequeue(v.run.postPlayerUpdateQueue, postPlayerUpdateReorderedFire);
  dequeue(v.run.postPlayerRenderQueue, postPlayerRenderReorderedFire);
}

function dequeue(
  playerIndexes: PlayerIndex[],
  fireFunction: (player: EntityPlayer) => void,
) {
  for (const playerIndex of playerIndexes) {
    const player = getPlayerFromIndex(playerIndex);
    if (player !== undefined) {
      fireFunction(player);
    }
  }

  emptyArray(playerIndexes);
}
