/**
 * These are the custom callbacks available for use once the mod object has been upgraded.
 * Also see the [[`upgradeMod`]] function and [[`CallbackParametersCustom`]].
 *
 * For a better listing of all possible custom callbacks, check out the official
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks)
 * docs.
 *
 * @category Custom Callbacks
 */
enum ModCallbacksCustom {
  MC_PRE_ITEM_PICKUP,
  MC_POST_ITEM_PICKUP,
}
export default ModCallbacksCustom;
