/**
 * These are the custom callbacks available for use once the mod object has been upgraded.
 * Also see the [[`upgradeMod`]] function.
 *
 * For a better listing of all custom callbacks, check out the
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks).
 *
 * @category Custom Callbacks
 */
enum ModCallbacksCustom {
  MC_POST_GAME_STARTED_REORDERED,
  MC_POST_NEW_LEVEL_REORDERED,
  MC_POST_NEW_ROOM_REORDERED,
  MC_POST_PLAYER_INIT_REORDERED,
  MC_POST_PLAYER_UPDATE_REORDERED,
  MC_POST_PLAYER_RENDER_REORDERED,
  MC_POST_PLAYER_INIT_LATE, // 1
  MC_POST_PICKUP_INIT_LATE, // 5
  MC_POST_LASER_INIT_LATE, // 7
  MC_POST_PICKUP_COLLECT,
  MC_PRE_ITEM_PICKUP,
  MC_POST_ITEM_PICKUP,
  MC_POST_PLAYER_CHANGE_TYPE,
  MC_POST_PLAYER_CHANGE_HEALTH,
  MC_POST_PLAYER_FATAL_DAMAGE,
  MC_PRE_CUSTOM_REVIVE,
  MC_POST_CUSTOM_REVIVE,
  MC_POST_FLIP,
  MC_POST_FIRST_FLIP,
  MC_POST_ESAU_JR,
  MC_POST_FIRST_ESAU_JR,
  MC_POST_TRANSFORMATION,
  MC_POST_SACRIFICE,
  MC_POST_CURSED_TELEPORT,
  MC_POST_GRID_ENTITY_INIT,
  MC_POST_GRID_ENTITY_UPDATE,
  MC_POST_GRID_ENTITY_REMOVE,
}
export default ModCallbacksCustom;
