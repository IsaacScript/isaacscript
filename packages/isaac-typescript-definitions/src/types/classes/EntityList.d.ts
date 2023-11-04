declare interface EntityList extends IsaacAPIClass {
  Get: (idx: int) => Entity | undefined;

  readonly Size: int;
}
