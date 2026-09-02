declare interface VectorList extends IsaacAPIClass {
  readonly Get: (idx: int) => Vector | undefined;

  readonly Size: int;
}
