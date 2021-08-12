import { saveDataManager } from "../features/saveDataManager";
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
    ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED,
    postPlayerInitReorderedPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot change player type
  );

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
  const index = getPlayerIndex(player);
  const storedCharacter = v.run.characterMap.get(index);
  if (character !== storedCharacter) {
    v.run.characterMap.set(index, character);
    postPlayerChangeType.fire(player);
  }
}

// ModCallbacks.MC_POST_PLAYER_INIT_REORDERED
// PlayerVariant.PLAYER (0)
function postPlayerInitReorderedPlayer(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  const character = player.GetPlayerType();
  v.run.characterMap.set(playerIndex, character);
}
