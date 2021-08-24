declare interface VectorList {
  Get(idx: int): Vector | null;

  readonly Size: int;
}
