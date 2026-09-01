import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostBombRenderFilter extends CustomCallback<ModCallbackCustom.POST_BOMB_RENDER_FILTER> {
  // ModCallback.POST_BOMB_RENDER (59)
  private readonly postBombUpdate = (
    bomb: EntityBomb,
    renderOffset: Vector,
  ) => {
    this.fire(bomb, renderOffset);
  };

  protected override shouldFire = shouldFireBomb;

  constructor() {
    super();

    this.callbacksUsed = [
      // 59
      [ModCallback.POST_BOMB_RENDER, this.postBombUpdate],
    ];
  }
}
