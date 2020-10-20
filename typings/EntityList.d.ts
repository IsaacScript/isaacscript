declare class EntityList {
  __len(): int; // eslint-disable-line no-underscore-dangle
  Get(idx: int): Entity;

  readonly Size: int;
}
