import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { Feature } from "../../private/Feature";

export class PressInput extends Feature {
  /** @internal */
  public override v = {
    run: {
      pressButtonAction: new Set(),
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
    if (!this.v.run.pressButtonAction.has(buttonAction)) {
      return undefined;
    }

    this.v.run.pressButtonAction.delete(buttonAction);
    return true;
  };

  /**
   * Helper function to press an arbitrary `ButtonAction` on the next possible input poll. In most
   * cases, this will be equivalent to if the first player pressed the corresponding input. It
   * usually takes 1 frame for the input to take effect.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PRESS_INPUT`.
   */
  @Exported
  public pressInput(buttonAction: ButtonAction): void {
    this.v.run.pressButtonAction.add(buttonAction);
  }
}
