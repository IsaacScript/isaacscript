declare class EntityList {
  __len(): int;
  Get(idx: int): Entity | null;

  readonly Size: int;
}
