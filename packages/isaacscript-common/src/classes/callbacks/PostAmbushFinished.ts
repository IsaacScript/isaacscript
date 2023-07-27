import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getAmbushType } from "../../functions/ambush";
import { shouldFireAmbush } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    ambushDone: false,
  },
};

export class PostAmbushFinished extends CustomCallback<ModCallbackCustom.POST_AMBUSH_FINISHED> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  protected override shouldFire = shouldFireAmbush;

  private readonly postUpdate = (): void => {
    if (v.room.ambushDone) {
      return;
    }

    const room = game.GetRoom();
    const ambushDone = room.IsAmbushDone();
    if (!ambushDone) {
      return;
    }
    v.room.ambushDone = true;

    const ambushType = getAmbushType();
    if (ambushType !== undefined) {
      this.fire(ambushType);
    }
  };
}
