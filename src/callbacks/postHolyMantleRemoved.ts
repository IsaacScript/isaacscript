import { CollectibleType } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  defaultMapGetPlayer,
  defaultMapSetPlayer,
} from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postHolyMantleRemovedFire,
  postHolyMantleRemovedHasSubscriptions,
} from "./subscriptions/postHolyMantleRemoved";

const v = {
  run: {
    playersHolyMantleMap: new DefaultMap<PlayerIndex, int>(0),
  },
};

/** @internal */
export function postHolyMantleRemovedCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postHolyMantleRemoved", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postHolyMantleRemovedHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const effects = player.GetEffects();
  const newNumHolyMantles = effects.GetCollectibleEffectNum(
    CollectibleType.HOLY_MANTLE,
  );
  const oldNumHolyMantles = defaultMapGetPlayer(
    v.run.playersHolyMantleMap,
    player,
  );
  defaultMapSetPlayer(v.run.playersHolyMantleMap, player, newNumHolyMantles);

  if (newNumHolyMantles < oldNumHolyMantles) {
    postHolyMantleRemovedFire(player, oldNumHolyMantles, newNumHolyMantles);
  }
}
