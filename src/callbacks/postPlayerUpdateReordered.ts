import { arrayEmpty } from "../functions/array";
import * as postPlayerUpdateReordered from "./subscriptions/postPlayerUpdateReordered";

const playerQueue: EntityPtr[] = [];

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
}

function hasSubscriptions() {
  return postPlayerUpdateReordered.hasSubscriptions();
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

    postPlayerUpdateReordered.fire(player);
  }

  arrayEmpty(playerQueue);
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
    playerQueue.push(entityPtr);
  }
}
