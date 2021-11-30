import {
  MAX_NUM_INPUTS,
  MOVEMENT_ACTIONS,
  SHOOTING_ACTIONS,
} from "../constants";

/**
 * This is a copied version of the Control enum from `isaac-typescript-definitions`. We need a
 * non-constant version of the enum so that we can iterate over it.
 */
enum ControllerLiteral {
  DPAD_LEFT = 0,
  DPAD_RIGHT = 1,
  DPAD_UP = 2,
  DPAD_DOWN = 3,
  /** A, X and B on Xbox, Playstation and Nintendo respectively. */
  BUTTON_A = 4,
  /** B, O and A on Xbox, Playstation and Nintendo respectively. */
  BUTTON_B = 5,
  /** X, □ and Y on Xbox, Playstation and Nintendo respectively. */
  BUTTON_X = 6,
  /** Y, Δ and X on Xbox, Playstation and Nintendo respectively. */
  BUTTON_Y = 7,
  /** Left shoulder button. */
  BUMPER_LEFT = 8,
  TRIGGER_LEFT = 9,
  STICK_LEFT = 10,
  /** Right shoulder button. */
  BUMPER_RIGHT = 11,
  TRIGGER_RIGHT = 12,
  STICK_RIGHT = 13,
  /** Select, Share and - on Xbox, Playstation and Nintendo respectively. */
  BUTTON_BACK = 14,
  /** Start, Options and + on Xbox, Playstation and Nintendo respectively. */
  BUTTON_START = 15,
}

/** Helper function to get the enum name for the specified `Controller` value. */
export function controllerToString(controller: Controller): string {
  for (const [key, controllerLiteralCode] of Object.entries(
    ControllerLiteral,
  )) {
    if (type(key) !== "string") {
      // Ignore the reverse mappings created by TypeScriptToLua
      continue;
    }

    const controllerCode = controllerLiteralCode as unknown as Controller;
    if (controllerCode !== controller) {
      continue;
    }

    let controllerName = key;
    for (const prefix of [
      "DPAD_",
      "BUTTON_",
      "BUMPER_",
      "TRIGGER_",
      "STICK_",
    ]) {
      controllerName = controllerName.replace(prefix, "");
    }

    return controllerName;
  }

  return "unknown";
}

/** Iterates over all 4 inputs to determine if a particular button is pressed (i.e. held down). */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  for (let i = 0; i < MAX_NUM_INPUTS; i++) {
    if (Input.IsActionPressed(buttonAction, i)) {
      return true;
    }
  }

  return false;
}

/**
 * Iterates over all 4 inputs to determine if a particular button is triggered (i.e. held down and
 * then released).
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

export function isMoveActionPressedOnAnyInput(): boolean {
  for (const buttonAction of MOVEMENT_ACTIONS.values()) {
    if (isActionPressedOnAnyInput(buttonAction)) {
      return true;
    }
  }

  return false;
}

export function isMoveActionTriggeredOnAnyInput(): boolean {
  for (const buttonAction of MOVEMENT_ACTIONS.values()) {
    if (isActionTriggeredOnAnyInput(buttonAction)) {
      return true;
    }
  }

  return false;
}

export function isShootActionPressedOnAnyInput(): boolean {
  for (const buttonAction of SHOOTING_ACTIONS.values()) {
    if (isActionPressedOnAnyInput(buttonAction)) {
      return true;
    }
  }

  return false;
}

export function isShootActionTriggeredOnAnyInput(): boolean {
  for (const buttonAction of SHOOTING_ACTIONS.values()) {
    if (isActionTriggeredOnAnyInput(buttonAction)) {
      return true;
    }
  }

  return false;
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
