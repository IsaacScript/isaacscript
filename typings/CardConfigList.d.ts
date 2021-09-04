declare interface CardConfigList {
  Get(idx: int): ItemConfigCard | undefined;

  readonly Size: int;
}
