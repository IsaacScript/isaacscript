import { saveDataManager } from "../features/saveDataManager/main";
import { arrayEmpty } from "../functions/array";
import {
  getPlayerFromIndex,
  getPlayerIndex,
  PlayerIndex,
} from "../functions/player";
import * as postPlayerInitReordered from "./subscriptions/postPlayerInitReordered";
import * as postPlayerRenderReordered from "./subscriptions/postPlayerRenderReordered";
import * as postPlayerUpdateReordered from "./subscriptions/postPlayerUpdateReordered";

const v = {
  run: {
    postGameStartedFiredOnThisRun: false,

    postPlayerInitQueue: [] as PlayerIndex[],
    postPlayerUpdateQueue: [] as PlayerIndex[],
    postPlayerRenderQueue: [] as PlayerIndex[],
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPlayerReordered", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRender); // 32

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
}

function hasSubscriptions() {
  return (
    postPlayerInitReordered.hasSubscriptions() ||
    postPlayerUpdateReordered.hasSubscriptions() ||
    postPlayerRenderReordered.hasSubscriptions()
  );
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (v.run.postGameStartedFiredOnThisRun) {
    postPlayerInitReordered.fire(player);
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
    postPlayerUpdateReordered.fire(player);
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
    postPlayerRenderReordered.fire(player);
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

  dequeue(v.run.postPlayerInitQueue, postPlayerInitReordered.fire);
  dequeue(v.run.postPlayerUpdateQueue, postPlayerUpdateReordered.fire);
  dequeue(v.run.postPlayerRenderQueue, postPlayerRenderReordered.fire);
}

function dequeue(
  playerIndexes: PlayerIndex[],
  fireFunction: (player: EntityPlayer) => void,
) {
  for (const playerIndex of playerIndexes) {
    const player = getPlayerFromIndex(playerIndex);
    if (player === null) {
      continue;
    }

    fireFunction(player);
  }

  arrayEmpty(playerIndexes);
}
