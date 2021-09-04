declare interface CostumeConfigList {
  Get(idx: int): ItemConfigCostume | undefined;

  readonly Size: int;
}
