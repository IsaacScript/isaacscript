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
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]: [
    callback: (player: EntityPlayer) => void,
  ];
  [ModCallbacksCustom.MC_POST_FLIP]: [callback: (player: EntityPlayer) => void];
  [ModCallbacksCustom.MC_POST_FIRST_FLIP]: [
    callback: (player: EntityPlayer) => void,
  ];
  [ModCallbacksCustom.MC_POST_ESAU_JR]: [
    callback: (player: EntityPlayer) => void,
  ];
  [ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]: [
    callback: (player: EntityPlayer) => void,
  ];
}

// Make copies of the objects we need to verify so that we can easily re-use the code block below
type EnumToCheck = ModCallbacksCustom;
type InterfaceToCheck = CallbackParametersCustom;

// Throw a compiler error if InterfaceToCheck does not match the values of EnumToCheck
// From: https://stackoverflow.com/questions/51829842
type KeysMissing = Exclude<EnumToCheck, keyof InterfaceToCheck>;
type ExtraKeys = {
  [K in keyof InterfaceToCheck]: Extract<EnumToCheck, K> extends never
    ? K
    : never;
}[keyof InterfaceToCheck];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Verify<
  _Missing extends never = KeysMissing, // eslint-disable-line
  _Extra extends never = ExtraKeys, // eslint-disable-line
> = 0;
