import { TearFlag } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { StatType } from "../enums";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerStat, isNumber } from "../functions";
import { getEnumValues } from "../functions/enums";
import { getPlayerIndex } from "../functions/playerIndex";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerChangeStatFire,
  postPlayerChangeStatHasSubscriptions,
} from "./subscriptions/postPlayerChangeStat";

const v = {
  run: {
    playersStatMap: new DefaultMap<
      PlayerIndex,
      Map<StatType, number | boolean | BitFlags<TearFlag> | Color | Vector>
    >(() => new Map()),
  },
};

export function postPlayerChangeStatInit(mod: ModUpgraded): void {
  saveDataManager("postPlayerChangeStat", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postPlayerChangeStatHasSubscriptions();
}

// ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // We call the "getPlayerIndex" function with the "differentiateForgottenAndSoul" argument. If we
  // don't differentiate between The Forgotten and The Soul, the callback will fire every time the
  // player switches between the two.
  const playerIndex = getPlayerIndex(player, true);
  const playerStatMap = v.run.playersStatMap.getAndSetDefault(playerIndex);

  for (const statType of getEnumValues(StatType)) {
    const storedStatValue = playerStatMap.get(statType);
    const currentStatValue = getPlayerStat(player, statType);
    playerStatMap.set(statType, currentStatValue);

    if (storedStatValue !== undefined && storedStatValue !== currentStatValue) {
      const isNumberStat =
        isNumber(storedStatValue) && isNumber(currentStatValue);
      const difference = isNumberStat ? currentStatValue - storedStatValue : 0;
      postPlayerChangeStatFire(
        player,
        statType,
        difference,
        storedStatValue,
        currentStatValue,
      );
    }
  }
}
