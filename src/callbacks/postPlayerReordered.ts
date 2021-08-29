import { arrayEmpty } from "../functions/array";
import * as postPlayerInitReordered from "./subscriptions/postPlayerInitReordered";
import * as postPlayerRenderReordered from "./subscriptions/postPlayerRenderReordered";
import * as postPlayerUpdateReordered from "./subscriptions/postPlayerUpdateReordered";

const postPlayerInitQueue: EntityPtr[] = [];
const postPlayerUpdateQueue: EntityPtr[] = [];
const postPlayerRenderQueue: EntityPtr[] = [];

let postGameStartedFiredOnThisRun = false;

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRender); // 32

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit); // 17
}

function hasSubscriptions() {
  return (
    postPlayerInitReordered.hasSubscriptions() ||
    postPlayerUpdateReordered.hasSubscriptions()
  );
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (postGameStartedFiredOnThisRun) {
    postPlayerInitReordered.fire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const entityPtr = EntityPtr(player);
    postPlayerInitQueue.push(entityPtr);
  }
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (postGameStartedFiredOnThisRun) {
    postPlayerUpdateReordered.fire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const entityPtr = EntityPtr(player);
    postPlayerUpdateQueue.push(entityPtr);
  }
}

// ModCallbacks.MC_POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (postGameStartedFiredOnThisRun) {
    postPlayerRenderReordered.fire(player);
  } else {
    // Defer callback execution until the PostGameStarted callback fires
    const entityPtr = EntityPtr(player);
    postPlayerRenderQueue.push(entityPtr);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  if (!hasSubscriptions()) {
    return;
  }

  postGameStartedFiredOnThisRun = true;

  dequeue(postPlayerInitQueue, postPlayerInitReordered.fire);
  dequeue(postPlayerUpdateQueue, postPlayerUpdateReordered.fire);
  dequeue(postPlayerRenderQueue, postPlayerRenderReordered.fire);
}

function dequeue(
  queue: EntityPtr[],
  fireFunction: (player: EntityPlayer) => void,
) {
  for (const entityPtr of queue) {
    const entity = entityPtr.Ref;
    if (entity === null) {
      continue;
    }

    const player = entity.ToPlayer();
    if (player === null) {
      continue;
    }

    fireFunction(player);
  }

  arrayEmpty(queue);
}

// ModCallbacks.MC_PRE_GAME_EXIT (17)
function preGameExit() {
  postGameStartedFiredOnThisRun = false;
}
