import { EntityType } from "../enums/EntityType";

declare global {
  function EntityRef(this: void, entity: Entity): EntityRef;

  interface EntityRef {
    Entity: Entity;
    IsCharmed: boolean;
    IsFriendly: boolean;
    Position: Vector;
    SpawnerType: EntityType;
    SpawnerVariant: int;
    Type: EntityType;
    Variant: int;
  }
}
