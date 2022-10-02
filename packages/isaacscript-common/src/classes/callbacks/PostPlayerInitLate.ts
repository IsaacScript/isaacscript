import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  setAddPlayer,
  setHasPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerInitLate extends CustomCallback<ModCallbackCustom2.POST_PLAYER_INIT_LATE> {
  public override v = {
    run: {
      playersFiredSet: new Set<PlayerIndex>(),
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
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    if (!setHasPlayer(this.v.run.playersFiredSet, player)) {
      setAddPlayer(this.v.run.playersFiredSet, player);
      this.fire(player);
    }
  };
}
