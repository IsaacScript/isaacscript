/** @noSelf */
declare function EntityRef(entity: Entity): EntityRef;

declare class EntityRef {
  Type: int;
  Variant: int;
  SpawnerType: int;
  SpawnerVariant: int;
  Position: Vector;
  IsCharmed: boolean;
  IsFriendly: boolean;
  Entity: Entity;
}
