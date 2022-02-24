import { saveDataManager } from "../features/saveDataManager/exports";
import { arrayInit } from "../functions/array";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postTransformationFire,
  postTransformationHasSubscriptions,
} from "./subscriptions/postTransformation";

const UNUSED_TRANSFORMATIONS: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.PLAYERFORM_FLIGHT,
]);

const v = {
  run: {
    transformations: new Map<PlayerIndex, boolean[]>(),
  },
};

/** @internal */
export function postTransformationCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postTransformation", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postTransformationHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = getPlayerIndex(player);
  let transformations = v.run.transformations.get(index);
  if (transformations === undefined) {
    transformations = arrayInit(false, PlayerForm.NUM_PLAYER_FORMS - 1);
    v.run.transformations.set(index, transformations);
  }

  for (
    let playerForm = 0;
    playerForm < PlayerForm.NUM_PLAYER_FORMS;
    playerForm++
  ) {
    // Skip transformations unused by the game
    if (UNUSED_TRANSFORMATIONS.has(playerForm)) {
      continue;
    }

    const hasForm = player.HasPlayerForm(playerForm);
    const storedForm = transformations[playerForm];
    if (hasForm !== storedForm) {
      transformations[playerForm] = hasForm;
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
