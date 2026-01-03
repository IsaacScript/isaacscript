import { ButtonAction, ModCallback } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import {
  isActionTriggeredOnAnyInput,
  isModifierKeyPressed,
} from "../../../functions/input";
import { restart } from "../../../functions/run";
import { isRepentancePlus } from "../../../functions/utils";
import { Feature } from "../../private/Feature";

/** A global variable set by custom consoles. */
declare let AwaitingTextInput: boolean;

export class FastReset extends Feature {
  private enabled = false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  // ModCallback.POST_RENDER (2)
  private readonly postRender = () => {
    if (!this.enabled) {
      return;
    }

    checkResetInput();
  };

  /**
   * Enables the fast-reset feature, which allows you to restart the game instantaneously. If this
   * behavior is desired, call this function once at the beginning of your mod.
   *
   * This is useful for debugging, when you are resetting the game often.
   *
   * You can disable the fast-reset feature with the `disableFastReset` function.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FAST_RESET`.
   *
   * @public
   */
  @Exported
  public enableFastReset(): void {
    this.enabled = true;
  }

  /**
   * Disables the fast-reset feature. Only useful if you have previously called the
   * `enableFastReset` function.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FAST_RESET`.
   *
   * @public
   */
  @Exported
  public disableFastReset(): void {
    this.enabled = false;
  }
}

/** Check for fast-reset inputs. */
function checkResetInput() {
  const isPaused = game.IsPaused();

  // Disable the fast-reset feature if the console is open. (This will also disable the feature when
  // the game is paused, but that's okay as well.)
  if (isPaused) {
    return;
  }

  // Disable the fast-reset feature if any custom consoles are open.
  if (AwaitingTextInput) {
    return;
  }

  // Don't fast-reset if any modifiers are pressed.
  if (isModifierKeyPressed()) {
    return;
  }

  // Check to see if the player has pressed the restart input. (We check all inputs instead of
  // `player.ControllerIndex` because a controller player might be using the keyboard to reset.)
  const buttonActionRestart = isRepentancePlus()
    ? ButtonAction.RESTART_REPENTANCE_PLUS
    : ButtonAction.RESTART_REPENTANCE;
  if (isActionTriggeredOnAnyInput(buttonActionRestart)) {
    restart();
  }
}
