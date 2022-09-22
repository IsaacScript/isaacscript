import { ModCallback } from "isaac-typescript-definitions";
import { BOMB_EXPLODE_FRAME } from "../../core/constants";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackBomb } from "./validation/CustomCallbackBomb";

export class PostBombExploded extends CustomCallbackBomb<ModCallbackCustom2.POST_BOMB_EXPLODED> {
  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_BOMB_UPDATE, [this.postBombUpdate]], // 58
    ];
  }

  // ModCallback.POST_BOMB_UPDATE (58)
  postBombUpdate = (bomb: EntityBomb): void => {
    if (bomb.FrameCount === BOMB_EXPLODE_FRAME) {
      this.fire(bomb);
    }
  };
}
