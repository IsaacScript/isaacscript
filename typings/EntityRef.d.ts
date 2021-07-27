declare function EntityRef(this: void, entity: Entity | null): EntityRef;

declare class EntityRef {
  Entity: Entity;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Position: Vector;
  SpawnerType: EntityType | int;
  SpawnerVariant: int;
  Type: EntityType | int;
  Variant: int;
}
