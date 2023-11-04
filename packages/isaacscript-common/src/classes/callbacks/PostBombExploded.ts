import { ModCallback } from "isaac-typescript-definitions";
import { BOMB_EXPLODE_FRAME } from "../../core/constants";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostBombExploded extends CustomCallback<ModCallbackCustom.POST_BOMB_EXPLODED> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 58
      [ModCallback.POST_BOMB_UPDATE, this.postBombUpdate],
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.POST_BOMB_UPDATE (58)
  private readonly postBombUpdate = (bomb: EntityBomb): void => {
    if (bomb.FrameCount === BOMB_EXPLODE_FRAME) {
      this.fire(bomb);
    }
  };
}
