import { saveDataManager } from "../features/saveDataManager/main";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import ModCallbacksCustom from "../types/ModCallbacksCustom";
import ModUpgraded from "../types/ModUpgraded";
import * as postPlayerChangeType from "./subscriptions/postPlayerChangeType";

const v = {
  run: {
    characterMap: new Map<PlayerIndex, int>(),
  },
};

export function init(mod: ModUpgraded): void {
  saveDataManager("postPlayerChangeTypeCallback", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED,
    postPlayerUpdateReorderedPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot change player type
  );
}

function hasSubscriptions() {
  return postPlayerChangeType.hasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED
// PlayerVariant.PLAYER (0)
function postPlayerUpdateReorderedPlayer(player: EntityPlayer): void {
  if (!hasSubscriptions()) {
    return;
  }

  const character = player.GetPlayerType();
  const playerIndex = getPlayerIndex(player);

  const storedCharacter = v.run.characterMap.get(playerIndex);
  if (storedCharacter !== undefined) {
    v.run.characterMap.set(playerIndex, character);
    return;
  }

  if (character !== storedCharacter) {
    v.run.characterMap.set(playerIndex, character);
    postPlayerChangeType.fire(player);
  }
}
