declare interface PillConfigList {
  Get(idx: int): ItemConfigPillEffect | null;

  readonly Size: int;
}
