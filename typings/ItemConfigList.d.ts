declare class ItemConfigList {
  /**
   * ItemConfigList is bugged such that using the "Get()" method returns Lua userdata.
   * This userdata cannot be used for anything. Instead, use "ItemConfig.GetCollectible()".
   */
  Get(fakeArg: never, idx: int): ItemConfigItem;

  Size: int;
}
