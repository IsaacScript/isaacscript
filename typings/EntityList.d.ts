declare interface EntityList {
  Get(idx: int): Entity | null;

  readonly Size: int;
}
