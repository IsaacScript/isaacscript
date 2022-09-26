import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getAmbushType } from "../../functions/ambush";
import { CustomCallbackAmbush } from "./validation/CustomCallbackAmbush";

export class PostAmbushFinished extends CustomCallbackAmbush<ModCallbackCustom2.POST_AMBUSH_FINISHED> {
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
