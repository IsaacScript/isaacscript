import { getUpgradeErrorMsg } from "../errors";
import ModUpgraded from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/main";

const FEATURE_NAME = "input disabler";

let initialized = false;

const v = {
  run: {
    enableInputs: true,
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
  _entity: Entity | null,
  _inputHook: InputHook,
  _buttonAction: ButtonAction,
) {
  return v.run.enableInputs ? undefined : false;
}

// InputHook.IS_ACTION_TRIGGERED (1)
function isActionTriggered(
  _entity: Entity | null,
  _inputHook: InputHook,
  _buttonAction: ButtonAction,
) {
  return v.run.enableInputs ? undefined : false;
}

// InputHook.GET_ACTION_VALUE (2)
function getActionValue(
  _entity: Entity | null,
  _inputHook: InputHook,
  _buttonAction: ButtonAction,
) {
  return v.run.enableInputs ? undefined : 0;
}

/**
 * Helper function to disable all inputs. This is useful because `EntityPlayer.ControlsEnabled` is
 * not very reliable.
 */
export function disableInputs(): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableInputs = false;
}

/**
 * Helper function to enable all inputs. After having used `disableInputs()`, use this function to
 * put things back to normal.
 */
export function enableInputs(): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.enableInputs = true;
}
