import type {
  BackdropType,
  EntityType,
  GridEntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import type { StbRailVariant } from "../../enums/StbRailVariant";

declare global {
  interface Room extends IsaacAPIClass {
    /**
     * Repentogon's modified `Room.SpawnGridEntity` method.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param gridIndex
     * @param gridEntityType
     * @param variant Optional. Default is 0.
     * @param seed Optional.
     * @param varData Optional. Default is 0.
     * @param descriptor
     * @customName SpawnGridEntity
     */
    SpawnGridEntityEx: ((
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant?: int,
      seed?: Seed,
      varData?: int,
    ) => void) &
      ((gridIndex: int, descriptor: GridEntityDesc) => void);

    /**
     * Repentogon's modified `Room.TrySpawnSpecialQuestDoor` method.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param ignoreStageType Optional. Whether the Mirror & Mineshaft door can spawn outside of
     *                        stages outside of the alt-floor. Default is false.
     * @customName TrySpawnSpecialQuestDoor
     */
    TrySpawnSpecialQuestDoorEx: (ignoreStageType?: boolean) => boolean;

    /** Returns whether the grid entity with the specified GridIndex can be picked up. */
    CanPickupGridEntity: (gridIndex: int) => boolean;

    CanSpawnObstacleAtPosition: (gridIndex: int, force: boolean) => void;

    /**
     * Creates a lightning strike effect as seen in Downpour.
     *
     * @param seed Optional. The seed determines the intensity and sound pitch.
     */
    DoLightningStrike: (seed?: Seed) => void;

    // `GetBackdrop` is currently unimplemented as the `Image` class is not complete.

    /** Returns a `Camera` object. */
    GetCamera: () => Camera;

    /** Returns the probability that boss spawns in this room will be champions. */
    GetChampionBossChance: () => float;

    GetEffects: () => TemporaryEffects;
    GetFloorColor: () => Color;
    GetFXParams: () => FXParams;

    /**
     * Returns the amount of time left in frames before the next Greed wave starts. Returns -1 if
     * the timer is not counting down.
     */
    GetGreedWaveTimer: () => int;

    /**
     * Returns the grid index from the specified row and column. Returns -1 if no grid index exists
     * at that point.
     */
    GetGridIndexByTile: (row: int, column: int) => int;

    /** Returns the intensity of the lightning effect. */
    GetLightningIntensity: () => number;

    /**
     * Returns the approximate number of areas in a room that spawn a rain effect in a tight radius.
     */
    GetNumRainSpawners: () => int;

    GetRail: (gridIndex: int) => StbRailVariant | undefined;

    GetRailManager: () => RailManager;

    /** Returns the rain intensity in the room. */
    GetRainIntensity: () => float;

    GetRoomClearDelay: () => int;

    /** Returns the price of the item in the current room. */
    GetShopItemPrice: (
      pickupVariant: PickupVariant,
      subType: int,
      shopItemID: int,
    ) => int;

    /**
     * Returns the amount of water in the room.
     *
     * During normal play, the value is between 0 and 1, with 0 meaning no water is present in the
     * room. However, mods can set this value to be above 1.
     */
    GetWaterAmount: () => number;

    /** Returns the color of the water in the current room. */
    GetWaterColor: () => KColor;

    GetWaterColorMultiplier: () => KColor;

    /** Returns whether boss spawns in this room will be champions. */
    IsChampionBossSeed: () => boolean;

    /**
     * Returns whether the specified entity can persist in a room.
     *
     * @param entityType
     * @param variant Optional. Default is 0.
     */
    IsPersistentRoomEntity: (entityType: EntityType, variant?: int) => void;

    /**
     * Attempts to pick up the grid entity at the specified index. Returns an `EntityEffect` of the
     * picked up entity if successful, otherwise undefined is returned.
     */
    PickupGridEntity: (index: int) => EntityEffect | undefined;

    /** Immediately removes the grid index at the specified grid index. */
    RemoveGridEntityImmediate: (
      gridIndex: int,
      pathTrail: int,
      keepDecoration: boolean,
    ) => void;

    /**
     * Sets the room's backdrop.
     *
     * The backdrop variant chosen is seeded based on the room and does not persist when leaving and
     * re-entering. Calling this method again on re-entry will result in the same backdrop variant
     * as before.
     *
     * @param backdrop
     * @param unknown This method does not work unless the value of this parameter is 0. This
     *                parameter is currently undocumented.
     */
    SetBackdropType: (backdrop: BackdropType, unknown: int) => void;

    /** Sets the greed wave timer. */
    SetGreedWaveTimer: (time: int) => void;

    /** Sets the intensity of the lava in the room. */
    SetLavaIntensity: (intensity: float) => void;

    /** Sets the intensity of the lightning effect in the room. */
    SetLightningIntensity: (intensity: float) => void;

    SetPauseTimer: (duration: int) => void;
    SetRail: (gridIndex: int, railVariant: StbRailVariant) => void;
    SetRainIntensity: (intensity: number) => void;
    SetRoomClearDelay: (delay: int) => void;

    /**
     * Sets the amount of water in the current room. Setting the amount to 0 will remove the water.
     */
    SetWaterAmount: (amount: number) => void;

    /** Sets the color of the water in the room. */
    SetWaterColor: (color: KColor) => void;

    /**
     * Sets the strength of the water current in the room. The water current particles and sounds
     * are automatically handled by the game.
     *
     * Setting the current to `VectorZero` will remove the current.
     */
    SetWaterCurrent: (current: Vector) => void;

    TryGetShopDiscount: (shopItem: int, price: int) => int;

    /**
     * Updates the room's color correction with the copy of `FXParams.ColorModifier`.
     *
     * @param process Optional. Whether the color correction should be ran through additional
     *                modifications for lava and the abandoned mineshaft sequence. Default is true.
     * @param lerp Optional. Default is true.
     * @param rate Optional. Default is 0.015.
     */
    UpdateColorModifier: (
      process?: boolean,
      lerp?: boolean,
      rate?: float,
    ) => void;
  }
}
