/** @noSelf */
declare function EntityRef(entity: Entity): EntityRef;

declare class EntityRef {
  Type: EntityType;
  Variant: EntityVariantForAC;
  SpawnerType: EntityType;
  SpawnerVariant: EntityVariantForAC;
  Position: Vector;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Entity: Entity;
}
