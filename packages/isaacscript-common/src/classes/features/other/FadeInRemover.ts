import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { Feature } from "../../private/Feature";

const FADE_IN_SPEED = 1;

export class FadeInRemover extends Feature {
  private enabled = false;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_GAME_STARTED, [this.postGameStarted]], // 15
    ];
  }

  // ModCallback.POST_GAME_STARTED (15)
  private postGameStarted = (_isContinued: boolean) => {
    if (this.enabled) {
      game.Fadein(FADE_IN_SPEED);
    }
  };

  /**
   * Removes the fade-in that occurs at the beginning of a run. If this behavior is desired, call
   * this function once at the beginning of your mod.
   *
   * This is useful for debugging, when you are resetting the game often.
   *
   * You can restore the vanilla behavior with the `restoreFadeIn` function.
   */
  @Exported
  public removeFadeIn(): void {
    this.enabled = true;
  }

  /**
   * Disables the fade-in remover. Only useful if you have previously called the `removeFadeIn`
   * function.
   */
  @Exported
  public restoreFadeIn(): void {
    this.enabled = false;
  }
}
