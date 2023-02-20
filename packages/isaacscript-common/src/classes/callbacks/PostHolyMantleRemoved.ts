import { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersHolyMantleMap: new DefaultMap<PlayerIndex, int>(0),
  },
};

export class PostHolyMantleRemoved extends CustomCallback<ModCallbackCustom.POST_HOLY_MANTLE_REMOVED> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer): void => {
    const effects = player.GetEffects();
    const newNumHolyMantles = effects.GetCollectibleEffectNum(
      CollectibleType.HOLY_MANTLE,
    );
    const oldNumHolyMantles = defaultMapGetPlayer(
      v.run.playersHolyMantleMap,
      player,
    );
    mapSetPlayer(v.run.playersHolyMantleMap, player, newNumHolyMantles);

    if (newNumHolyMantles < oldNumHolyMantles) {
      this.fire(player, oldNumHolyMantles, newNumHolyMantles);
    }
  };
}
