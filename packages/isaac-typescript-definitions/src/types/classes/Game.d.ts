import type { BackdropType } from "../../enums/BackdropType";
import type { Challenge } from "../../enums/Challenge";
import type { EffectVariant } from "../../enums/collections/variants";
import type { Difficulty } from "../../enums/Difficulty";
import type { Dimension } from "../../enums/Dimension";
import type { Direction } from "../../enums/Direction";
import type { Ending } from "../../enums/Ending";
import type { EntityType } from "../../enums/EntityType";
import type { FadeoutTarget } from "../../enums/FadeoutTarget";
import type { DamageFlag } from "../../enums/flags/DamageFlag";
import type { TearFlag } from "../../enums/flags/TearFlag";
import type { GameStateFlag } from "../../enums/GameStateFlag";
import type { GridRoom } from "../../enums/GridRoom";
import type { LevelStage } from "../../enums/LevelStage";
import type { RoomTransitionAnim } from "../../enums/RoomTransitionAnim";
import type { StageTransitionType } from "../../enums/StageTransitionType";

declare global {
  function Game(this: void): Game;

  interface Game extends IsaacAPIClass {
    AddDevilRoomDeal: () => void;
    AddEncounteredBoss: (entityType: EntityType, variant: int) => void;
    AddPixelation: (duration: int) => void;
    AddStageWithoutDamage: () => void;
    AddStageWithoutHeartsPicked: () => void;
    AddTreasureRoomsVisited: () => void;

    /**
     * There is no separate `BombFlag` enum, so bombs use `TearFlag`.
     *
     * @param position
     * @param damage
     * @param radius
     * @param lineCheck Default is true.
     * @param source Default is undefined.
     * @param tearFlags Default is `TearFlag.TEAR_NORMAL`.
     * @param damageFlags Default is `DamageFlag.DAMAGE_EXPLOSION`.
     * @param damageSource Default is false.
     */
    BombDamage: (
      position: Vector,
      damage: float,
      radius: float,
      lineCheck?: boolean,
      source?: Entity,
      tearFlags?: TearFlag | BitFlags<TearFlag>,
      damageFlags?: DamageFlag | BitFlags<DamageFlag>,
      damageSource?: boolean,
    ) => void;

    /**
     * There is no separate `BombFlag` enum, so bombs use `TearFlag`.
     *
     * @param position
     * @param damage
     * @param tearFlags Default is `TearFlags.TEAR_NORMAL`.
     * @param color Default is `Color.Default`.
     * @param source Default is undefined.
     * @param radiusMultiplier Default is 1.
     * @param lineCheck Default is true.
     * @param damageSource Default is false.
     * @param damageFlags Default is `DamageFlag.DAMAGE_EXPLOSION`.
     */
    BombExplosionEffects: (
      position: Vector,
      damage: float,
      tearFlags?: TearFlag | BitFlags<TearFlag>,
      color?: Color,
      source?: Entity,
      radiusMultiplier?: float,
      lineCheck?: boolean,
      damageSource?: boolean,
      damageFlags?: DamageFlag | BitFlags<DamageFlag>,
    ) => void;

    /**
     * There is no separate `BombFlag` enum, so bombs use `TearFlag`.
     *
     * @param position
     * @param radius
     * @param tearFlags
     * @param source Default is undefined.
     * @param radiusMultiplier Default is 1.
     */
    BombTearflagEffects: (
      position: Vector,
      radius: float,
      tearFlags: TearFlag | BitFlags<TearFlag>,
      source?: Entity,
      radiusMultiplier?: float,
    ) => void;

    /**
     * @param position
     * @param radius
     * @param source
     * @param showEffect Optional. Default is false.
     * @param doSuperKnockback Optional. Default is false.
     */
    ButterBeanFart: (
      position: Vector,
      radius: float,
      source: Entity | undefined,
      showEffect?: boolean,
      doSuperKnockback?: boolean,
    ) => void;

    /**
     * This method is the same thing as the `Level.ChangeRoom` method, but it will update the
     * "fxlayers" of the room properly.
     *
     * ("fxlayers" stands for "effect layers". It refers to overlays, light effect from
     * Basement/Cathedral, the Dogma static background, and so on. It is specified in the
     * "fxlayers.xml" file.)
     *
     * @param roomGridIndex The room grid index of the destination room.
     * @param dimension Default is `Dimension.CURRENT`.
     */
    ChangeRoom: (roomGridIndex: int | GridRoom, dimension?: Dimension) => void;

    CharmFart: (position: Vector, radius: float, source: Entity) => void;
    ClearDonationModAngel: () => void;
    ClearDonationModGreed: () => void;
    ClearStagesWithoutDamage: () => void;
    ClearStagesWithoutHeartsPicked: () => void;
    Darken: (darkness: float, timeout: int) => void;
    DonateAngel: (donate: int) => void;
    DonateGreed: (donate: int) => void;
    End: (ending: Ending) => void;

    /**
     * @param speed A value between 0 and 1. Using a value of 0 will soft-lock the game. Using a
     *              value of 1 will instantaneously fade in.
     */
    Fadein: (speed: float) => void;

    /**
     * Using non-valid `FadeoutTarget` values will be interpreted the same as `FadeoutTarget.NONE`.
     *
     * @param speed A value between 0 and 1. Using a value of 0 will never trigger the fade out
     *              target. Using a value of 1 will instantaneously trigger the fade out target.
     * @param fadeoutTarget
     */
    Fadeout: (speed: float, fadeoutTarget: FadeoutTarget) => void;

    /**
     * @param position
     * @param radius Default is 85.
     * @param source Default is undefined.
     * @param fartScale Default is 1.
     * @param fartSubType Default is 0.
     * @param fartColor Default is `Color.Default`.
     */
    Fart: (
      position: Vector,
      radius?: float,
      source?: Entity,
      fartScale?: float,
      fartSubType?: int,
      fartColor?: Color,
    ) => void;

    FinishChallenge: () => void;

    // GetAmbush is not implemented.

    GetDarknessModifier: () => float;
    GetDevilRoomDeals: () => int;
    GetDonationModAngel: () => int;
    GetDonationModGreed: () => int;
    GetFont: () => Font;

    /**
     * Returns the amount of game frames that have passed since the run was started.
     *
     * - Game frames do not increase when the game is paused or when in the main menu.
     * - The in-game timer is based on game frames. (Subsequently, game frames are used to calculate
     *   the Boss Rush door opening and the Hush door opening.)
     * - 30 game frames equals 1 second.
     * - The game frame count is different from the count returned from the `Isaac.GetFrameCount`
     *   method; that returns the render frame count.
     * - Game frames and render frames are synchronized such two render frames will always
     *   correspond to one game frame, and the first render frame in the pair will always be odd.
     */
    GetFrameCount: () => int;

    GetGreedBossWaveNum: () => int;
    GetGreedWavesNum: () => int;

    // GetItemOverlay is not implemented.

    GetHUD: () => HUD;
    GetItemPool: () => ItemPool;

    /** @deprecated This method is bugged and returns useless `userdata`. */
    GetLastDevilRoomStage: () => LuaUserdata;

    GetLastLevelWithDamage: () => LevelStage;
    GetLastLevelWithoutHalfHp: () => LevelStage;
    GetLevel: () => Level;
    GetNearestPlayer: (position: Vector) => EntityPlayer;
    GetNumEncounteredBosses: () => int;
    GetNumPlayers: () => int;

    /** @deprecated Use the `Isaac.GetPlayer` method instead. */
    GetPlayer: (index: int) => EntityPlayer | undefined;

    GetRandomPlayer: (position: Vector, radius: float) => EntityPlayer;
    GetRoom: () => Room;
    GetScreenShakeCountdown: () => Readonly<int>;
    GetSeeds: () => Seeds;
    GetStagesWithoutDamage: () => int;
    GetStagesWithoutHeartsPicked: () => int;
    GetStateFlag: (gameStateFlag: GameStateFlag) => boolean;
    GetTargetDarkness: () => float;
    GetTreasureRoomVisitCount: () => int;
    GetVictoryLap: () => int;
    HasEncounteredBoss: (entityType: EntityType, variant: int) => boolean;
    HasHallucination: () => int;
    IsGreedMode: () => boolean;

    /**
     * Returns true if the game is paused or the console is open or a room transition animation is
     * occurring.
     */
    IsPaused: () => boolean;

    MakeShockwave: (
      position: Vector,
      amplitude: float,
      speed: float,
      duration: int,
    ) => void;

    MoveToRandomRoom: (
      includeIAmErrorRoom: boolean,
      seed: Seed,
      player: EntityPlayer,
    ) => void;

    NextVictoryLap: () => void;
    Render: () => void;
    RerollEnemy: (entity: Entity) => boolean;
    RerollLevelCollectibles: () => void;
    RerollLevelPickups: (seed: Seed) => void;
    SetLastDevilRoomStage: (levelStage: LevelStage) => void;
    SetLastLevelWithDamage: (levelStage: LevelStage) => void;
    SetLastLevelWithoutHalfHp: (levelStage: LevelStage) => void;
    SetStateFlag: (gameStateFlag: GameStateFlag, value: boolean) => void;
    ShakeScreen: (timeout: int) => void;
    ShowFortune: () => void;

    /**
     * @param frameCount
     * @param backdrop Default is a random backdrop, similar to what happens after using the
     *                 Delirious collectible.
     */
    ShowHallucination: (frameCount: int, backdropType?: BackdropType) => void;

    ShowRule: () => void;

    /**
     * Spawns a new entity with a specified seed. For spawning entities using a random seed, then
     * the `Isaac.Spawn` method should be used instead.
     *
     * In most cases, you should not be using this method directly, and instead be using the set of
     * `spawn` functions from the standard library. For example:
     *
     * - `spawn` - Will spawn anything with a convenient API.
     * - `spawnWithSeed - Will spawn anything with an API that makes it easy to specify a seed.`
     * - `spawnPickup` - Will spawn a pickup with a convenient API.
     * - `spawnPickupWithSeed - Will spawn a pickup with an API that makes it easy to specify a
     *   seed.`
     * - `spawnKey` - Will spawn a key with a convenient API.
     * - etc.
     *
     * @param entityType
     * @param variant
     * @param position
     * @param velocity The initial velocity of the entity. In most cases, you will want to pass the
     *                 `VectorZero` constant so that there is no initial velocity.
     * @param spawner Each entity stores a reference to the entity that spawned it in the
     *                `SpawnerEntity` field. (If the entity was not spawned by anything in
     *                particular, `SpawnerEntity` will be equal to undefined.) Thus, when spawning a
     *                new entity, you can specify what the `SpawnerEntity` will be by using this
     *                argument. Note that this argument is not optional. If you do not want the new
     *                entity to have a spawner, you must explicitly pass undefined.
     * @param subType
     * @param seed The integer seed for the new entity. This must be between 1 and and 4294967295.
     *             See the `Seed` type declaration for more details. (This value will typically come
     *             from an RNG object or another entity's `InitSeed`, which is why it is typed as a
     *             `Seed` instead of an `int`.)
     */
    Spawn: (
      entityType: EntityType,
      variant: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | undefined,
      subType: int,
      seed: Seed,
    ) => Entity;

    // SpawnEntityDesc is not implemented.

    /**
     * @param position
     * @param effectVariant
     * @param numParticles
     * @param speed
     * @param color Default is `Color.Default`.
     * @param height Default is 100000.
     * @param subType Default is 0.
     */
    SpawnParticles: (
      position: Vector,
      effectVariant: EffectVariant,
      numParticles: int,
      speed: float,
      color?: Color,
      height?: float,
      subType?: int,
    ) => void;

    /**
     * You have to set Level.LeaveDoor to an appropriate value before using this function.
     * Otherwise, you will be sent to the wrong room. (For teleports, set it to -1.)
     *
     * @param roomGridIndex The room grid index of the destination room.
     * @param direction
     * @param roomTransition Default is `RoomTransitionAnim.WALK`.
     * @param player Default is undefined.
     * @param dimension Default is `Dimension.CURRENT`.
     */
    StartRoomTransition: (
      roomGridIndex: int | GridRoom,
      direction: Direction,
      roomTransitionAnim?: RoomTransitionAnim,
      player?: EntityPlayer,
      dimension?: Dimension,
    ) => void;

    /** If the `player` argument is not provided, the game will crash. */
    StartStageTransition: (
      sameStage: boolean,
      stageTransitionType: StageTransitionType,
      player: EntityPlayer,
    ) => void;

    Update: () => void;

    /**
     * @param position
     * @param force Default is 10.
     * @param radius Default is 250.
     */
    UpdateStrangeAttractor: (
      position: Vector,
      force?: float,
      radius?: float,
    ) => void;

    BlueWombParTime: int;
    BossRushParTime: int;
    Challenge: Challenge;
    readonly Difficulty: Difficulty;
    ScreenShakeOffset: Readonly<Vector>;
    TimeCounter: int;
  }
}
