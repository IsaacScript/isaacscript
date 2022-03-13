import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex } from "../functions/player";
import { getPlayerHealthType } from "../functions/playerHealth";
import { getEnumValues } from "../functions/utils";
import { DefaultMap } from "../types/DefaultMap";
import { HealthType } from "../types/HealthType";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerChangeHealthFire,
  postPlayerChangeHealthHasSubscriptions,
} from "./subscriptions/postPlayerChangeHealth";

const v = {
  run: {
    playersHealthMap: new DefaultMap<PlayerIndex, Map<HealthType, int>>(
      () => new Map(),
    ),
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

  // We call the "getPlayerIndex" function with the "differentiateForgottenAndSoul" argument
  // If we don't differentiate between The Forgotten and The Soul,
  // the callback will fire every time the player switches between the two
  const playerIndex = getPlayerIndex(player, true);
  const playerHealthMap = v.run.playersHealthMap.getAndSetDefault(playerIndex);

  for (const healthType of getEnumValues(HealthType)) {
    const storedHealthValue = playerHealthMap.get(healthType);
    const currentHealthValue = getPlayerHealthType(player, healthType);
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
