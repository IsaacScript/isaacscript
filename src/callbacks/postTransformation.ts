import { saveDataManager } from "../features/saveDataManager/exports";
import { copyArray } from "../functions/array";
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

const tempTransformations: PlayerForm[] = [];
for (
  let playerForm = 0;
  playerForm < PlayerForm.NUM_PLAYER_FORMS;
  playerForm++
) {
  // Skip transformations unused by the game
  if (UNUSED_TRANSFORMATIONS.has(playerForm)) {
    continue;
  }

  tempTransformations.push(playerForm);
}
const TRANSFORMATIONS: readonly PlayerForm[] = copyArray(tempTransformations);

const v = {
  run: {
    transformations: new Map<PlayerIndex, Map<PlayerForm, boolean>>(),
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

  const playerIndex = getPlayerIndex(player);
  let transformations = v.run.transformations.get(playerIndex);
  if (transformations === undefined) {
    transformations = new Map();
    v.run.transformations.set(playerIndex, transformations);
  }

  for (const playerForm of TRANSFORMATIONS) {
    const hasForm = player.HasPlayerForm(playerForm);
    let storedForm = transformations.get(playerForm);
    if (storedForm === undefined) {
      const defaultValue = false;
      storedForm = defaultValue;
      transformations.set(playerForm, defaultValue);
    }

    if (hasForm !== storedForm) {
      transformations.set(playerForm, hasForm);
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
