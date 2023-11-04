import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostBombUpdateFilter extends CustomCallback<ModCallbackCustom.POST_BOMB_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 58
      [ModCallback.POST_BOMB_UPDATE, this.postBombUpdate],
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.POST_BOMB_UPDATE (58)
  private readonly postBombUpdate = (bomb: EntityBomb) => {
    this.fire(bomb);
  };
}
