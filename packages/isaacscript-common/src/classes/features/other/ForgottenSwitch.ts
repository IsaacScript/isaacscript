import { ButtonAction } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { Feature } from "../../private/Feature";
import type { PressInput } from "./PressInput";

export class ForgottenSwitch extends Feature {
  /** @internal */
  public override v = {
    run: {
      shouldSwitch: false,
    },
  };

  private readonly pressInput: PressInput;

  /** @internal */
  constructor(pressInput: PressInput) {
    super();

    this.featuresUsed = [ISCFeature.PRESS_INPUT];

    this.pressInput = pressInput;
  }

  /**
   * When used on The Forgotten, switches to The Soul. When used on The Soul, switches to The
   * Forgotten. This takes 1 game frame to take effect.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FORGOTTEN_SWITCH`.
   */
  @Exported
  public forgottenSwitch(player: EntityPlayer): void {
    this.pressInput.pressInput(player, ButtonAction.DROP);
  }
}
