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

type T = ModCallbackCustom.INPUT_ACTION_PLAYER;

export class InputActionPlayer extends CustomCallback<T> {
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
    const [player, inputHook, buttonAction] = fireArgs;
    const [
      callbackPlayerVariant,
      callbackCharacter,
      callbackInputHook,
      callbackButtonAction,
    ] = optionalArgs;

    const character = player.GetPlayerType();

    return (
      (callbackPlayerVariant === undefined ||
        callbackPlayerVariant === player.Variant) &&
      (callbackCharacter === undefined || callbackCharacter === character) &&
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
  ): boolean | float | undefined => {
    if (entity === undefined) {
      return undefined;
    }

    const player = entity.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    return this.fire(player, inputHook, buttonAction);
  };
}
