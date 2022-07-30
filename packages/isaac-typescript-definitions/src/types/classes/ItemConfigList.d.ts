declare interface ItemConfigList extends IsaacAPIClass {
  /**
   * @deprecated This method is bugged and returns useless `userdata`. Use the
   *             `ItemConfig.GetCollectible` method instead.
   */
  Get(fakeArg: never, idx: int): ItemConfigItem;

  Size: int;
}
