import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerChangeTypeFire,
  postPlayerChangeTypeHasSubscriptions,
} from "./subscriptions/postPlayerChangeType";

const v = {
  run: {
    characterMap: new Map<PlayerIndex, int>(),
  },
};

/** @internal */
export function postPlayerChangeTypeCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postPlayerChangeType", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postPlayerChangeTypeHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const character = player.GetPlayerType();
  const playerIndex = getPlayerIndex(player);

  const storedCharacter = v.run.characterMap.get(playerIndex);
  if (storedCharacter === undefined) {
    v.run.characterMap.set(playerIndex, character);
    return;
  }

  if (character !== storedCharacter) {
    v.run.characterMap.set(playerIndex, character);
    postPlayerChangeTypeFire(player, storedCharacter, character);
  }
}
