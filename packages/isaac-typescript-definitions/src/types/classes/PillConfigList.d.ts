declare interface PillConfigList extends IsaacAPIClass {
  readonly Get: (idx: int) => ItemConfigPillEffect | undefined;

  readonly Size: int;
}
