import { arrayEmpty } from "../functions/array";
import * as postPlayerInitReordered from "./subscriptions/postPlayerInitReordered";

const playerQueue: EntityPtr[] = [];

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
}

function hasSubscriptions() {
  return postPlayerInitReordered.hasSubscriptions();
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
    playerQueue.push(entityPtr);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const entityPtr of playerQueue) {
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

  arrayEmpty(playerQueue);
}
