import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getMoveActions, getShootActions } from "../functions/input";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "input disabler";

const v = {
  run: {
    /** Indexed by the requesting feature key. */
    disableInputsWithWhitelistMap: new Map<
      string,
      Set<ButtonAction> | ReadonlySet<ButtonAction>
    >(),

    /** Indexed by the requesting feature key. */
    enableInputsWithBlacklistMap: new Map<
      string,
      Set<ButtonAction> | ReadonlySet<ButtonAction>
    >(),
  },
};

/** @internal */
export function disableInputsInit(mod: Mod): void {
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

  for (const whitelist of v.run.disableInputsWithWhitelistMap.values()) {
    if (!whitelist.has(buttonAction)) {
      return disableValue;
    }
  }

  for (const blacklist of v.run.enableInputsWithBlacklistMap.values()) {
    if (blacklist.has(buttonAction)) {
      return disableValue;
    }
  }

  return undefined;
}

/**
 * Helper function to enable all inputs. Use this function to set things back to normal after having
 * used one of the other helper functions to disable inputs.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function enableAllInputs(key: string): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  v.run.disableInputsWithWhitelistMap.delete(key);
  v.run.enableInputsWithBlacklistMap.delete(key);
}

/**
 * Helper function to disable all inputs. This is useful because `EntityPlayer.ControlsEnabled` can
 * be changed by the game under certain conditions.
 *
 * Use the [[`enableAllInputs`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function disableAllInputs(key: string): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  v.run.disableInputsWithWhitelistMap.set(key, new Set());
  v.run.enableInputsWithBlacklistMap.delete(key);
}

/**
 * Helper function to enable all inputs besides the ones provided. This is useful because
 * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
 *
 * Use the [[`enableAllInputs`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 * @param blacklist A set of ButtonActions to disallow.
 */
export function enableAllInputsExceptFor(
  key: string,
  blacklist: Set<ButtonAction> | ReadonlySet<ButtonAction>,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  v.run.disableInputsWithWhitelistMap.delete(key);
  v.run.enableInputsWithBlacklistMap.set(key, blacklist);
}

/**
 * Helper function to disable all inputs besides the ones provided. This is useful because
 * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
 *
 * Use the [[`enableAllInputs`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 * @param whitelist A set of ButtonActions to allow.
 */
export function disableAllInputsExceptFor(
  key: string,
  whitelist: Set<ButtonAction>,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  v.run.disableInputsWithWhitelistMap.set(key, whitelist);
  v.run.enableInputsWithBlacklistMap.delete(key);
}

/**
 * Helper function to disable only the inputs used for moving the character (or moving the cursor in
 * the UI). This is useful because `EntityPlayer.ControlsEnabled` can be changed by the game under
 * certain conditions.
 *
 * Use the [[`enableAllInputs`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function disableMovementInputs(key: string): void {
  const moveActions = getMoveActions();
  enableAllInputsExceptFor(key, moveActions);
}

/**
 * Helper function to disable only the inputs used for shooting tears. This is useful because
 * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
 *
 * Use the [[`enableAllInputs`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function disableShootingInputs(key: string): void {
  const shootActions = getShootActions();
  enableAllInputsExceptFor(key, shootActions);
}
