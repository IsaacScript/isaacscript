import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { isKeyboardPressed } from "../functions/input";
import { isFunction } from "../functions/types";

const FEATURE_NAME = "registerHotkeys";

/**
 * The keys are the keyboard keys that trigger the hotkey. The values are the functions that contain
 * the arbitrary code to run.
 */
const staticHotkeyFunctionMap = new Map<Keyboard, () => void>();

/**
 * The keys are the functions that determine what the hotkey key is. The values are the functions
 * that contain the arbitrary code to run.
 */
const dynamicHotkeyFunctionMap = new Map<
  () => Keyboard | undefined,
  () => void
>();

const keyPressedMap = new DefaultMap<Keyboard, boolean>(false);

/** @internal */
export function registerHotkeyInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

// ModCallback.POST_RENDER (2)
function postRender() {
  for (const [keyboard, triggerFunc] of staticHotkeyFunctionMap.entries()) {
    checkIfTriggered(keyboard, triggerFunc);
  }

  for (const [
    keyboardFunc,
    triggerFunc,
  ] of dynamicHotkeyFunctionMap.entries()) {
    const keyboard = keyboardFunc();
    if (keyboard !== undefined) {
      checkIfTriggered(keyboard, triggerFunc);
    }
  }
}

function checkIfTriggered(keyboard: Keyboard, triggerFunc: () => void) {
  const isPressed = isKeyboardPressed(keyboard);
  const wasPreviouslyPressed = keyPressedMap.getAndSetDefault(keyboard);
  keyPressedMap.set(keyboard, isPressed);

  if (isPressed && !wasPreviouslyPressed) {
    triggerFunc();
  }
}

/**
 * Helper function to run arbitrary code when you press and release a specific keyboard key.
 *
 * This can be used to easily set up custom hotkeys to facilitate custom game features or to assist
 * in debugging.
 *
 * @param keyboardOrFunc Either the key that you want to trigger the hotkey or a function that
 *                       returns the key that will trigger the hotkey. Normally, you would just
 *                       specify the key directly, but you can use a function for situations where
 *                       the key can change (like if end-users can specify a custom hotkey using Mod
 *                       Config Menu).
 * @param triggerFunc A function containing the arbitrary code that you want to execute when the
 *                    hotkey is triggered.
 */
export function registerHotkey(
  keyboardOrFunc: Keyboard | (() => Keyboard | undefined),
  triggerFunc: () => void,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (isFunction(keyboardOrFunc)) {
    if (dynamicHotkeyFunctionMap.has(keyboardOrFunc)) {
      error(
        "Failed to register a hotkey due to a custom hotkey already being defined for the submitted function.",
      );
    }

    dynamicHotkeyFunctionMap.set(keyboardOrFunc, triggerFunc);
  } else {
    if (staticHotkeyFunctionMap.has(keyboardOrFunc)) {
      error(
        `Failed to register a hotkey due to a hotkey already being defined for key: Keyboard.${Keyboard[keyboardOrFunc]} (${keyboardOrFunc})`,
      );
    }

    staticHotkeyFunctionMap.set(keyboardOrFunc, triggerFunc);
  }
}

/**
 * Helper function to remove a hotkey created with the `registerHotkey` function.
 *
 * @param keyboardOrFunc Equal to the value that you passed when initially registering the hotkey.
 */
export function unregisterHotkey(
  keyboardOrFunc: Keyboard | (() => Keyboard | undefined),
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (isFunction(keyboardOrFunc)) {
    if (!dynamicHotkeyFunctionMap.has(keyboardOrFunc)) {
      error(
        "Failed to unregister a hotkey since there is no existing hotkey defined for the submitted function.",
      );
    }

    dynamicHotkeyFunctionMap.delete(keyboardOrFunc);
  } else {
    if (!staticHotkeyFunctionMap.has(keyboardOrFunc)) {
      error(
        `Failed to unregister a hotkey since there is no existing hotkey defined for key: Keyboard.${Keyboard[keyboardOrFunc]} (${keyboardOrFunc})`,
      );
    }

    staticHotkeyFunctionMap.delete(keyboardOrFunc);
  }
}
