import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getAmbushType } from "../../functions/ambush";
import { CustomCallbackAmbush } from "./validation/CustomCallbackAmbush";

export class PostAmbushStarted extends CustomCallbackAmbush<ModCallbackCustom2.POST_AMBUSH_STARTED> {
  override v = {
    room: {
      ambushActive: false,
    },
  };

  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  postUpdate = (): void => {
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
