import ModUpgraded from "./types/ModUpgraded";

/**
 * Use this function to enable the custom callbacks provided by `isaacscript-common`.
 *
 * Example:
 * ```
 * let mod = RegisterMod("My Mod", 1); // "mod" is now type Mod
 * mod = upgradeMod(mod); // "mod" is now type ModUpgraded
 *
 * // Subscribe to vanilla callbacks
 * mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
 *
 * // Subscribe to custom callbacks
 * mod.AddCallbackCustom(ModCallbacksCustom.MC_POST_ITEM_PICKUP, postItemPickup);
 * ```
 *
 * @category Custom Callbacks
 */
export function upgradeMod(mod: Mod): ModUpgraded {
  return new ModUpgraded(mod);
}
