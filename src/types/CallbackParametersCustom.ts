import ModCallbacksCustom from "./ModCallbacksCustom";
import PickingUpItem from "./PickingUpItem";

/**
 * This is the format for the custom callbacks, along with optional arguments, if any.
 *
 * @category Custom Callbacks
 */
export default interface CallbackParametersCustom {
  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: [
    callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: [
    callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
}
