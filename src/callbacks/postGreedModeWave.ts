import { game } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postGreedModeWaveFire,
  postGreedModeWaveHasSubscriptions,
} from "./subscriptions/postGreedModeWave";

const v = {
  run: {
    currentGreedWave: 0,
  },
};

/** @internal */
export function postGreedModeWaveCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postModeGreedWave", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postGreedModeWaveHasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const level = game.GetLevel();
  const newWave = level.GreedModeWave;
  const oldWave = v.run.currentGreedWave;
  v.run.currentGreedWave = newWave;

  if (newWave > oldWave) {
    postGreedModeWaveFire(oldWave, newWave);
  }
}
