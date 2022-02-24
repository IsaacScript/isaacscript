import { MAX_NUM_INPUTS } from "../constants";
import { range } from "./math";
import { copySet } from "./set";

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

const MOVEMENT_ACTIONS: readonly ButtonAction[] = [
  ButtonAction.ACTION_LEFT, // 0
  ButtonAction.ACTION_RIGHT, // 1
  ButtonAction.ACTION_UP, // 2
  ButtonAction.ACTION_DOWN, // 3
];

const MOVEMENT_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  MOVEMENT_ACTIONS,
);

const SHOOTING_ACTIONS: readonly ButtonAction[] = [
  ButtonAction.ACTION_SHOOTLEFT, // 4
  ButtonAction.ACTION_SHOOTRIGHT, // 5
  ButtonAction.ACTION_SHOOTUP, // 6
  ButtonAction.ACTION_SHOOTDOWN, // 7
];

const SHOOTING_ACTIONS_SET: ReadonlySet<ButtonAction> = new Set(
  SHOOTING_ACTIONS,
);

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

export function getMoveActions(): Set<ButtonAction> {
  return copySet(MOVEMENT_ACTIONS_SET);
}

export function getShootActions(): Set<ButtonAction> {
  return copySet(SHOOTING_ACTIONS_SET);
}

/** Iterates over all inputs to determine if a particular button is pressed (i.e. held down). */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  const validInputs = range(0, MAX_NUM_INPUTS - 1);
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
  const validInputs = range(0, MAX_NUM_INPUTS - 1);
  return validInputs.some((input) =>
    Input.IsActionTriggered(buttonAction, input),
  );
}

export function isKeyboardPressed(key: Keyboard): boolean {
  return Input.IsButtonPressed(key, ControllerIndex.KEYBOARD);
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

/** Helper function to get the enum name for the specified `Keyboard` value. */
export function keyboardToString(keyboard: Keyboard): string {
  for (const [keyName, keyCode] of Object.entries(Keyboard)) {
    if (keyCode === keyboard) {
      const withoutPrefix = keyName.slice("KEY_".length);
      const [withoutUnderscores] = string.gsub(withoutPrefix, "_", " ");
      return withoutUnderscores;
    }
  }

  return "unknown";
}
