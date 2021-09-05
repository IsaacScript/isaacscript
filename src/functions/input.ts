import { MAX_NUM_INPUTS } from "../constants";

/**
 * Iterates over all 4 inputs to see if a particular button is pressed (i.e. held down).
 */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  for (let i = 0; i < MAX_NUM_INPUTS; i++) {
    if (Input.IsActionPressed(buttonAction, i)) {
      return true;
    }
  }

  return false;
}

/**
 * Iterates over all 4 inputs to see if a particular button is triggered
 * (i.e. held down and then released).
 */
export function isActionTriggeredOnAnyInput(
  buttonAction: ButtonAction,
): boolean {
  for (let i = 0; i < MAX_NUM_INPUTS; i++) {
    if (Input.IsActionTriggered(buttonAction, i)) {
      return true;
    }
  }

  return false;
}

export function isKeyboardPressed(key: Keyboard): boolean {
  return Input.IsButtonPressed(key, ControllerIndex.KEYBOARD);
}

/** Helper function to get the enum name for the specified `Keyboard` value. */
export function keyboardToString(keyboard: Keyboard): string {
  for (const [keyName, keyCode] of pairs(Keyboard)) {
    if (keyCode === keyboard) {
      const withoutPrefix = keyName.slice("KEY_".length);
      const [withoutUnderscores] = string.gsub(withoutPrefix, "_", " ");
      return withoutUnderscores;
    }
  }

  return "unknown";
}
