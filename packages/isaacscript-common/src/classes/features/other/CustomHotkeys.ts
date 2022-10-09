import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { isKeyboardPressed } from "../../../functions/input";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";

export class CustomHotkeys extends Feature {
  /**
   * The keys are the keyboard keys that trigger the hotkey. The values are the functions that
   * contain the arbitrary code to run.
   */
  private staticHotkeyFunctionMap = new Map<Keyboard, () => void>();

  /**
   * The keys are the functions that determine what the hotkey key is. The values are the functions
   * that contain the arbitrary code to run.
   */
  private dynamicHotkeyFunctionMap = new Map<
    () => Keyboard | undefined,
    () => void
  >();

  private keyPressedMap = new DefaultMap<Keyboard, boolean>(false);

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = () => {
    for (const [
      keyboard,
      triggerFunc,
    ] of this.staticHotkeyFunctionMap.entries()) {
      this.checkIfTriggered(keyboard, triggerFunc);
    }

    for (const [
      keyboardFunc,
      triggerFunc,
    ] of this.dynamicHotkeyFunctionMap.entries()) {
      const keyboard = keyboardFunc();
      if (keyboard !== undefined) {
        this.checkIfTriggered(keyboard, triggerFunc);
      }
    }
  };

  private checkIfTriggered(keyboard: Keyboard, triggerFunc: () => void) {
    const isPressed = isKeyboardPressed(keyboard);
    const wasPreviouslyPressed = this.keyPressedMap.getAndSetDefault(keyboard);
    this.keyPressedMap.set(keyboard, isPressed);

    if (isPressed && !wasPreviouslyPressed) {
      triggerFunc();
    }
  }

  /**
   * Helper function to run arbitrary code when you press and release a specific keyboard key.
   *
   * This can be used to easily set up custom hotkeys to facilitate custom game features or to
   * assist in debugging.
   *
   * This is different from the `setHotkey` function in that the keyboard activation key is not
   * hardcoded and is instead the return value of a provided function. This is useful for situations
   * where the key can change (like if end-users can specify a custom hotkey using Mod Config Menu).
   *
   * @param getKeyFunc The function that returns the key that will trigger the hotkey.
   * @param triggerFunc A function containing the arbitrary code that you want to execute when the
   *                    hotkey is triggered.
   */
  @Exported
  public setConditionalHotkey(
    getKeyFunc: () => Keyboard | undefined,
    triggerFunc: () => void,
  ): void {
    if (this.dynamicHotkeyFunctionMap.has(getKeyFunc)) {
      error(
        "Failed to register a hotkey due to a custom hotkey already being defined for the submitted function.",
      );
    }

    this.dynamicHotkeyFunctionMap.set(getKeyFunc, triggerFunc);
  }

  /**
   * Helper function to run arbitrary code when you press and release a specific keyboard key.
   *
   * This can be used to easily set up custom hotkeys to facilitate custom game features or to
   * assist in debugging.
   *
   * @param keyboard The key that you want to trigger the hotkey.
   * @param triggerFunc A function containing the arbitrary code that you want to execute when the
   *                    hotkey is triggered.
   */
  @Exported
  public setHotkey(keyboard: Keyboard, triggerFunc: () => void): void {
    if (this.staticHotkeyFunctionMap.has(keyboard)) {
      error(
        `Failed to register a hotkey due to a hotkey already being defined for: Keyboard.${Keyboard[keyboard]} (${keyboard})`,
      );
    }

    this.staticHotkeyFunctionMap.set(keyboard, triggerFunc);
  }

  /**
   * Helper function to remove a hotkey created with the `setConditionalHotkey` function.
   *
   * @param getKeyFunc Equal to the `getKeyFunc` that you passed when initially registering the
   *                   hotkey.
   */
  @Exported
  public unsetConditionalHotkey(getKeyFunc: () => Keyboard | undefined): void {
    if (!this.dynamicHotkeyFunctionMap.has(getKeyFunc)) {
      error(
        "Failed to unregister a hotkey since there is no existing hotkey defined for the submitted function.",
      );
    }

    this.dynamicHotkeyFunctionMap.delete(getKeyFunc);
  }

  /**
   * Helper function to remove a hotkey created with the `setHotkey` function.
   *
   * @param keyboard Equal to the keyboard value that you passed when initially registering the
   *                 hotkey.
   */
  @Exported
  public unsetHotkey(keyboard: Keyboard): void {
    if (!this.staticHotkeyFunctionMap.has(keyboard)) {
      error(
        `Failed to unregister a hotkey since there is no existing hotkey defined for: Keyboard.${Keyboard[keyboard]} (${keyboard})`,
      );
    }

    this.staticHotkeyFunctionMap.delete(keyboard);
  }
}
