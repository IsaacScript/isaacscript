import { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isAfterRoomFrame } from "../../functions/frames";
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
  private readonly postPEffectUpdateReordered = (
    player: EntityPlayer,
  ): void => {
    const effects = player.GetEffects();
    const newNumHolyMantles = effects.GetCollectibleEffectNum(
      CollectibleType.HOLY_MANTLE,
    );
    const oldNumHolyMantles = defaultMapGetPlayer(
      v.run.playersHolyMantleMap,
      player,
    );
    mapSetPlayer(v.run.playersHolyMantleMap, player, newNumHolyMantles);

    // We check for being after room frame 0 to prevent the callback from firing when the player
    // loses a lost curse from a white fire. (In this case, the player will have a Holy Mantle
    // effect from the lost curse, and then when losing the curse, they will also lose the Holy
    // Mantle.)
    if (newNumHolyMantles < oldNumHolyMantles && isAfterRoomFrame(0)) {
      this.fire(player, oldNumHolyMantles, newNumHolyMantles);
    }
  };
}
