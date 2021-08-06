import * as saveDataManager from "../features/saveDataManager";
import ModUpgraded from "../types/ModUpgraded";
import * as itemPickup from "./itemPickup";
import * as postEsauJr from "./postEsauJr";
import * as postFlip from "./postFlip";
import * as postPlayerChangeType from "./postPlayerChangeType";
import * as reorderedCallbacks from "./reorderedCallbacks";

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
 * @category Custom Callbacks
 */
export function upgradeMod(mod: Mod): ModUpgraded {
  const modUpgraded = new ModUpgraded(mod);

  initFeatures(modUpgraded);
  initCustomCallbacks(modUpgraded);

  return modUpgraded;
}

function initFeatures(modUpgraded: ModUpgraded) {
  saveDataManager.init(modUpgraded);
}

function initCustomCallbacks(modUpgraded: ModUpgraded) {
  reorderedCallbacks.init(modUpgraded);
  itemPickup.init(modUpgraded);
  postPlayerChangeType.init(modUpgraded);
  postFlip.init(modUpgraded);
  postEsauJr.init(modUpgraded);
}
