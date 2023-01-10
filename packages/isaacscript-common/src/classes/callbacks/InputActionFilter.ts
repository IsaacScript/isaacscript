import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.INPUT_ACTION_FILTER;

export class InputActionFilter extends CustomCallback<T> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 13
      [ModCallback.INPUT_ACTION, this.inputAction],
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_, inputHook, buttonAction] = fireArgs;
    const [callbackInputHook, callbackButtonAction] = optionalArgs;

    return (
      (callbackInputHook === undefined || callbackInputHook === inputHook) &&
      (callbackButtonAction === undefined ||
        callbackButtonAction === buttonAction)
    );
  };

  // ModCallback.INPUT_ACTION (13)
  private inputAction = (
    entity: Entity | undefined,
    inputHook: InputHook,
    buttonAction: ButtonAction,
  ): boolean | float | undefined => this.fire(entity, inputHook, buttonAction);
}
