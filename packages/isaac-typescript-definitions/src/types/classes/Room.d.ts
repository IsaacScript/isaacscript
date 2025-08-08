import type { BackdropType } from "../../enums/BackdropType";
import type { BrokenWatchState } from "../../enums/BrokenWatchState";
import type { BossID } from "../../enums/collections/roomSubTypes";
import type { CollectibleType } from "../../enums/collections/subTypes";
import type { DoorSlot } from "../../enums/DoorSlot";
import type { GridCollisionClass } from "../../enums/GridCollisionClass";
import type { GridEntityType } from "../../enums/GridEntityType";
import type { GridPath } from "../../enums/GridPath";
import type { LineCheckMode } from "../../enums/LineCheckMode";
import type { RenderMode } from "../../enums/RenderMode";
import type { RoomShape } from "../../enums/RoomShape";
import type { RoomType } from "../../enums/RoomType";

declare global {
  interface Room extends IsaacAPIClass {
    /**
     * @param position1
     * @param position2
     * @param lineCheckMode
     * @param gridPathThreshold Default is 0.
     * @param ignoreWalls Default is false.
     * @param ignoreCrushable Default is false.
     * @returns 2 values:
     * - clear - True if there are no obstructions between `position` and `position2`, false
     *   otherwise.
     * - collidePos - The first hit position from `position1` to `position2`. Returns `position2` if
     *   the line didn't hit anything.
     */
    CheckLine: (
      position1: Vector,
      position2: Vector,
      lineCheckMode: LineCheckMode,
      gridPathThreshold?: int | GridPath,
      ignoreWalls?: boolean,
      ignoreCrushable?: boolean,
    ) => LuaMultiReturn<[clear: boolean, collidePos: Vector]>;

    DamageGrid: (index: int, damage: int) => boolean;
    DamageGridWithSource: (
      index: int,
      damage: int,
      source: EntityRef,
    ) => boolean;
    DestroyGrid: (index: int, immediate: boolean) => boolean;
    DestroyGridWithSource: (
      index: int,
      immediate: boolean,
      source: EntityRef,
    ) => boolean;
    EmitBloodFromWalls: (duration: int, count: int) => void;

    /**
     * @param position
     * @param initialStep Default is 0.
     * @param avoidActiveEntities Default is false.
     * @param allowPits Default is false.
     */
    FindFreePickupSpawnPosition: (
      position: Vector,
      initialStep?: float,
      avoidActiveEntities?: boolean,
      allowPits?: boolean,
    ) => Vector;

    FindFreeTilePosition: (
      position: Vector,
      distanceThreshold: float,
    ) => Vector;
    GetAliveBossesCount: () => int;
    GetAliveEnemiesCount: () => int;
    GetAwardSeed: () => Seed;
    GetBackdropType: () => BackdropType;

    /**
     * Returns 0 if this is not a boss room.
     *
     * @deprecated It is recommended to never use `Room.GetBossID` directly and instead use the
     *             `getBossID` helper function from `isaacscript-common`, since it has a saner
     *             return type and correctly handles Dogma, The Beast, and Ultra Greedier.
     */
    GetBossID: () => BossID | 0;

    GetBottomRightPos: () => Vector;
    GetBrokenWatchState: () => int;
    GetCenterPos: () => Vector;
    GetClampedGridIndex: (position: Vector) => int;
    GetClampedPosition: (position: Vector, margin: float) => Vector;
    GetDecorationSeed: () => Seed;
    GetDeliriumDistance: () => int;
    GetDevilRoomChance: () => float;
    GetDoor: (doorSlot: DoorSlot) => GridEntityDoor | undefined;
    GetDoorSlotPosition: (doorSlot: DoorSlot) => Vector;
    GetDungeonRockIdx: () => int;

    /**
     * Returns the total amount of HP lost by all enemies in the room between the last game frame
     * and this one.
     *
     * This is used by items that charge on damage inflicted (e.g. Berserk!).
     */
    GetEnemyDamageInflicted: () => int;

    /** @deprecated Use the `Isaac.GetRoomEntities` method instead. */
    GetEntities: () => EntityList;

    GetFrameCount: () => int;
    GetGridCollision: (gridIndex: int) => GridCollisionClass;
    GetGridCollisionAtPos: (position: Vector) => GridCollisionClass;
    GetGridEntity: (gridIndex: int) => GridEntity | undefined;
    GetGridEntityFromPos: (position: Vector) => GridEntity | undefined;
    GetGridHeight: () => int;
    GetGridIndex: (position: Vector) => int;
    GetGridPath: (index: int) => int;
    GetGridPathFromPos: (position: Vector) => int;
    GetGridPosition: (gridIndex: int) => Vector;
    GetGridSize: () => int;

    /** Note that if you call this in the main menu, the game will sometimes crash. */
    GetGridWidth: () => int;

    GetLaserTarget: (position: Vector, direction: Vector) => Vector;

    /**
     * Usually returns 1, unless the lava is in the process of being cooled down by Flush or other
     * room flooding effects, in which case this will gradually decrease down to 0.
     */
    GetLavaIntensity: () => float;

    GetLightingAlpha: () => float;

    // GetLRoomAreaDesc is not implemented.

    // GetLRoomTileDesc is not implemented.

    GetRandomPosition: (margin: float) => Vector;
    GetRandomTileIndex: (seed: Seed) => int;
    GetRedHeartDamage: () => boolean;

    /**
     * Returns the current render mode, which can be used to render entities differently depending
     * on the context (i.e. custom water reflections).
     */
    GetRenderMode: () => RenderMode;

    GetRenderScrollOffset: () => Readonly<Vector>;
    GetRenderSurfaceTopLeft: () => Readonly<Vector>;
    GetRoomConfigStage: () => int;
    GetRoomShape: () => RoomShape;

    /** Returns 0 if this is not a Double Trouble boss room. */
    GetSecondBossID: () => BossID | 0;

    /**
     * @param seed
     * @param noDecrease If true, the collectible will not be removed from the pool that it came
     *                   from. Default is false.
     */
    GetSeededCollectible: (seed: Seed, noDecrease?: boolean) => CollectibleType;

    GetShopLevel: () => int;
    GetSpawnSeed: () => Seed;
    GetTintedRockIdx: () => int;
    GetTopLeftPos: () => Vector;
    GetType: () => RoomType;

    /** Returns a vector corresponding to any water current in the room. */
    GetWaterCurrent: () => Vector;

    /** Returns true if the player is inside the abandoned mineshaft. */
    HasCurseMist: () => boolean;

    /** Returns true if the room contains lava pits. */
    HasLava: () => boolean;

    HasSlowDown: () => boolean;
    HasTriggerPressurePlates: () => boolean;
    HasWater: () => boolean;
    HasWaterPits: () => boolean;

    /** Causes chest previews from Guppy's Eye to be updated on the next frame. */
    InvalidatePickupVision: () => void;

    IsAmbushActive: () => boolean;
    IsAmbushDone: () => boolean;
    IsClear: () => boolean;
    IsCurrentRoomLastBoss: () => boolean;

    /**
     * Returns whether the supplied door slot is valid for the current room. This is contingent on
     * the room definition in the STB/XML file. (Basement Renovator displays valid doors as brown
     * and invalid doors as white.) The value returned by this method is independent of whether a
     * door currently exists at the given slot.
     *
     * For example, in the starting room of a floor (i.e. a 1x1 room), this method would return true
     * for `DoorSlot.LEFT_0`, `DoorSlot.UP_0`, `DoorSlot.RIGHT_0`, and `DoorSlot.DOWN_0`, and false
     * for all other values (regardless of what doors happen to exist).
     *
     * For example, there is a relatively common 1x1 room in the Caves with 4 Boom Flies and a
     * narrow bridge from the top door to the bottom door. In this room, the doors on the left side
     * and the right side are disabled. In this room, this method would return true for
     * `DoorSlot.UP0` and `DoorSlot.DOWN0`, and false for all other values (regardless of what doors
     * happen to exist).
     */
    IsDoorSlotAllowed: (doorSlot: DoorSlot) => boolean;

    IsFirstEnemyDead: () => boolean;
    IsFirstVisit: () => boolean;
    IsInitialized: () => boolean;
    IsLShapedRoom: () => boolean;

    /** Returns true if the player is inside the mirror dimension. */
    IsMirrorWorld: () => boolean;

    IsPositionInRoom: (position: Vector, margin: float) => boolean;
    IsSacrificeDone: () => boolean;
    KeepDoorsClosed: () => void;

    /**
     * @param position Optional. The position where the explosion should originate. Default is
     *                 `Vector.Zero`.
     * @param player Optional. The player that the explosion should come from.
     */
    MamaMegaExplosion: (position?: Vector, player?: EntityPlayer) => void;

    PlayMusic: () => void;
    RemoveDoor: (doorSlot: DoorSlot) => void;

    RemoveGridEntity: (
      gridIndex: int,
      pathTrail: int,
      keepDecoration: boolean,
    ) => void;

    Render: () => void;
    RespawnEnemies: () => void;
    ScreenWrapPosition: (position: Vector, margin: float) => Vector;
    SetAmbushDone: (value: boolean) => void;
    SetBrokenWatchState: (brokenWatchState: BrokenWatchState) => void;
    SetCardAgainstHumanity: () => void;
    SetClear: (clear: boolean) => void;
    SetFirstEnemyDead: (value: boolean) => void;
    SetFloorColor: (floorColor: Color) => void;
    SetGridPath: (index: int, value: int) => boolean;
    SetRedHeartDamage: () => void;
    SetSacrificeDone: (done: boolean) => void;
    SetSlowDown: (duration: int) => void;
    SetWallColor: (wallColor: Color) => void;
    ShopReshuffle: (
      keepCollectibleIdx: boolean,
      reselectSaleItem: boolean,
    ) => void;
    ShopRestockFull: () => void;
    ShopRestockPartial: () => void;
    SpawnClearAward: () => void;

    SpawnGridEntity: (
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant: int,
      seed: Seed,
      varData: int,
    ) => boolean;

    /** Stops any rain effects in the room. */
    StopRain: () => void;

    /**
     * Triggers all room clear effects (e.g. Sack of Pennies dropping coins). Does not actually
     * clear the room.
     *
     * @param silent Default is false. Set to true to mute the door opening sounds.
     */
    TriggerClear: (silent?: boolean) => void;

    /**
     * This function was updated to take two arguments in Repentance. The reason for this is that
     * bridges can be spike bridges, so the specifying the type of rock is necessary.
     */
    TryMakeBridge: (pit: GridEntity, rock: GridEntity) => boolean;

    TryPlaceLadder: (
      playerPos: Vector,
      playerVelocity: Vector,
      ladder: Entity,
    ) => void;

    /**
     * Attempts to spawn a door to the Blue Womb. This usually does nothing outside of the Mom's
     * Heart's boss room unless `force` is set to true.
     *
     * @param firstTime Default is true.
     * @param ignoreTime Default is false.
     * @param force Default is false.
     */
    TrySpawnBlueWombDoor: (
      firstTime?: boolean,
      ignoreTime?: boolean,
      force?: boolean,
    ) => boolean;

    /**
     * Attempts to spawn a door to the Boss Rush. This usually does nothing outside of the Mom Boss
     * Room unless `force` is set to true.
     *
     * @param ignoreTime Default is false.
     * @param force Default is false.
     */
    TrySpawnBossRushDoor: (ignoreTime?: boolean, force?: boolean) => boolean;

    /**
     * Attempts to spawn a door to the devil or angel room. This usually does nothing inside of
     * non-boss rooms unless `force` is set to true.
     *
     * @param animate Default is false.
     * @param force Default is false.
     */
    TrySpawnDevilRoomDoor: (animate?: boolean, force?: boolean) => boolean;

    /**
     * Attempts to spawn a door to Mega Satan. This usually does nothing outside of the starting
     * room of the Chest / Dark Room unless `force` is set to true.
     *
     * @param force Default is false.
     */
    TrySpawnMegaSatanRoomDoor: (force?: boolean) => boolean;

    /**
     * Attempts to spawn a door to the Downpour, Mines, or Mausoleum "secret exit", depending on the
     * current floor. This usually does nothing outside of boss rooms unless `force` is set to true.
     *
     * Note that if "force" is set to true and all of the available doors in the room are taken,
     * then this method may spawn the door on a slot outside the normal bounds of the room. For this
     * reason, it is recommended to check for available doors before invoking this method.
     *
     * @param animate Default is false.
     * @param force Default is false.
     */
    TrySpawnSecretExit: (animate?: boolean, force?: boolean) => void;

    /**
     * Attempts to spawn a trapdoor to the Member Card shop within the current room. This usually
     * does nothing outside of shops (or if the player does not have a Member Card) unless `force`
     * is set to true.
     *
     * @param force Default is false.
     */
    TrySpawnSecretShop: (force?: boolean) => void;

    /**
     * Attempts to spawn a door to the Mirror Dimension in Downpour or the abandoned mineshaft in
     * the Mines.
     */
    TrySpawnSpecialQuestDoor: () => void;

    /**
     * Attempts to spawn a door to a room containing a Void portal. This usually does nothing
     * outside of Hush's boss room unless `force` is set to true.
     *
     * @param force Default is false.
     */
    TrySpawnTheVoidDoor: (force?: boolean) => boolean;

    TurnGold: () => void;
    Update: () => void;
    WorldToScreenPosition: (worldPos: Vector) => Vector;
  }
}
