declare interface EffectList {
  Get(idx: int): TemporaryEffect | undefined;

  Size: int;
}
