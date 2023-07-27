import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostBombInitFilter extends CustomCallback<ModCallbackCustom.POST_BOMB_INIT_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 57
      [ModCallback.POST_BOMB_INIT, this.postBombInit],
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.POST_BOMB_INIT (57)
  private readonly postBombInit = (bomb: EntityBomb) => {
    this.fire(bomb);
  };
}
