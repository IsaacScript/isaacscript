import { arrayEmpty } from "../functions/array";
import * as postPlayerInitReordered from "./subscriptions/postPlayerInitReordered";
import * as postPlayerUpdateReordered from "./subscriptions/postPlayerUpdateReordered";

const postPlayerInitQueue: EntityPtr[] = [];
const postPlayerUpdateQueue: EntityPtr[] = [];

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
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

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount > 0) {
    // This is a player that has spawned mid-way through the run
    // Execute the callback immediately
    postPlayerInitReordered.fire(player);
  } else {
    // This is a player that has spawned at the beginning of the run
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

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount > 0) {
    // Execute the callback immediately
    postPlayerUpdateReordered.fire(player);
  } else {
    // This is a player that has spawned at the beginning of the run
    // Defer callback execution until the PostGameStarted callback fires
    const entityPtr = EntityPtr(player);
    postPlayerUpdateQueue.push(entityPtr);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  if (!hasSubscriptions()) {
    return;
  }

  postPlayerInitDequeue();
  postPlayerUpdateDequeue();
}

function postPlayerInitDequeue() {
  for (const entityPtr of postPlayerInitQueue) {
    const entity = entityPtr.Ref;
    if (entity === null) {
      continue;
    }

    const player = entity.ToPlayer();
    if (player === null) {
      continue;
    }

    postPlayerInitReordered.fire(player);
  }

  arrayEmpty(postPlayerInitQueue);
}

function postPlayerUpdateDequeue() {
  for (const entityPtr of postPlayerUpdateQueue) {
    const entity = entityPtr.Ref;
    if (entity === null) {
      continue;
    }

    const player = entity.ToPlayer();
    if (player === null) {
      continue;
    }

    postPlayerUpdateReordered.fire(player);
  }

  arrayEmpty(postPlayerUpdateQueue);
}
