/**
 * A type union that matches `GridEntity`, `GridEntityDoor`, `GridEntityPit`, and so on.
 *
 * This is useful for building generic functions that should accept any kind of grid entity.
 */
export type AnyGridEntity =
  | GridEntity
  | GridEntityDoor
  | GridEntityPit
  | GridEntityPoop
  | GridEntityPressurePlate
  | GridEntityRock
  | GridEntitySpikes
  | GridEntityTNT;
