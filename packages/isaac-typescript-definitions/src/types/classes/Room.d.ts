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
    readonly CheckLine: (
      position1: Vector,
      position2: Vector,
      lineCheckMode: LineCheckMode,
      gridPathThreshold?: int | GridPath,
      ignoreWalls?: boolean,
      ignoreCrushable?: boolean,
    ) => LuaMultiReturn<[clear: boolean, collidePos: Vector]>;

    readonly DamageGrid: (index: int, damage: int) => boolean;

    /** Added in Repentance+. */
    readonly DamageGridWithSource: (
      index: int,
      damage: int,
      source: EntityRef,
    ) => boolean;

    readonly DestroyGrid: (index: int, immediate: boolean) => boolean;

    /** Added in Repentance+. */
    readonly DestroyGridWithSource: (
      index: int,
      immediate: boolean,
      source: EntityRef,
    ) => boolean;

    readonly EmitBloodFromWalls: (duration: int, count: int) => void;

    /**
     * @param position
     * @param initialStep Default is 0.
     * @param avoidActiveEntities Default is false.
     * @param allowPits Default is false.
     */
    readonly FindFreePickupSpawnPosition: (
      position: Vector,
      initialStep?: float,
      avoidActiveEntities?: boolean,
      allowPits?: boolean,
    ) => Vector;

    readonly FindFreeTilePosition: (
      position: Vector,
      distanceThreshold: float,
    ) => Vector;
    readonly GetAliveBossesCount: () => int;
    readonly GetAliveEnemiesCount: () => int;
    readonly GetAwardSeed: () => Seed;
    readonly GetBackdropType: () => BackdropType;

    /**
     * Returns 0 if this is not a boss room.
     *
     * @deprecated It is recommended to never use `Room.GetBossID` directly and instead use the
     *             `getBossID` helper function from `isaacscript-common`, since it has a saner
     *             return type and correctly handles Dogma, The Beast, and Ultra Greedier.
     */
    readonly GetBossID: () => BossID | 0;

    readonly GetBottomRightPos: () => Vector;
    readonly GetBrokenWatchState: () => int;
    readonly GetCenterPos: () => Vector;
    readonly GetClampedGridIndex: (position: Vector) => int;
    readonly GetClampedPosition: (position: Vector, margin: float) => Vector;
    readonly GetDecorationSeed: () => Seed;
    readonly GetDeliriumDistance: () => int;
    readonly GetDevilRoomChance: () => float;
    readonly GetDoor: (doorSlot: DoorSlot) => GridEntityDoor | undefined;
    readonly GetDoorSlotPosition: (doorSlot: DoorSlot) => Vector;
    readonly GetDungeonRockIdx: () => int;

    /**
     * Returns the total amount of HP lost by all enemies in the room between the last game frame
     * and this one.
     *
     * This is used by items that charge on damage inflicted (e.g. Berserk!).
     */
    readonly GetEnemyDamageInflicted: () => int;

    /** @deprecated Use the `Isaac.GetRoomEntities` method instead. */
    readonly GetEntities: () => EntityList;

    readonly GetFrameCount: () => int;
    readonly GetGridCollision: (gridIndex: int) => GridCollisionClass;
    readonly GetGridCollisionAtPos: (position: Vector) => GridCollisionClass;
    readonly GetGridEntity: (gridIndex: int) => GridEntity | undefined;
    readonly GetGridEntityFromPos: (position: Vector) => GridEntity | undefined;
    readonly GetGridHeight: () => int;
    readonly GetGridIndex: (position: Vector) => int;
    readonly GetGridPath: (index: int) => int;
    readonly GetGridPathFromPos: (position: Vector) => int;
    readonly GetGridPosition: (gridIndex: int) => Vector;
    readonly GetGridSize: () => int;

    /** Note that if you call this in the main menu, the game will sometimes crash. */
    readonly GetGridWidth: () => int;

    readonly GetLaserTarget: (position: Vector, direction: Vector) => Vector;

    /**
     * Usually returns 1, unless the lava is in the process of being cooled down by Flush or other
     * room flooding effects, in which case this will gradually decrease down to 0.
     */
    readonly GetLavaIntensity: () => float;

    readonly GetLightingAlpha: () => float;

    // GetLRoomAreaDesc is not implemented.

    // GetLRoomTileDesc is not implemented.

    readonly GetRandomPosition: (margin: float) => Vector;
    readonly GetRandomTileIndex: (seed: Seed) => int;
    readonly GetRedHeartDamage: () => boolean;

    /**
     * Returns the current render mode, which can be used to render entities differently depending
     * on the context (i.e. custom water reflections).
     */
    readonly GetRenderMode: () => RenderMode;

    readonly GetRenderScrollOffset: () => Readonly<Vector>;
    readonly GetRenderSurfaceTopLeft: () => Readonly<Vector>;
    readonly GetRoomConfigStage: () => int;
    readonly GetRoomShape: () => RoomShape;

    /** Returns 0 if this is not a Double Trouble boss room. */
    readonly GetSecondBossID: () => BossID | 0;

    /**
     * @param seed
     * @param noDecrease If true, the collectible will not be removed from the pool that it came
     *                   from. Default is false.
     */
    readonly GetSeededCollectible: (seed: Seed, noDecrease?: boolean) => CollectibleType;

    readonly GetShopLevel: () => int;
    readonly GetSpawnSeed: () => Seed;
    readonly GetTintedRockIdx: () => int;
    readonly GetTopLeftPos: () => Vector;
    readonly GetType: () => RoomType;

    /** Returns a vector corresponding to any water current in the room. */
    readonly GetWaterCurrent: () => Vector;

    /** Returns true if the player is inside the abandoned mineshaft. */
    readonly HasCurseMist: () => boolean;

    /** Returns true if the room contains lava pits. */
    readonly HasLava: () => boolean;

    readonly HasSlowDown: () => boolean;
    readonly HasTriggerPressurePlates: () => boolean;
    readonly HasWater: () => boolean;
    readonly HasWaterPits: () => boolean;

    /** Causes chest previews from Guppy's Eye to be updated on the next frame. */
    readonly InvalidatePickupVision: () => void;

    readonly IsAmbushActive: () => boolean;
    readonly IsAmbushDone: () => boolean;
    readonly IsClear: () => boolean;
    readonly IsCurrentRoomLastBoss: () => boolean;

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
    readonly IsDoorSlotAllowed: (doorSlot: DoorSlot) => boolean;

    readonly IsFirstEnemyDead: () => boolean;
    readonly IsFirstVisit: () => boolean;
    readonly IsInitialized: () => boolean;
    readonly IsLShapedRoom: () => boolean;

    /** Returns true if the player is inside the mirror dimension. */
    readonly IsMirrorWorld: () => boolean;

    readonly IsPositionInRoom: (position: Vector, margin: float) => boolean;
    readonly IsSacrificeDone: () => boolean;
    readonly KeepDoorsClosed: () => void;

    /**
     * @param position Optional. The position where the explosion should originate. Default is
     *                 `Vector.Zero`.
     * @param player Optional. The player that the explosion should come from. This parameter was
     *               added in Repentance+.
     */
    readonly MamaMegaExplosion: (position?: Vector, player?: EntityPlayer) => void;

    readonly PlayMusic: () => void;
    readonly RemoveDoor: (doorSlot: DoorSlot) => void;

    readonly RemoveGridEntity: (
      gridIndex: int,
      pathTrail: int,
      keepDecoration: boolean,
    ) => void;

    readonly Render: () => void;
    readonly RespawnEnemies: () => void;
    readonly ScreenWrapPosition: (position: Vector, margin: float) => Vector;
    readonly SetAmbushDone: (value: boolean) => void;
    readonly SetBrokenWatchState: (brokenWatchState: BrokenWatchState) => void;
    readonly SetCardAgainstHumanity: () => void;
    readonly SetClear: (clear: boolean) => void;
    readonly SetFirstEnemyDead: (value: boolean) => void;
    readonly SetFloorColor: (floorColor: Color) => void;
    readonly SetGridPath: (index: int, value: int) => boolean;
    readonly SetRedHeartDamage: () => void;
    readonly SetSacrificeDone: (done: boolean) => void;
    readonly SetSlowDown: (duration: int) => void;
    readonly SetWallColor: (wallColor: Color) => void;
    readonly ShopReshuffle: (
      keepCollectibleIdx: boolean,
      reselectSaleItem: boolean,
    ) => void;
    readonly ShopRestockFull: () => void;
    readonly ShopRestockPartial: () => void;
    readonly SpawnClearAward: () => void;

    readonly SpawnGridEntity: (
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant: int,
      seed: Seed,
      varData: int,
    ) => boolean;

    /** Stops any rain effects in the room. */
    readonly StopRain: () => void;

    /**
     * Triggers all room clear effects (e.g. Sack of Pennies dropping coins). Does not actually
     * clear the room.
     *
     * @param silent Default is false. Set to true to mute the door opening sounds.
     */
    readonly TriggerClear: (silent?: boolean) => void;

    /**
     * This function was updated to take two arguments in Repentance. The reason for this is that
     * bridges can be spike bridges, so the specifying the type of rock is necessary.
     */
    readonly TryMakeBridge: (pit: GridEntity, rock: GridEntity) => boolean;

    readonly TryPlaceLadder: (
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
    readonly TrySpawnBlueWombDoor: (
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
    readonly TrySpawnBossRushDoor: (ignoreTime?: boolean, force?: boolean) => boolean;

    /**
     * Attempts to spawn a door to the devil or angel room. This usually does nothing inside of
     * non-boss rooms unless `force` is set to true.
     *
     * @param animate Default is false.
     * @param force Default is false.
     */
    readonly TrySpawnDevilRoomDoor: (animate?: boolean, force?: boolean) => boolean;

    /**
     * Attempts to spawn a door to Mega Satan. This usually does nothing outside of the starting
     * room of the Chest / Dark Room unless `force` is set to true.
     *
     * @param force Default is false.
     */
    readonly TrySpawnMegaSatanRoomDoor: (force?: boolean) => boolean;

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
    readonly TrySpawnSecretExit: (animate?: boolean, force?: boolean) => void;

    /**
     * Attempts to spawn a trapdoor to the Member Card shop within the current room. This usually
     * does nothing outside of shops (or if the player does not have a Member Card) unless `force`
     * is set to true.
     *
     * @param force Default is false.
     */
    readonly TrySpawnSecretShop: (force?: boolean) => void;

    /**
     * Attempts to spawn a door to the Mirror Dimension in Downpour or the abandoned mineshaft in
     * the Mines.
     */
    readonly TrySpawnSpecialQuestDoor: () => void;

    /**
     * Attempts to spawn a door to a room containing a Void portal. This usually does nothing
     * outside of Hush's boss room unless `force` is set to true.
     *
     * @param force Default is false.
     */
    readonly TrySpawnTheVoidDoor: (force?: boolean) => boolean;

    readonly TurnGold: () => void;
    readonly Update: () => void;
    readonly WorldToScreenPosition: (worldPos: Vector) => Vector;
  }
}
