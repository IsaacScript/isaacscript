declare interface EntityList {
  Get(idx: int): Entity | undefined;

  readonly Size: int;
}
