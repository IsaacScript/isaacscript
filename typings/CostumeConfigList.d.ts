declare interface CostumeConfigList {
  Get(idx: int): ItemConfigCostume | null;

  readonly Size: int;
}
