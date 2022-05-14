import { PlayerType } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
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
    ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postPlayerChangeTypeHasSubscriptions();
}

// ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
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
