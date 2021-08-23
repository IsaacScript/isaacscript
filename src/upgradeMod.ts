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
import * as postPlayerReordered from "./callbacks/postPlayerReordered";
import * as postSacrifice from "./callbacks/postSacrifice";
import * as postTransformation from "./callbacks/postTransformation";
import * as reorderedCallbacks from "./callbacks/reorderedCallbacks";
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

  initFeatures(modUpgraded);
  initCustomCallbacks(modUpgraded);

  return modUpgraded;
}

function initFeatures(modUpgraded: ModUpgraded) {
  saveDataManager.init(modUpgraded);
}

function initCustomCallbacks(modUpgraded: ModUpgraded) {
  reorderedCallbacks.init(modUpgraded);
  postPlayerReordered.init(modUpgraded);
  postPickupInitLate.init(modUpgraded);
  postLaserInitLate.init(modUpgraded);
  postPickupCollect.init(modUpgraded);
  itemPickup.init(modUpgraded);
  postPlayerChangeType.init(modUpgraded);
  postPlayerChangeHealth.init(modUpgraded);
  postPlayerFatalDamage.init(modUpgraded);
  postFlip.init(modUpgraded);
  postEsauJr.init(modUpgraded);
  postTransformation.init(modUpgraded);
  postSacrifice.init(modUpgraded);
  postCursedTeleport.init(modUpgraded);
  postGridEntity.init(modUpgraded);
}
