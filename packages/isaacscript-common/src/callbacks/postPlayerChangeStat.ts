import { TearFlag } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { StatType } from "../enums";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { isBitSet128 } from "../functions/bitSet128";
import { colorEquals, isColor } from "../functions/color";
import { getEnumValues } from "../functions/enums";
import { getPlayerIndex } from "../functions/playerIndex";
import { getPlayerStat } from "../functions/playerStats";
import { isBoolean, isNumber } from "../functions/types";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerChangeStatFire,
  postPlayerChangeStatHasSubscriptions,
} from "./subscriptions/postPlayerChangeStat";

type PossibleStatType = number | boolean | BitFlags<TearFlag> | Color;

const v = {
  run: {
    playersStatMap: new DefaultMap<
      PlayerIndex,
      Map<StatType, PossibleStatType>
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

    if (storedStatValue === undefined) {
      continue;
    }

    if (!statEquals(storedStatValue, currentStatValue)) {
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

function statEquals(
  oldValue: PossibleStatType,
  newValue: PossibleStatType,
): boolean {
  const isNumberStat = isNumber(oldValue) && isNumber(newValue);
  if (isNumberStat) {
    return oldValue === newValue;
  }

  const isBooleanStat = isBoolean(oldValue) && isBoolean(newValue);
  if (isBooleanStat) {
    return oldValue === newValue;
  }

  const isBitSet128Stat = isBitSet128(oldValue) && isBitSet128(newValue);
  if (isBitSet128Stat) {
    return oldValue === newValue; // The class has the "__eq" meta-method.
  }

  const isColorStat = isColor(oldValue) && isColor(newValue);
  if (isColorStat) {
    return colorEquals(oldValue, newValue);
  }

  error(
    'Failed to determine the type of a stat in the "POST_PLAYER_CHANGE_STAT" callback.',
  );
}
