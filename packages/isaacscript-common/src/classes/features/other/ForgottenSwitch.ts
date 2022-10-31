import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { Feature } from "../../private/Feature";

export class ForgottenSwitch extends Feature {
  /** @internal */
  public override v = {
    run: {
      shouldSwitch: false,
    },
  };

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.INPUT_ACTION,
        [this.isActionTriggered, InputHook.IS_ACTION_TRIGGERED],
      ], // 13
    ];
  }

  // ModCallback.INPUT_ACTION (13)
  // InputHook.IS_ACTION_TRIGGERED (1)
  private isActionTriggered = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => {
    if (buttonAction === ButtonAction.DROP && this.v.run.shouldSwitch) {
      this.v.run.shouldSwitch = false;
      return true;
    }

    return undefined;
  };

  /**
   * When used on The Forgotten, switches to The Soul. When used on The Soul, switches to The
   * Forgotten. This takes 1 game frame to take effect.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FORGOTTEN_SWITCH`.
   */
  @Exported
  public forgottenSwitch(): void {
    this.v.run.shouldSwitch = true;
  }
}
