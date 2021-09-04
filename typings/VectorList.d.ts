declare interface VectorList {
  Get(idx: int): Vector | undefined;

  readonly Size: int;
}
