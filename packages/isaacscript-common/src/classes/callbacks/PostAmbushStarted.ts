import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getAmbushType } from "../../functions/ambush";
import { shouldFireAmbush } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostAmbushStarted extends CustomCallback<ModCallbackCustom.POST_AMBUSH_STARTED> {
  public override v = {
    room: {
      ambushActive: false,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  protected override shouldFire = shouldFireAmbush;

  private postUpdate = (): void => {
    if (this.v.room.ambushActive) {
      return;
    }

    const room = game.GetRoom();
    const ambushActive = room.IsAmbushActive();
    if (!ambushActive) {
      return;
    }
    this.v.room.ambushActive = true;

    const ambushType = getAmbushType();
    if (ambushType !== undefined) {
      this.fire(ambushType);
    }
  };
}
