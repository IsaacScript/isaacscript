import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBoolean } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGameEndFilter extends CustomCallback<ModCallbackCustom.POST_GAME_END_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 16
      [ModCallback.POST_GAME_END, this.postGameEnd],
    ];
  }

  protected override shouldFire = shouldFireBoolean;

  // ModCallback.POST_GAME_END (16)
  private readonly postGameEnd = (isGameOver: boolean) => {
    this.fire(isGameOver);
  };
}
