declare interface EntityList extends IsaacAPIClass {
  readonly Get: (idx: int) => Entity | undefined;

  readonly Size: int;
}
