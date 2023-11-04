import {
  ButtonAction,
  Controller,
  ControllerIndex,
  Keyboard,
} from "isaac-typescript-definitions";
import { CONTROLLER_INDEX_VALUES } from "../arrays/cachedEnumValues";
import { KEYBOARD_TO_STRING_MAP } from "../maps/keyboardToStringMap";
import { ReadonlySet } from "../types/ReadonlySet";
import { trimPrefix } from "./string";

export const MODIFIER_KEYS = [
  Keyboard.LEFT_SHIFT, // 340
  Keyboard.LEFT_CONTROL, // 341
  Keyboard.LEFT_ALT, // 342
  Keyboard.LEFT_SUPER, // 343
  Keyboard.RIGHT_SHIFT, // 344
  Keyboard.RIGHT_CONTROL, // 345
  Keyboard.RIGHT_ALT, // 346
  Keyboard.RIGHT_SUPER, // 347
] as const;

export const MOVEMENT_BUTTON_ACTIONS = [
  ButtonAction.LEFT, // 0
  ButtonAction.RIGHT, // 1
  ButtonAction.UP, // 2
  ButtonAction.DOWN, // 3
] as const;

export const MOVEMENT_BUTTON_ACTIONS_SET = new ReadonlySet<ButtonAction>(
  MOVEMENT_BUTTON_ACTIONS,
);

export const SHOOTING_BUTTON_ACTIONS = [
  ButtonAction.SHOOT_LEFT, // 4
  ButtonAction.SHOOT_RIGHT, // 5
  ButtonAction.SHOOT_UP, // 6
  ButtonAction.SHOOT_DOWN, // 7
] as const;

export const SHOOTING_BUTTON_ACTIONS_SET = new ReadonlySet<ButtonAction>(
  SHOOTING_BUTTON_ACTIONS,
);

/**
 * Helper function to get the enum name for the specified `Controller` value. Note that this will
 * trim off the "BUTTON_" prefix.
 *
 * Returns undefined if the submitted controller value was not valid.
 */
export function controllerToString(controller: Controller): string | undefined {
  const key = Controller[controller];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (key === undefined) {
    return undefined;
  }

  return trimPrefix(key, "BUTTON_");
}

/**
 * Helper function to get the movement actions that the specified `ControllerIndex` is currently
 * pressing down. This returns an array because a player can be holding down more than one movement
 * key at a time.
 */
export function getMoveButtonActions(
  controllerIndex: ControllerIndex,
): ButtonAction[] {
  return MOVEMENT_BUTTON_ACTIONS.filter((buttonAction) =>
    Input.IsActionPressed(buttonAction, controllerIndex),
  );
}

/**
 * Helper function to get the shooting actions that the specified `ControllerIndex` is currently
 * pressing down. This returns an array because a player can be holding down more than one shooting
 * key at a time.
 */
export function getShootButtonActions(
  controllerIndex: ControllerIndex,
): ButtonAction[] {
  return SHOOTING_BUTTON_ACTIONS.filter((buttonAction) =>
    Input.IsActionPressed(buttonAction, controllerIndex),
  );
}

/**
 * Helper function to check if a player is pressing a specific button (i.e. holding it down).
 *
 * This is a variadic version of `Input.IsActionPressed`, meaning that you can pass as many buttons
 * as you want to check for. This function will return true if any of the buttons are pressed.
 */
export function isActionPressed(
  controllerIndex: ControllerIndex,
  ...buttonActions: ButtonAction[]
): boolean {
  return buttonActions.some((buttonAction) =>
    Input.IsActionPressed(buttonAction, controllerIndex),
  );
}

/**
 * Helper function to iterate over all inputs to determine if a specific button is pressed (i.e.
 * being held down).
 *
 * This function is variadic, meaning you can pass as many buttons as you want to check for. This
 * function will return true if any of the buttons are pressed.
 */
export function isActionPressedOnAnyInput(
  ...buttonActions: ButtonAction[]
): boolean {
  return CONTROLLER_INDEX_VALUES.some((controllerIndex) =>
    isActionPressed(controllerIndex, ...buttonActions),
  );
}

/**
 * Helper function to check if a player is triggering a specific button (i.e. pressing and releasing
 * it).
 *
 * This is a variadic version of `Input.IsActionTriggered`, meaning that you can pass as many
 * buttons as you want to check for. This function will return true if any of the buttons are
 * triggered.
 */
export function isActionTriggered(
  controllerIndex: ControllerIndex,
  ...buttonActions: ButtonAction[]
): boolean {
  return buttonActions.some((buttonAction) =>
    Input.IsActionTriggered(buttonAction, controllerIndex),
  );
}

/**
 * Iterates over all inputs to determine if a specific button is triggered (i.e. held down and then
 * released).
 *
 * This function is variadic, meaning you can pass as many buttons as you want to check for. This
 * function will return true if any of the buttons are pressed.
 */
export function isActionTriggeredOnAnyInput(
  ...buttonActions: ButtonAction[]
): boolean {
  return CONTROLLER_INDEX_VALUES.some((controllerIndex) =>
    isActionTriggered(controllerIndex, ...buttonActions),
  );
}

/**
 * Helper function to see if a specific keyboard key is being held down by the player.
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
  return MOVEMENT_BUTTON_ACTIONS_SET.has(buttonAction);
}

export function isMoveActionPressed(controllerIndex: ControllerIndex): boolean {
  return isActionPressed(controllerIndex, ...MOVEMENT_BUTTON_ACTIONS);
}

export function isMoveActionPressedOnAnyInput(): boolean {
  return MOVEMENT_BUTTON_ACTIONS.some((moveAction) =>
    isActionPressedOnAnyInput(moveAction),
  );
}

export function isMoveActionTriggered(
  controllerIndex: ControllerIndex,
): boolean {
  return isActionTriggered(controllerIndex, ...MOVEMENT_BUTTON_ACTIONS);
}

export function isMoveActionTriggeredOnAnyInput(): boolean {
  return MOVEMENT_BUTTON_ACTIONS.some((moveAction) =>
    isActionTriggeredOnAnyInput(moveAction),
  );
}

export function isShootAction(buttonAction: ButtonAction): boolean {
  return SHOOTING_BUTTON_ACTIONS_SET.has(buttonAction);
}

export function isShootActionPressed(
  controllerIndex: ControllerIndex,
): boolean {
  return isActionPressed(controllerIndex, ...SHOOTING_BUTTON_ACTIONS);
}

export function isShootActionPressedOnAnyInput(): boolean {
  return SHOOTING_BUTTON_ACTIONS.some((shootAction) =>
    isActionPressedOnAnyInput(shootAction),
  );
}

export function isShootActionTriggered(
  controllerIndex: ControllerIndex,
): boolean {
  return isActionTriggered(controllerIndex, ...SHOOTING_BUTTON_ACTIONS);
}

export function isShootActionTriggeredOnAnyInput(): boolean {
  return SHOOTING_BUTTON_ACTIONS.some((shootAction) =>
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
  const tuple = KEYBOARD_TO_STRING_MAP.get(keyboard);
  if (tuple === undefined) {
    return undefined;
  }

  const [lowercaseCharacter, uppercaseCharacter] = tuple;
  return uppercase ? uppercaseCharacter : lowercaseCharacter;
}
