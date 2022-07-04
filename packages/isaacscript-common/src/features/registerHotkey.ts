import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { isKeyboardPressed } from "../functions/input";

const FEATURE_NAME = "registerHotkeys";

const hotkeyFunctionMap = new Map<Keyboard, () => void>();
const keyPressedMap = new DefaultMap<Keyboard, boolean>(false);

/** @internal */
export function registerHotkeyInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

// ModCallback.POST_RENDER (2)
function postRender() {
  for (const [keyboard, func] of hotkeyFunctionMap.entries()) {
    const isPressed = isKeyboardPressed(keyboard);
    const wasPreviouslyPressed = keyPressedMap.getAndSetDefault(keyboard);
    keyPressedMap.set(keyboard, isPressed);

    if (isPressed && !wasPreviouslyPressed) {
      func();
    }
  }
}

export function registerHotkey(keyboard: Keyboard, func: () => void): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (hotkeyFunctionMap.has(keyboard)) {
    error(
      `Failed to register a hotkey for key Keyboard.${Keyboard[keyboard]} (${keyboard}) due to a custom hotkey already being defined for that key.`,
    );
  }

  hotkeyFunctionMap.set(keyboard, func);
}

export function unregisterHotkey(keyboard: Keyboard): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (!hotkeyFunctionMap.has(keyboard)) {
    error(
      `Failed to unregister a hotkey for key Keyboard.${Keyboard[keyboard]} (${keyboard}) due to no function being defined for that key.`,
    );
  }

  hotkeyFunctionMap.delete(keyboard);
}
