import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getAmbushType } from "../../functions/ambush";
import { shouldFireAmbush } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostAmbushFinished extends CustomCallback<ModCallbackCustom.POST_AMBUSH_FINISHED> {
  public override v = {
    room: {
      ambushDone: false,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFireAmbush;

  private postUpdate = (): void => {
    if (this.v.room.ambushDone) {
      return;
    }

    const room = game.GetRoom();
    const ambushDone = room.IsAmbushDone();
    if (!ambushDone) {
      return;
    }
    this.v.room.ambushDone = true;

    const ambushType = getAmbushType();
    if (ambushType !== undefined) {
      this.fire(ambushType);
    }
  };
}
