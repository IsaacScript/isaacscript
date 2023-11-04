declare interface VectorList extends IsaacAPIClass {
  Get: (idx: int) => Vector | undefined;

  readonly Size: int;
}
