import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { ModUpgraded } from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "forgotten switcher";

const v = {
  run: {
    shouldSwitch: false,
  },
};

/** @internal */
export function forgottenSwitchInit(mod: ModUpgraded): void {
  saveDataManager("forgottenSwitch", v);

  mod.AddCallback(
    ModCallbacks.MC_INPUT_ACTION, // 13
    isActionTriggered,
    InputHook.IS_ACTION_TRIGGERED, // 1
  );
}

// ModCallbacks.MC_INPUT_ACTION (13)
// InputHook.IS_ACTION_TRIGGERED (1)
function isActionTriggered(
  _entity: Entity | undefined,
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
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  v.run.shouldSwitch = true;
}
