import PickingUpItem from "./PickingUpItem";

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
  MC_POST_GAME_STARTED,
  MC_POST_NEW_LEVEL,
  MC_POST_NEW_ROOM,
  MC_PRE_ITEM_PICKUP,
  MC_POST_ITEM_PICKUP,
}
export default ModCallbacksCustom;

export interface PostGameStartedCallback {
  type: ModCallbacksCustom.MC_POST_GAME_STARTED;
  callback: () => void;
}

export interface PostNewLevelCallback {
  type: ModCallbacksCustom.MC_POST_NEW_LEVEL;
  callback: () => void;
}

export interface PostNewRoomCallback {
  type: ModCallbacksCustom.MC_POST_NEW_ROOM;
  callback: () => void;
}

export interface PreItemPickupCallback {
  type: ModCallbacksCustom.MC_PRE_ITEM_PICKUP;
  callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void;
  itemType?: ItemType;
  itemID?: CollectibleType | TrinketType | int;
}

export interface PostItemPickupCallback {
  type: ModCallbacksCustom.MC_POST_ITEM_PICKUP;
  callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void;
  itemType?: ItemType;
  itemID?: CollectibleType | TrinketType | int;
}

export type CallbackParametersCustom =
  | PostGameStartedCallback
  | PostNewLevelCallback
  | PostNewRoomCallback
  | PreItemPickupCallback
  | PostItemPickupCallback;
