import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getAmbushType } from "../../functions/ambush";
import { shouldFireAmbush } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    ambushActive: false,
  },
};

export class PostAmbushStarted extends CustomCallback<ModCallbackCustom.POST_AMBUSH_STARTED> {
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
    if (v.room.ambushActive) {
      return;
    }

    const room = game.GetRoom();
    const ambushActive = room.IsAmbushActive();
    if (!ambushActive) {
      return;
    }
    v.room.ambushActive = true;

    const ambushType = getAmbushType();
    if (ambushType !== undefined) {
      this.fire(ambushType);
    }
  };
}
