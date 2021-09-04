declare interface PillConfigList {
  Get(idx: int): ItemConfigPillEffect | undefined;

  readonly Size: int;
}
