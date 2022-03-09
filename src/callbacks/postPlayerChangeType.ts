import { saveDataManager } from "../features/saveDataManager/exports";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { DefaultMap } from "../types/DefaultMap";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerChangeTypeFire,
  postPlayerChangeTypeHasSubscriptions,
} from "./subscriptions/postPlayerChangeType";

const v = {
  run: {
    playersCharacterMap: new DefaultMap<
      PlayerIndex,
      int,
      [character: PlayerType]
    >((_key: PlayerIndex, character: PlayerType) => character),
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
  const storedCharacter = defaultMapGetPlayer(
    v.run.playersCharacterMap,
    player,
    character,
  );
  if (character !== storedCharacter) {
    mapSetPlayer(v.run.playersCharacterMap, player, character);
    postPlayerChangeTypeFire(player, storedCharacter, character);
  }
}
