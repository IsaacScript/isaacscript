declare interface CardConfigList {
  /** This function is bugged and returns useless userdata. */
  Get(idx: int): never;

  readonly Size: int;
}
