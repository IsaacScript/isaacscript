import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  setAddPlayer,
  setHasPlayer,
} from "../../functions/playerDataStructures";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PostPlayerInitLate extends CustomCallbackPlayer<ModCallbackCustom2.POST_PLAYER_INIT_LATE> {
  public override v = {
    run: {
      playersFiredSet: new Set<PlayerIndex>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PEFFECT_UPDATE, [this.postPEffectUpdate]], // 4
    ];
  }

  // ModCallback.POST_PEFFECT_UPDATE
  private postPEffectUpdate = (player: EntityPlayer) => {
    if (!setHasPlayer(this.v.run.playersFiredSet, player)) {
      setAddPlayer(this.v.run.playersFiredSet, player);
      this.fire(player);
    }
  };
}
