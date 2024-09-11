import type { PlayerType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersCharacterMap: new DefaultMap<
      PlayerIndex,
      PlayerType,
      [character: PlayerType]
    >((character: PlayerType) => character), // eslint-disable-line complete/strict-enums
  },
};

export class PostPlayerChangeType extends CustomCallback<ModCallbackCustom.POST_PLAYER_CHANGE_TYPE> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectReordered = (player: EntityPlayer) => {
    const character = player.GetPlayerType();
    const storedCharacter = defaultMapGetPlayer(
      v.run.playersCharacterMap,
      player,
      character,
    );
    if (character !== storedCharacter) {
      mapSetPlayer(v.run.playersCharacterMap, player, character);
      this.fire(player, storedCharacter, character);
    }
  };
}
