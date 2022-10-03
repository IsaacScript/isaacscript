import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  setAddPlayer,
  setHasPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerInitLate extends CustomCallback<ModCallbackCustom.POST_PLAYER_INIT_LATE> {
  public override v = {
    run: {
      playersFiredSet: new Set<PlayerIndex>(),
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectUpdateReordered],
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    if (!setHasPlayer(this.v.run.playersFiredSet, player)) {
      setAddPlayer(this.v.run.playersFiredSet, player);
      this.fire(player);
    }
  };
}
