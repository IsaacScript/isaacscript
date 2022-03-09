import { saveDataManager } from "../features/saveDataManager/exports";
import { range } from "../functions/math";
import { defaultMapGetPlayer } from "../functions/playerDataStructures";
import { DefaultMap } from "../types/DefaultMap";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postTransformationFire,
  postTransformationHasSubscriptions,
} from "./subscriptions/postTransformation";

const UNUSED_TRANSFORMATIONS: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.PLAYERFORM_FLIGHT,
]);

const ALL_TRANSFORMATIONS: readonly PlayerForm[] = range(
  0,
  PlayerForm.NUM_PLAYER_FORMS - 1,
);
const VALID_TRANSFORMATIONS: readonly PlayerForm[] = ALL_TRANSFORMATIONS.filter(
  (playerForm) => !UNUSED_TRANSFORMATIONS.has(playerForm),
);

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

  const playerTransformationsMap = defaultMapGetPlayer(
    v.run.playersTransformationsMap,
    player,
  );

  for (const playerForm of VALID_TRANSFORMATIONS) {
    const hasForm = player.HasPlayerForm(playerForm);
    const storedForm = playerTransformationsMap.getAndSetDefault(playerForm);

    if (hasForm !== storedForm) {
      playerTransformationsMap.set(playerForm, hasForm);
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
