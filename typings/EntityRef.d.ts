declare function EntityRef(this: void, entity: Entity | null): EntityRef;

declare class EntityRef {
  Entity: Entity;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Position: Vector;
  SpawnerType: EntityType | int;
  SpawnerVariant: EntityVariantForAC;
  Type: EntityType | int;
  Variant: EntityVariantForAC;
}
