declare interface EffectList extends IsaacAPIClass {
  readonly Get: (idx: int) => TemporaryEffect | undefined;

  Size: int;
}
