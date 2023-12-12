import type { Keyboard } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { KEYBOARD_VALUES } from "../../cachedEnumValues";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isKeyboardPressed } from "../../functions/input";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_KEYBOARD_CHANGED;

const v = {
  run: {
    pressedKeys: new Set<Keyboard>(),
  },
};

export class PostKeyboardChanged extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

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

  private readonly postRender = () => {
    for (const keyboard of v.run.pressedKeys) {
      if (!isKeyboardPressed(keyboard)) {
        v.run.pressedKeys.delete(keyboard);
        this.fire(keyboard, false);
      }
    }

    for (const keyboard of KEYBOARD_VALUES) {
      if (v.run.pressedKeys.has(keyboard)) {
        continue;
      }

      if (isKeyboardPressed(keyboard)) {
        v.run.pressedKeys.add(keyboard);
        this.fire(keyboard, true);
      }
    }
  };
}
