import type { ButtonAction, InputHook } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.INPUT_ACTION_FILTER;

export class InputActionFilter extends CustomCallback<T> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 13
      [ModCallback.INPUT_ACTION, this.inputAction],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_entity, inputHook, buttonAction] = fireArgs;
    const [callbackInputHook, callbackButtonAction] = optionalArgs;

    return (
      (callbackInputHook === undefined || callbackInputHook === inputHook)
      && (callbackButtonAction === undefined
        || callbackButtonAction === buttonAction)
    );
  };

  // ModCallback.INPUT_ACTION (13)
  private readonly inputAction = (
    entity: Entity | undefined,
    inputHook: InputHook,
    buttonAction: ButtonAction,
  ): boolean | float | undefined => this.fire(entity, inputHook, buttonAction);
}
