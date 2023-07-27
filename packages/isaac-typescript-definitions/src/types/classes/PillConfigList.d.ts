declare interface PillConfigList extends IsaacAPIClass {
  Get: (idx: int) => ItemConfigPillEffect | undefined;

  readonly Size: int;
}
