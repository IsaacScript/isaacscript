import { PLAYER_STAT_VALUES } from "../../arrays/cachedEnumValues";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { PlayerStat } from "../../enums/PlayerStat";
import { isBitSet128 } from "../../functions/bitSet128";
import { colorEquals, isColor } from "../../functions/color";
import { getPlayerIndex } from "../../functions/playerIndex";
import { getPlayerStat } from "../../functions/stats";
import { isBoolean, isNumber } from "../../functions/types";
import { isVector, vectorEquals } from "../../functions/vector";
import { shouldFirePlayer } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import type { PossibleStatType } from "../../types/PossibleStatType";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersStatMap: new DefaultMap<
      PlayerIndex,
      Map<PlayerStat, PossibleStatType>
    >(() => new Map()),
  },
};

export class PostPlayerChangeStat extends CustomCallback<ModCallbackCustom.POST_PLAYER_CHANGE_STAT> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectReordered = (player: EntityPlayer) => {
    // We call the "getPlayerIndex" function with the "differentiateForgottenAndSoul" argument. If
    // we don't differentiate between The Forgotten and The Soul, the callback will fire every time
    // the player switches between the two.
    const playerIndex = getPlayerIndex(player, true);
    const playerStatMap = v.run.playersStatMap.getAndSetDefault(playerIndex);

    for (const statType of PLAYER_STAT_VALUES) {
      const storedStatValue = playerStatMap.get(statType);
      const currentStatValue = getPlayerStat(player, statType);
      playerStatMap.set(statType, currentStatValue);

      if (storedStatValue === undefined) {
        continue;
      }

      if (!statEquals(storedStatValue, currentStatValue)) {
        const isNumberStat =
          isNumber(storedStatValue) && isNumber(currentStatValue);
        const difference = isNumberStat
          ? currentStatValue - storedStatValue
          : 0;
        this.fire(
          player,
          statType,
          difference,
          storedStatValue,
          currentStatValue,
        );
      }
    }
  };
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

  const isVectorStat = isVector(oldValue) && isVector(newValue);
  if (isVectorStat) {
    return vectorEquals(oldValue, newValue);
  }

  error(
    'Failed to determine the type of a stat in the "POST_PLAYER_CHANGE_STAT" callback.',
  );
}
