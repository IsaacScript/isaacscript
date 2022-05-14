import {
  ButtonAction,
  Controller,
  ControllerIndex,
  Keyboard,
} from "isaac-typescript-definitions";
import { MAX_NUM_INPUTS } from "../constants";
import { erange } from "./math";
import { copySet } from "./set";
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

const MOVEMENT_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  MOVEMENT_ACTIONS,
);

const SHOOTING_ACTIONS: readonly ButtonAction[] = [
  ButtonAction.SHOOT_LEFT, // 4
  ButtonAction.SHOOT_RIGHT, // 5
  ButtonAction.SHOOT_UP, // 6
  ButtonAction.SHOOT_DOWN, // 7
];

const SHOOTING_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  SHOOTING_ACTIONS,
);

/** Helper function to get the enum name for the specified `Controller` value. */
export function controllerToString(controller: Controller): string {
  const key = Controller[controller];
  if (key === undefined) {
    return "unknown";
  }

  return trimPrefix(key, "BUTTON_");
}

export function getMoveActions(): Set<ButtonAction> {
  return copySet(MOVEMENT_ACTIONS_SET);
}

export function getShootActions(): Set<ButtonAction> {
  return copySet(SHOOTING_ACTIONS_SET);
}

/** Iterates over all inputs to determine if a particular button is pressed (i.e. held down). */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  const validInputs = erange(MAX_NUM_INPUTS);
  return validInputs.some((input) =>
    Input.IsActionPressed(buttonAction, input),
  );
}

/**
 * Iterates over all inputs to determine if a particular button is triggered (i.e. held down and
 * then released).
 */
export function isActionTriggeredOnAnyInput(
  buttonAction: ButtonAction,
): boolean {
  const validInputs = erange(MAX_NUM_INPUTS);
  return validInputs.some((input) =>
    Input.IsActionTriggered(buttonAction, input),
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

export function keyboardToString(keyboard: Keyboard): string {
  return Keyboard[keyboard] ?? "unknown";
}
