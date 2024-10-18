import type {
  BackdropType,
  GridEntityType,
} from "isaac-typescript-definitions";

declare global {
  interface GridEntityRock extends GridEntity {
    /**
     * Returns the alternative rock type (i.e. urn, mushroom, etc.) that th rock is.
     *
     * @param backdrop Optional. The alternative rock type that is returned depends on the backdrop.
     *                 For example, if the backdrop is `BackdropType.CAVES`, the alternative rock
     *                 type is a mushroom. Default is `BackdropType.NULL` (The current backdrop).
     */
    GetAltRockType: (backdropType?: BackdropType) => int;
    /**
     * Plays the grid break sound.
     *
     * @param gridEntityType The grid entity type that the sound corresponds to.
     * @param backdrop Optional. Some grid entities have unique break sounds based on the room's
     *                 current backdrop. Default is `BackdropType.NULL` (The current backdrop).
     */
    PlayBreakSound: (
      gridEntityType: GridEntityType,
      backdrop?: BackdropType,
    ) => void;
    /** Forces the game to treat the rock as if it's been destroyed. */
    RegisterRockDestroyed: (gridEntityType: GridEntityType) => void;
    RenderTop: (offset: Vector) => void;
    /**
     * @param gridEntityType
     * @param gridVariant
     * @param seed
     * @param unknown
     * @param backdrop Optional. Default is `BackdropType.NULL` (The current backdrop).
     */
    SpawnDrops: (
      gridEntityType: GridEntityType,
      gridVariant: int,
      seed: Seed,
      unknown: boolean,
      backdrop: BackdropType,
    ) => void;
    TrySpawnLadder: () => void;
    TrySpawnWorms: () => void;
    /** Updates the rock's collision. */
    UpdateCollision: () => void;
    UpdateNeighbors: () => void;
  }
}
