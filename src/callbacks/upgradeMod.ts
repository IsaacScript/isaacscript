import ModUpgraded from "../types/ModUpgraded";

/**
 * Use this function to enable the custom callbacks provided by `isaacscript-common`.
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
 * Also see the [[`ModCallbacksCustom`]] enum and [[`CallbackParametersCustom`]].
 *
 * For a list of all custom callbacks, check out the official
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks)
 * docs.
 *
 * @category Custom Callbacks
 */
export function upgradeMod(mod: Mod): ModUpgraded {
  return new ModUpgraded(mod);
}
