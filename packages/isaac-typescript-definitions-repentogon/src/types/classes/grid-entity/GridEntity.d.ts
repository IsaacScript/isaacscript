import type {
  BackdropType,
  DamageFlag,
  GridEntityType,
} from "isaac-typescript-definitions";

declare global {
  interface GridEntity extends IsaacAPIClass {
    GetAltRockType: (backdropType: BackdropType) => int;

    /** Returns the rock's render position. */
    GetRenderPosition: () => Vector;

    /**
     * @param entity
     * @param damage
     * @param damageFlags
     * @param unknown1 The behavior of this parameter is currently unknown and is undocumented.
     * @param unknown2 The behavior of this parameter is currently unknown and is undocumented.
     */
    HurtDamage: (
      entity: Entity,
      damage: int,
      damageFlags: BitFlags<DamageFlag>,
      unknown1: float,
      unknown2: boolean,
    ) => void;

    /**
     * @param int
     * @param damageFlags
     * @param unknown1 The behavior of this parameter is currently unknown and is undocumented.
     * @param unknown2 The behavior of this parameter is currently unknown and is undocumented.
     */
    HurtSurroundings: (
      int: DamageFlag,
      damageFlags: BitFlags<DamageFlag>,
      unknown1: float,
      unknown2: boolean,
    ) => void;

    /** Returns whether the grid entity is a breakable rock. */
    IsBreakableRock: () => boolean;

    /**
     * Makes the grid entity play the sound it plays when it breaks.
     *
     * @param gridEntityType The type of grid break sound to play. For example,
     *                       `GridEntityType.ROCK` would play the sound of a rock being broken.
     * @param backdrop The backdrop variant of the specified `gridEntityType`.
     */
    PlayBreakSound: (
      gridEntityType: GridEntityType,
      backdrop: BackdropType,
    ) => void;

    RegisterRockDestroyed: (gridEntityType: GridEntityType) => void;

    RenderTop: (offset: Vector) => void;

    // All of the `ToX` methods are not implemented as their associated classes don't have any
    // methods yet.

    TrySpawnLadder: () => void;
    TrySpawnWorms: () => void;
    UpdateCollision: () => void;
    UpdateNeighbors: () => void;
  }
}
