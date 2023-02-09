import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { KEYBOARD_VALUES } from "../../arrays/cachedEnumValues";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isKeyboardPressed } from "../../functions/input";
import { CustomCallback } from "../private/CustomCallback";

export class PostKeyboardPressed extends CustomCallback<ModCallbackCustom.POST_KEYBOARD_PRESSED> {
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
    fireArgs: [keyboard: Keyboard],
    optionalArgs: [keyboard?: Keyboard],
  ): boolean => {
    const [keyboard] = fireArgs;
    const [callbackKeyboard] = optionalArgs;

    return callbackKeyboard === undefined || callbackKeyboard === keyboard;
  };

  private postRender = () => {
    for (const keyboard of this.v.run.pressedKeys) {
      if (!isKeyboardPressed(keyboard)) {
        this.v.run.pressedKeys.delete(keyboard);
      }
    }

    for (const keyboard of KEYBOARD_VALUES) {
      if (this.v.run.pressedKeys.has(keyboard)) {
        continue;
      }

      if (isKeyboardPressed(keyboard)) {
        this.v.run.pressedKeys.add(keyboard);
        this.fire(keyboard);
      }
    }
  };
}
