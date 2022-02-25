import { saveDataManager } from "../features/saveDataManager/exports";
import { copyArray } from "../functions/array";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { DefaultMap } from "../types/DefaultMap";
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
for (let i = 0; i < PlayerForm.NUM_PLAYER_FORMS; i++) {
  // Skip transformations unused by the game
  if (!UNUSED_TRANSFORMATIONS.has(i)) {
    tempTransformations.push(i);
  }
}
const VALID_TRANSFORMATIONS: readonly PlayerForm[] =
  copyArray(tempTransformations);

const v = {
  run: {
    playersTransformationsMap: new DefaultMap<
      PlayerIndex,
      DefaultMap<PlayerForm, boolean>
    >(() => new DefaultMap(false)),
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
  const playerTransformationsMap =
    v.run.playersTransformationsMap.getAndSetDefault(playerIndex);

  for (const playerForm of VALID_TRANSFORMATIONS) {
    const hasForm = player.HasPlayerForm(playerForm);
    const storedForm = playerTransformationsMap.getAndSetDefault(playerForm);

    if (hasForm !== storedForm) {
      playerTransformationsMap.set(playerForm, hasForm);
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
