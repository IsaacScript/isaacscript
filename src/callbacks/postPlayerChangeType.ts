import { saveDataManager } from "../features/saveDataManager";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import * as postPlayerChangeType from "./subscriptions/postPlayerChangeType";

const v = {
  run: {
    characterMap: new LuaTable<PlayerIndex, int>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPlayerChangeTypeCallback", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_INIT,
    postPlayerInitPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot change player type
  ); // 9

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_UPDATE,
    postPlayerUpdatePlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot change player type
  ); // 31
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
// PlayerVariant.PLAYER (0)
function postPlayerInitPlayer(player: EntityPlayer) {
  if (!postPlayerChangeType.hasSubscriptions()) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  const character = player.GetPlayerType();
  v.run.characterMap.set(playerIndex, character);
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
// PlayerVariant.PLAYER (0)
function postPlayerUpdatePlayer(player: EntityPlayer): void {
  if (!postPlayerChangeType.hasSubscriptions()) {
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
