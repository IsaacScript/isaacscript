import { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostHolyMantleRemoved extends CustomCallback<ModCallbackCustom2.POST_HOLY_MANTLE_REMOVED> {
  public override v = {
    run: {
      playersHolyMantleMap: new DefaultMap<PlayerIndex, int>(0),
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectUpdateReordered],
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer): void => {
    const effects = player.GetEffects();
    const newNumHolyMantles = effects.GetCollectibleEffectNum(
      CollectibleType.HOLY_MANTLE,
    );
    const oldNumHolyMantles = defaultMapGetPlayer(
      this.v.run.playersHolyMantleMap,
      player,
    );
    mapSetPlayer(this.v.run.playersHolyMantleMap, player, newNumHolyMantles);

    if (newNumHolyMantles < oldNumHolyMantles) {
      this.fire(player, oldNumHolyMantles, newNumHolyMantles);
    }
  };
}
