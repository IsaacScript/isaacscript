import { ModCallback } from "isaac-typescript-definitions";
import { BOMB_EXPLODE_FRAME } from "../../core/constants";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostBombExploded extends CustomCallback<ModCallbackCustom2.POST_BOMB_EXPLODED> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_BOMB_UPDATE, [this.postBombUpdate]], // 58
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.POST_BOMB_UPDATE (58)
  private postBombUpdate = (bomb: EntityBomb): void => {
    if (bomb.FrameCount === BOMB_EXPLODE_FRAME) {
      this.fire(bomb);
    }
  };
}
