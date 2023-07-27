declare interface EffectList extends IsaacAPIClass {
  Get: (idx: int) => TemporaryEffect | undefined;

  Size: int;
}
