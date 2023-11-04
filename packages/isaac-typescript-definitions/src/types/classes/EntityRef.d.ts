import type { EntityType } from "../../enums/EntityType";

declare global {
  /**
   * It is possible to pass undefined to the constructor, which will result in an `EntityRef` object
   * that has no associated entity.
   */
  function EntityRef(this: void, entity: Entity | undefined): EntityRef;

  interface EntityRef extends IsaacAPIClass {
    Entity: Entity | undefined;
    IsCharmed: boolean;
    IsFriendly: boolean;
    Position: Vector;
    SpawnerType: EntityType;
    SpawnerVariant: int;
    Type: EntityType;
    Variant: int;
  }
}
