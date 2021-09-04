declare function EntityRef(this: void, entity: Entity | undefined): EntityRef;

declare interface EntityRef {
  Entity: Entity;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Position: Vector;
  SpawnerType: EntityType | int;
  SpawnerVariant: int;
  Type: EntityType | int;
  Variant: int;
}
