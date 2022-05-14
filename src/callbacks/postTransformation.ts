import { PlayerForm } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getEnumValues } from "../functions/enums";
import { defaultMapGetPlayer } from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postTransformationFire,
  postTransformationHasSubscriptions,
} from "./subscriptions/postTransformation";

const PLAYER_FORMS: readonly PlayerForm[] = getEnumValues(PlayerForm);

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
    ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postTransformationHasSubscriptions();
}

// ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const playerTransformationsMap = defaultMapGetPlayer(
    v.run.playersTransformationsMap,
    player,
  );

  for (const playerForm of PLAYER_FORMS) {
    const hasForm = player.HasPlayerForm(playerForm);
    const storedForm = playerTransformationsMap.getAndSetDefault(playerForm);

    if (hasForm !== storedForm) {
      playerTransformationsMap.set(playerForm, hasForm);
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
