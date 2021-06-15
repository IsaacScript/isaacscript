declare class ItemConfigList {
  /**
   * ItemConfigList is bugged such that using the "Get()" method returns Lua userdata.
   * This userdata cannot be used for anything. Instead, use "ItemConfig.GetCollectible()".
   */
  Get(idx: never): ItemConfigItem;

  Size: int;
}
