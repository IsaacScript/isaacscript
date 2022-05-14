declare interface ItemConfigList {
  /**
   * @deprecated This function is bugged and returns useless userdata. Use the
   * `ItemConfig.GetCollectible` method instead.
   */
  Get(fakeArg: never, idx: int): ItemConfigItem;

  Size: int;
}
