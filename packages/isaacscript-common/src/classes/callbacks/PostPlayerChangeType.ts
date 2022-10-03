import { PlayerType } from "isaac-typescript-definitions";
import { postPlayerChangeTypeFire } from "../../callbacks/subscriptions/postPlayerChangeType";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerChangeType extends CustomCallback<ModCallbackCustom.POST_PLAYER_CHANGE_TYPE> {
  public override v = {
    run: {
      playersCharacterMap: new DefaultMap<
        PlayerIndex,
        PlayerType,
        [character: PlayerType]
      >((character: PlayerType) => character), // eslint-disable-line isaacscript/strict-enums
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectReordered],
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectReordered = (player: EntityPlayer) => {
    const character = player.GetPlayerType();
    const storedCharacter = defaultMapGetPlayer(
      this.v.run.playersCharacterMap,
      player,
      character,
    );
    if (character !== storedCharacter) {
      mapSetPlayer(this.v.run.playersCharacterMap, player, character);
      postPlayerChangeTypeFire(player, storedCharacter, character);
    }
  };
}
