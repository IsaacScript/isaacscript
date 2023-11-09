import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { Feature } from "../../private/Feature";

const INSTANT_FADE_IN_SPEED = 1;

export class FadeInRemover extends Feature {
  private enabled = false;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GAME_STARTED_REORDERED,
        this.postGameStartedReordered,
        [undefined],
      ],
    ];
  }

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED
  private readonly postGameStartedReordered = () => {
    if (this.enabled) {
      game.Fadein(INSTANT_FADE_IN_SPEED);
    }
  };

  /**
   * Removes the fade-in that occurs at the beginning of a run. If this behavior is desired, call
   * this function once at the beginning of your mod.
   *
   * This is useful for debugging, when you are resetting the game often.
   *
   * You can restore the vanilla behavior with the `restoreFadeIn` function.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FADE_IN_REMOVER`.
   *
   * @public
   */
  @Exported
  public removeFadeIn(): void {
    this.enabled = true;
  }

  /**
   * Disables the fade-in remover. Only useful if you have previously called the `removeFadeIn`
   * function.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FADE_IN_REMOVER`.
   *
   * @public
   */
  @Exported
  public restoreFadeIn(): void {
    this.enabled = false;
  }
}
