import type {
  BackdropType,
  EntityType,
  GridEntityType,
  ItemPoolType,
  Music,
  PickupVariant,
} from "isaac-typescript-definitions";
import type { StbRailVariant } from "../../enums/StbRailVariant";

declare global {
  interface Room extends IsaacAPIClass {
    /** Returns whether the grid entity with the specified GridIndex can be picked up. */
    CanPickupGridEntity: (gridIndex: int) => boolean;

    /** Returns whether an obstacle can be spawned at the provided grid index. */
    CanSpawnObstacleAtPosition: (gridIndex: int, force: boolean) => boolean;

    /**
     * @param excludeNPCs Optional. Default is false.
     * @param source Optional. Default is undefined.
     */
    ClearBossHazards: (excludeNPCs?: boolean, source?: Entity) => void;

    /**
     * Creates a lightning strike effect as seen in Downpour.
     *
     * @param seed Optional. The seed determines the intensity and sound pitch. The game calculates
     *             the intensity and pitch using the following formulas: `1.3 + RNG.RandomFloat() *
     *             0.6` and `0.9 + RNG.RandomFloat() * 0.2` respectively. Default is a randomized
     *             seed.
     */
    DoLightningStrike: (seed?: Seed) => void;

    GetBackdrop: () => Backdrop;

    /** Returns the room's `BackdropType`. */
    GetBackdropType: () => BackdropType;

    /** Returns the room's boss victory jingle. */
    GetBossVictoryJingle: () => Music;

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
    GetGridIndexByTile: ((row: int, column: int) => int)
      & ((tile: [int, int]) => int);

    /**
     * Returns the room's current item pool.
     *
     * @param seed Optional. Default is a call to `Random()`.
     * @param raw Optional. Default is false.
     */
    GetItemPool: (seed?: Seed, raw?: boolean) => ItemPoolType;

    /** Returns the intensity of the lightning effect. */
    GetLightningIntensity: () => float;

    /** Returns a descriptor of the corners of an L-room shape in world coordinates. */
    GetLRoomAreaDesc: () => LRoomAreaDesc;

    /** Returns a descriptor of the corners of an L-room shape in grid coordinates. */
    GetLRoomTileDesc: () => LRoomTileDesc;

    /**
     * Returns the approximate number of areas in a room that spawn a rain effect in a tight radius.
     */
    GetNumRainSpawners: () => int;

    /**
     * Returns the `StbRailVariant` at the provided grid index. Returns undefined if there is no
     * rail.
     */
    GetRail: (gridIndex: int) => StbRailVariant | undefined;

    /** Returns the room's `RailManager` object. */
    GetRailManager: () => RailManager;

    /** Returns the rain intensity in the room. */
    GetRainIntensity: () => float;

    /** Returns the room clear delay. */
    GetRoomClearDelay: () => int;

    /** Returns the price of the item in the current room. */
    GetShopItemPrice: (
      pickupVariant: PickupVariant,
      subType: int,
      shopItemID: int,
    ) => int;

    GetWallColor: () => Color;

    /**
     * Returns the amount of water in the room.
     *
     * During normal play, the value is between 0 and 1, with 0 meaning no water is present in the
     * room. However, mods can set this value to be above 1.
     */
    GetWaterAmount: () => number;

    /** Returns the color of the water in the current room. */
    GetWaterColor: () => KColor;

    /** Returns the water's color multiplier. */
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

    SaveState: () => void;

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

    GetFXLayers: () => FXLayers;

    /** Sets the greed wave timer. */
    SetGreedWaveTimer: (time: int) => void;

    /**
     * Sets the room's item pool. This takes priority over the game's regular pool selection code.
     * Passing `ItemPoolType.NULL` will have the game handle item pool selection.
     *
     * This is reset upon leaving the room.
     */
    SetItemPool: (poolType: ItemPoolType) => void;

    /** Sets the intensity of the lava in the room. */
    SetLavaIntensity: (intensity: float) => void;

    /** Sets the intensity of the lightning effect in the room. */
    SetLightningIntensity: (intensity: float) => void;

    /**
     * Sets how many frames the room is paused for. When the room is paused, the AI and animations
     * of all NPCs and effects stop updating.
     *
     * NPCs and effects that are spawned while the room is still paused will still update until the
     * method is called again.
     */
    SetPauseTimer: (duration: int) => void;

    /** Adds a rail at the provided grid index. */
    SetRail: (gridIndex: int, railVariant: StbRailVariant) => void;

    /** Sets the room's rain intensity. This is used by the rain effect spawners in Downpour. */
    SetRainIntensity: (intensity: number) => void;

    /** Sets the room's clear delay. */
    SetRoomClearDelay: (delay: int) => void;

    /**
     * Sets the amount of water in the current room. Setting the amount to 0 will remove the water.
     */
    SetWaterAmount: (amount: number) => void;

    /** Sets the color of the water in the room. */
    SetWaterColor: (color: KColor) => void;

    /** Sets the water's color multiplier. */
    SetWaterColorMultiplier: (color: KColor) => void;

    /**
     * Sets the strength of the water current in the room. The water current particles and sounds
     * are automatically handled by the game.
     *
     * Setting the current to `VectorZero` will remove the current.
     */
    SetWaterCurrent: (current: Vector) => void;

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
     * @param seed Optional. Default is a random seed.
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
    ) => void)
      & ((gridIndex: int, descriptor: GridEntityDesc) => void);

    /**
     * Triggers an event in the room.
     *
     * @param output Must be between 0 and 9, otherwise the method will error.
     */
    TriggerOutput: (output: int) => void;

    TriggerRestock: (gridIndex: int, shopIndex: int) => void;

    /** Returns a discounted price of a shop item. */
    TryGetShopDiscount: (shopItem: int, price: int) => int;

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
