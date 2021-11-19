import { getUpgradeErrorMsg } from "../errors";
import { ModUpgraded } from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "input disabler";

const MOVEMENT_BUTTONS = new Set<ButtonAction>([
  ButtonAction.ACTION_LEFT, // 0
  ButtonAction.ACTION_RIGHT, // 1
  ButtonAction.ACTION_UP, // 2
  ButtonAction.ACTION_DOWN, // 3
]);

const SHOOTING_BUTTONS = new Set<ButtonAction>([
  ButtonAction.ACTION_SHOOTLEFT, // 4
  ButtonAction.ACTION_SHOOTRIGHT, // 5
  ButtonAction.ACTION_SHOOTUP, // 6
  ButtonAction.ACTION_SHOOTDOWN, // 7
]);

let initialized = false;

const v = {
  run: {
    enableSomeInputs: true,
    /** A set of inputs that are allowed, or null if all inputs are allowed. */
    whitelist: null as Set<ButtonAction> | null,
    /** A set of inputs that are disallowed, or null if nothing specific is disallowed. */
    blacklist: null as Set<ButtonAction> | null,
  },
};

/** @hidden */
export function init(mod: ModUpgraded): void {
  initialized = true;
  saveDataManager("disableInputs", v);

  mod.AddCallback(
    ModCallbacks.MC_INPUT_ACTION,
    isActionPressed,
    InputHook.IS_ACTION_PRESSED, // 0
  );

  mod.AddCallback(
    ModCallbacks.MC_INPUT_ACTION,
    isActionTriggered,
    InputHook.IS_ACTION_TRIGGERED, // 1
  );

  mod.AddCallback(
    ModCallbacks.MC_INPUT_ACTION,
    getActionValue,
    InputHook.GET_ACTION_VALUE, // 2
  );
}

// InputHook.IS_ACTION_PRESSED (0)
function isActionPressed(
  _entity: Entity | undefined,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  return getReturnValue(buttonAction, true);
}

// InputHook.IS_ACTION_TRIGGERED (1)
function isActionTriggered(
  _entity: Entity | undefined,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  return getReturnValue(buttonAction, true);
}

// InputHook.GET_ACTION_VALUE (2)
function getActionValue(
  _entity: Entity | undefined,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  return getReturnValue(buttonAction, false);
}

function getReturnValue(buttonAction: ButtonAction, booleanCallback: boolean) {
  const disableValue = booleanCallback ? false : 0;

  if (!v.run.enableSomeInputs) {
    return disableValue;
  }

  if (v.run.whitelist !== null && !v.run.whitelist.has(buttonAction)) {
    return disableValue;
  }

  if (v.run.blacklist !== null && v.run.blacklist.has(buttonAction)) {
    return disableValue;
  }

  return undefined;
}

/** After having disabled inputs, use this function to set things back to normal. */
export function enableAllInputs(): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableSomeInputs = true;
  v.run.whitelist = null;
  v.run.blacklist = null;
}

/**
 * Helper function to disable all inputs.
 * This is useful because `EntityPlayer.ControlsEnabled` is not very reliable.
 *
 * Call `enableAllInputs()` to set things back to normal.
 *
 * Note that calling any of the various `enable` or `disable` functions will override the effects of
 * this function.
 */
export function disableAllInputs(): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableSomeInputs = false;
  v.run.whitelist = null;
  v.run.blacklist = null;
}

/**
 * Helper function to enable all inputs besides the ones provided.
 * This is useful because `EntityPlayer.ControlsEnabled` is not very reliable.
 *
 * Call `enableAllInputs()` to set things back to normal.
 *
 * Note that calling any of the various `enable` or `disable` functions will override the effects of
 * this function.
 */
export function enableAllInputsExceptFor(blacklist: Set<ButtonAction>): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableSomeInputs = true;
  v.run.whitelist = null;
  v.run.blacklist = blacklist;
}

/**
 * Helper function to disable all inputs besides the ones provided.
 * This is useful because `EntityPlayer.ControlsEnabled` is not very reliable.
 *
 * Call `enableAllInputs()` to set things back to normal.
 *
 * Note that calling any of the various `enable` or `disable` functions will override the effects of
 * this function.
 */
export function disableAllInputsExceptFor(whitelist: Set<ButtonAction>): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableSomeInputs = true;
  v.run.whitelist = whitelist;
  v.run.blacklist = null;
}

/**
 * Helper function to disable only the inputs used for moving the character (or moving the cursor in
 * the UI).
 * This is useful because `EntityPlayer.ControlsEnabled` is not very reliable.
 *
 * Call `enableInputs()` to set things back to normal.
 *
 * Note that calling any of the various `enable` or `disable` functions will override the effects of
 * this function.
 */
export function disableMovementInputs(): void {
  enableAllInputsExceptFor(MOVEMENT_BUTTONS);
}

/**
 * Helper function to disable only the inputs used for shooting tears.
 * This is useful because `EntityPlayer.ControlsEnabled` is not very reliable.
 *
 * Call `enableInputs()` to set things back to normal.
 *
 * Note that calling any of the various `enable` or `disable` functions will override the effects of
 * this function.
 */
export function disableShootingInputs(): void {
  enableAllInputsExceptFor(SHOOTING_BUTTONS);
}
