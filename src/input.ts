import { NUM_INPUTS } from "./constants";

/** Iterates over all 4 inputs to see if a particular button is pressed (i.e. held down). */
export function isActionPressedOnAnyInput(buttonAction: ButtonAction): boolean {
  for (let i = 0; i < NUM_INPUTS; i++) {
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
  for (let i = 0; i < NUM_INPUTS; i++) {
    if (Input.IsActionTriggered(buttonAction, i)) {
      return true;
    }
  }

  return false;
}
