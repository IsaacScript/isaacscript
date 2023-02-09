import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { KEYBOARD_VALUES } from "../../arrays/cachedEnumValues";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isKeyboardPressed } from "../../functions/input";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_KEYBOARD_CHANGED;

export class PostKeyboardChanged extends CustomCallback<T> {
  public override v = {
    run: {
      pressedKeys: new Set<Keyboard>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [keyboard, pressed] = fireArgs;
    const [callbackKeyboard, callbackPressed] = optionalArgs;

    return (
      (callbackKeyboard === undefined || callbackKeyboard === keyboard) &&
      (callbackPressed === undefined || callbackPressed === pressed)
    );
  };

  private postRender = () => {
    for (const keyboard of this.v.run.pressedKeys) {
      if (!isKeyboardPressed(keyboard)) {
        this.v.run.pressedKeys.delete(keyboard);
        this.fire(keyboard, false);
      }
    }

    for (const keyboard of KEYBOARD_VALUES) {
      if (this.v.run.pressedKeys.has(keyboard)) {
        continue;
      }

      if (isKeyboardPressed(keyboard)) {
        this.v.run.pressedKeys.add(keyboard);
        this.fire(keyboard, true);
      }
    }
  };
}
