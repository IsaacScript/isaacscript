/** @noSelf */
declare function EntityRef(entity: Entity): EntityRef;

declare class EntityRef {
  Type: EntityType | int;
  Variant: EntityVariantForAC;
  SpawnerType: EntityType | int;
  SpawnerVariant: EntityVariantForAC;
  Position: Vector;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Entity: Entity;
}
