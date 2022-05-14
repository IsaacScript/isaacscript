declare interface CardConfigList {
  /**
   * @deprecated This function is bugged and returns useless userdata.
   */
  Get(idx: int, fakeArg: never): never;

  readonly Size: int;
}
