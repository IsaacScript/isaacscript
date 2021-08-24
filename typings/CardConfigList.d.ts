declare interface CardConfigList {
  Get(idx: int): ItemConfigCard | null;

  readonly Size: int;
}
