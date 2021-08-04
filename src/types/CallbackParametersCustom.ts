import ModCallbacksCustom from "./ModCallbacksCustom";
import PickingUpItem from "./PickingUpItem";

export default interface CallbackParametersCustom {
  [ModCallbacksCustom.MC_POST_GAME_STARTED]: [
    callback: (isContinued: boolean) => void,
  ];
  [ModCallbacksCustom.MC_POST_NEW_LEVEL]: [callback: () => void];
  [ModCallbacksCustom.MC_POST_NEW_ROOM]: [callback: () => void];
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
