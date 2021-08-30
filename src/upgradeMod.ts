import * as customRevive from "./callbacks/customRevive";
import * as itemPickup from "./callbacks/itemPickup";
import * as postCursedTeleport from "./callbacks/postCursedTeleport";
import * as postEsauJr from "./callbacks/postEsauJr";
import * as postFlip from "./callbacks/postFlip";
import * as postGridEntity from "./callbacks/postGridEntity";
import * as postLaserInitLate from "./callbacks/postLaserInitLate";
import * as postPickupCollect from "./callbacks/postPickupCollect";
import * as postPickupInitLate from "./callbacks/postPickupInitLate";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postPlayerChangeType from "./callbacks/postPlayerChangeType";
import * as postPlayerFatalDamage from "./callbacks/postPlayerFatalDamage";
import * as postPlayerInitLate from "./callbacks/postPlayerInitLate";
import * as postPlayerReordered from "./callbacks/postPlayerReordered";
import * as postSacrifice from "./callbacks/postSacrifice";
import * as postTransformation from "./callbacks/postTransformation";
import * as reorderedCallbacks from "./callbacks/reorderedCallbacks";
import * as disableInputs from "./features/disableInputs";
import * as forgottenSwitch from "./features/forgottenSwitch";
import * as runInNFrames from "./features/runInNFrames";
import * as saveDataManager from "./features/saveDataManager/main";
import ModUpgraded from "./types/ModUpgraded";

/**
 * Use this function to enable the custom features and callbacks provided by `isaacscript-common`.
 *
 * Example:
 * ```
 * const mod = RegisterMod("My Mod", 1);
 * const modUpgraded = upgradeMod(mod);
 *
 * // Subscribe to vanilla callbacks
 * mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
 *
 * // Subscribe to custom callbacks
 * modUpgraded.AddCallbackCustom(ModCallbacksCustom.MC_POST_ITEM_PICKUP, postItemPickup);
 * ```
 *
 * For a list of all custom callbacks, check out the
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks).
 *
 * @param mod The mod object returned by the `RegisterMod()` function.
 * @param verbose Enables verbose logging for the purposes of crash troubleshooting.
 * Defaults to false.
 * @returns The upgraded mod object.
 * @category Custom Callbacks
 */
export function upgradeMod(mod: Mod, verbose = false): ModUpgraded {
  const modUpgraded = new ModUpgraded(mod, verbose);

  saveDataManager.init(modUpgraded);
  initCustomCallbacks(modUpgraded);
  initFeatures(modUpgraded);

  return modUpgraded;
}

function initCustomCallbacks(mod: ModUpgraded) {
  reorderedCallbacks.init(mod);
  postPlayerReordered.init(mod);
  postPlayerInitLate.init(mod);
  postPickupInitLate.init(mod);
  postLaserInitLate.init(mod);
  postPickupCollect.init(mod);
  itemPickup.init(mod);
  postPlayerChangeType.init(mod);
  postPlayerChangeHealth.init(mod);
  postPlayerFatalDamage.init(mod);
  customRevive.init(mod);
  postFlip.init(mod);
  postEsauJr.init(mod);
  postTransformation.init(mod);
  postSacrifice.init(mod);
  postCursedTeleport.init(mod);
  postGridEntity.init(mod);
}

function initFeatures(mod: ModUpgraded) {
  disableInputs.init(mod);
  forgottenSwitch.init(mod);
  runInNFrames.init(mod);
}
