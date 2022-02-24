import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ensureAllCases, getEnumValues } from "../functions/utils";
import { HealthType } from "../types/HealthType";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postPlayerChangeHealthFire,
  postPlayerChangeHealthHasSubscriptions,
} from "./subscriptions/postPlayerChangeHealth";

const v = {
  run: {
    playersHealthMap: new Map<PlayerIndex, Map<HealthType, int>>(),
  },
};

/** @internal */
export function postPlayerChangeHealthCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postPlayerChangeHealth", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postPlayerChangeHealthHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  let playerHealthMap = v.run.playersHealthMap.get(playerIndex);
  if (playerHealthMap === undefined) {
    playerHealthMap = new Map();
    v.run.playersHealthMap.set(playerIndex, playerHealthMap);
  }

  const healthTypes = getEnumValues(HealthType);
  for (const healthType of healthTypes) {
    const storedHealthValue = playerHealthMap.get(healthType);
    const currentHealthValue = getCurrentHealthValue(player, healthType);
    playerHealthMap.set(healthType, currentHealthValue);

    if (
      storedHealthValue !== undefined &&
      storedHealthValue !== currentHealthValue
    ) {
      const amount = currentHealthValue - storedHealthValue;
      postPlayerChangeHealthFire(player, healthType, amount);
    }
  }
}

function getCurrentHealthValue(player: EntityPlayer, healthType: HealthType) {
  switch (healthType) {
    // 5.10.1
    case HealthType.RED: {
      return player.GetHearts();
    }

    // 5.10.3
    case HealthType.SOUL: {
      return player.GetSoulHearts();
    }

    // 5.10.4
    case HealthType.ETERNAL: {
      return player.GetEternalHearts();
    }

    // 5.10.6
    case HealthType.BLACK: {
      return player.GetBlackHearts();
    }

    // 5.10.7
    case HealthType.GOLDEN: {
      return player.GetGoldenHearts();
    }

    // 5.10.11
    case HealthType.BONE: {
      return player.GetBoneHearts();
    }

    // 5.10.12
    case HealthType.ROTTEN: {
      return player.GetRottenHearts();
    }

    case HealthType.MAX_HEARTS: {
      return player.GetMaxHearts();
    }

    default: {
      return ensureAllCases(healthType);
    }
  }
}
