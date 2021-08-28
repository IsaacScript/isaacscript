import { getUpgradeErrorMsg } from "../errors";
import ModUpgraded from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/main";

const FEATURE_NAME = "Forgotten switcher";

let initialized = false;

const v = {
  run: {
    shouldSwitch: false,
  },
};

/** @hidden */
export function init(mod: ModUpgraded): void {
  initialized = true;
  saveDataManager("forgottenSwitch", v);

  mod.AddCallback(
    ModCallbacks.MC_INPUT_ACTION,
    isActionTriggered,
    InputHook.IS_ACTION_TRIGGERED, // 1
  );
}

// InputHook.IS_ACTION_TRIGGERED (1)
function isActionTriggered(
  _entity: Entity | null,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  if (buttonAction === ButtonAction.ACTION_DROP && v.run.shouldSwitch) {
    v.run.shouldSwitch = false;
    return true;
  }

  return undefined;
}

/**
 * When used on The Forgotten, switches to The Soul. When used on The Soul, switches to The
 * Forgotten. This takes 1 game frame to take effect.
 */
export function forgottenSwitch(): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  v.run.shouldSwitch = true;
}
