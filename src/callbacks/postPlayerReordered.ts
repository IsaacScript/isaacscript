import { saveDataManager } from "../features/saveDataManager/exports";
import { emptyArray } from "../functions/array";
import {
  getPlayerFromIndex,
  getPlayerIndex,
  PlayerIndex,
} from "../functions/player";
import {
  postPEffectUpdateReorderedFire,
  postPEffectUpdateReorderedHasSubscriptions,
} from "./subscriptions/postPEffectUpdateReordered";
import {
  postPlayerInitReorderedFire,
  postPlayerInitReorderedHasSubscriptions,
} from "./subscriptions/postPlayerInitReordered";
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

    postPlayerInitQueue: [] as PlayerIndex[],
    postPEffectUpdateQueue: [] as PlayerIndex[],
    postPlayerUpdateQueue: [] as PlayerIndex[],
    postPlayerRenderQueue: [] as PlayerIndex[],
  },
};

/** @internal */
export function postPlayerReorderedCallbacksInit(mod: Mod): void {
  saveDataManager("postPlayerReordered", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRender); // 32

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
}

function hasSubscriptions() {
  return (
    postPlayerInitReorderedHasSubscriptions() ||
    postPEffectUpdateReorderedHasSubscriptions() ||
    postPlayerUpdateReorderedHasSubscriptions() ||
    postPlayerRenderReorderedHasSubscriptions()
  );
}

// ModCallbacks.MC_POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPEffectUpdateReorderedFire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const playerIndex = getPlayerIndex(player);
    v.run.postPEffectUpdateQueue.push(playerIndex);
  }
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerInitReorderedFire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const playerIndex = getPlayerIndex(player);
    v.run.postPlayerInitQueue.push(playerIndex);
  }
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerUpdateReorderedFire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const playerIndex = getPlayerIndex(player);
    v.run.postPlayerUpdateQueue.push(playerIndex);
  }
}

// ModCallbacks.MC_POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerRenderReorderedFire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const playerIndex = getPlayerIndex(player);
    v.run.postPlayerRenderQueue.push(playerIndex);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.postGameStartedFiredOnThisRun = true;

  dequeue(v.run.postPlayerInitQueue, postPlayerInitReorderedFire);
  dequeue(v.run.postPlayerUpdateQueue, postPlayerUpdateReorderedFire);
  dequeue(v.run.postPlayerRenderQueue, postPlayerRenderReorderedFire);
}

function dequeue(
  playerIndexes: PlayerIndex[],
  fireFunction: (player: EntityPlayer) => void,
) {
  for (const playerIndex of playerIndexes) {
    const player = getPlayerFromIndex(playerIndex);
    if (player === undefined) {
      continue;
    }

    fireFunction(player);
  }

  emptyArray(playerIndexes);
}
