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
    // We cannot use a nested `DefaultMap` here.
    playersTransformationsMap: new DefaultMap<
      PlayerIndex,
      Map<PlayerForm, boolean>
    >(() => new Map()),
  },
};

export function postTransformationInit(mod: ModUpgraded): void {
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
    let storedForm = playerTransformationsMap.get(playerForm);
    if (storedForm === undefined) {
      storedForm = false;
    }

    if (hasForm !== storedForm) {
      playerTransformationsMap.set(playerForm, hasForm);
      postTransformationFire(player, playerForm, hasForm);
    }
  }
}
