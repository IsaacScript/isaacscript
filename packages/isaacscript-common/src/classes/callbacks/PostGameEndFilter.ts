import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBoolean } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGameEndFilter extends CustomCallback<ModCallbackCustom.POST_GAME_END_FILTER> {
  // ModCallback.POST_GAME_END (16)
  private readonly postGameEnd = (isGameOver: boolean) => {
    this.fire(isGameOver);
  };

  protected override shouldFire = shouldFireBoolean;

  constructor() {
    super();

    this.callbacksUsed = [
      // 16
      [ModCallback.POST_GAME_END, this.postGameEnd],
    ];
  }
}
