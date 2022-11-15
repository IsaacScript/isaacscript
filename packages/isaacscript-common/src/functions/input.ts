import {
  ButtonAction,
  Controller,
  ControllerIndex,
  Keyboard,
} from "isaac-typescript-definitions";
import { KEYBOARD_TO_STRING } from "../maps/keyboardToString";
import { getEnumValues } from "./enums";
import { trimPrefix } from "./string";

const MODIFIER_KEYS: readonly Keyboard[] = [
  Keyboard.LEFT_SHIFT, // 340
  Keyboard.LEFT_CONTROL, // 341
  Keyboard.LEFT_ALT, // 342
  Keyboard.LEFT_SUPER, // 343
  Keyboard.RIGHT_SHIFT, // 344
  Keyboard.RIGHT_CONTROL, // 345
  Keyboard.RIGHT_ALT, // 346
  Keyboard.RIGHT_SUPER, // 347
];

const MOVEMENT_ACTIONS: readonly ButtonAction[] = [
  ButtonAction.LEFT, // 0
  ButtonAction.RIGHT, // 1
  ButtonAction.UP, // 2
  ButtonAction.DOWN, // 3
];

export const MOVEMENT_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  MOVEMENT_ACTIONS,
);

const SHOOTING_ACTIONS: readonly ButtonAction[] = [
  ButtonAction.SHOOT_LEFT, // 4
  ButtonAction.SHOOT_RIGHT, // 5
  ButtonAction.SHOOT_UP, // 6
  ButtonAction.SHOOT_DOWN, // 7
];

export const SHOOTING_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  SHOOTING_ACTIONS,
);

/**
 * Helper function to get the enum name for the specified `Controller` value. Note that this will
 * trim off the "BUTTON_" prefix.
 */
export function controllerToString(controller: Controller): string {
  const key = Controller[controller];
  return trimPrefix(key, "BUTTON_");
}

export function getMoveActions(): ReadonlySet<ButtonAction> {
  return MOVEMENT_ACTIONS_SET;
}

export function getShootActions(): ReadonlySet<ButtonAction> {
  return SHOOTING_ACTIONS_SET;
}

/** Iterates over all inputs to determine if a particular button is pressed (i.e. held down). */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  const controllerIndexes = getEnumValues(ControllerIndex);
  return controllerIndexes.some((controllerIndex) =>
    Input.IsActionPressed(buttonAction, controllerIndex),
  );
}

/**
 * Iterates over all inputs to determine if a particular button is triggered (i.e. held down and
 * then released).
 */
export function isActionTriggeredOnAnyInput(
  buttonAction: ButtonAction,
): boolean {
  const controllerIndexes = getEnumValues(ControllerIndex);
  return controllerIndexes.some((controllerIndex) =>
    Input.IsActionTriggered(buttonAction, controllerIndex),
  );
}

/**
 * Helper function to see if a particular keyboard key is being pressed down by the player.
 *
 * This function is variadic, meaning you can pass as many keyboard values as you want to check for.
 * This function will return true if any of the values are pressed.
 */
export function isKeyboardPressed(...keys: Keyboard[]): boolean {
  return keys.some((key) =>
    Input.IsButtonPressed(key, ControllerIndex.KEYBOARD),
  );
}

/**
 * Helper function to check if one or more modifier keys are being pressed down on the keyboard.
 *
 * A modifier key is defined as shift, control, alt, or Windows.
 */
export function isModifierKeyPressed(): boolean {
  return isKeyboardPressed(...MODIFIER_KEYS);
}

export function isMoveAction(buttonAction: ButtonAction): boolean {
  return MOVEMENT_ACTIONS_SET.has(buttonAction);
}

export function isMoveActionPressedOnAnyInput(): boolean {
  return MOVEMENT_ACTIONS.some((moveAction) =>
    isActionPressedOnAnyInput(moveAction),
  );
}

export function isMoveActionTriggeredOnAnyInput(): boolean {
  return MOVEMENT_ACTIONS.some((moveAction) =>
    isActionTriggeredOnAnyInput(moveAction),
  );
}

export function isShootAction(buttonAction: ButtonAction): boolean {
  return SHOOTING_ACTIONS_SET.has(buttonAction);
}

export function isShootActionPressedOnAnyInput(): boolean {
  return SHOOTING_ACTIONS.some((shootAction) =>
    isActionPressedOnAnyInput(shootAction),
  );
}

export function isShootActionTriggeredOnAnyInput(): boolean {
  return SHOOTING_ACTIONS.some((shootAction) =>
    isActionTriggeredOnAnyInput(shootAction),
  );
}

/**
 * Helper function to get the string that would be typed if someone pressed the corresponding key.
 * This is useful for creating in-game chat.
 *
 * Note that this function will only work for the keyboard values that are printable. Thus, it will
 * return undefined for e.g. `Keyboard.LEFT_SHIFT` (340). If all you want is the corresponding name
 * of the key, then simply use the enum reverse mapping (e.g. `Keyboard[keyboard]`).
 */
export function keyboardToString(
  keyboard: Keyboard,
  uppercase: boolean,
): string | undefined {
  const tuple = KEYBOARD_TO_STRING.get(keyboard);
  if (tuple === undefined) {
    return undefined;
  }

  const [lowercaseCharacter, uppercaseCharacter] = tuple;
  return uppercase ? uppercaseCharacter : lowercaseCharacter;
}
