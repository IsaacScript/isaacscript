import { saveDataManager } from "../features/saveDataManager";
import { getPlayerIndex, getPlayers, PlayerIndex } from "../functions/player";
import * as postPlayerChangeType from "./subscriptions/postPlayerChangeType";

const v = {
  run: {
    characterMap: new LuaTable<PlayerIndex, int>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPlayerChangeTypeCallback", v);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate(): void {
  if (!postPlayerChangeType.hasSubscriptions()) {
    return;
  }

  // We must perform exclusions in the "getPlayers()" function because we don't want to track two
  // different players on the same controller index
  for (const player of getPlayers(true)) {
    const character = player.GetPlayerType();
    const index = getPlayerIndex(player);
    const storedCharacter = v.run.characterMap.get(index);
    if (character !== storedCharacter) {
      v.run.characterMap.set(index, character);

      // The callback should not fire for characters that join midway through a run
      if (storedCharacter !== undefined) {
        postPlayerChangeType.fire(player);
      }
    }
  }
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  if (!postPlayerChangeType.hasSubscriptions()) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  const character = player.GetPlayerType();
  v.run.characterMap.set(playerIndex, character);
}
