declare interface EffectList {
  Get(idx: int): TemporaryEffect | null;

  Size: int;
}
