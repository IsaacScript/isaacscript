import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  setAddPlayer,
  setHasPlayer,
} from "../../functions/playerDataStructures";
import { shouldFirePlayer } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersFiredSet: new Set<PlayerIndex>(),
  },
};

export class PostPlayerInitLate extends CustomCallback<ModCallbackCustom.POST_PLAYER_INIT_LATE> {
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
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    if (!setHasPlayer(v.run.playersFiredSet, player)) {
      setAddPlayer(v.run.playersFiredSet, player);
      this.fire(player);
    }
  };
}
