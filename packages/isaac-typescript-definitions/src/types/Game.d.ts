import { BackdropType } from "../enums/BackdropType";
import { Challenge } from "../enums/Challenge";
import { EffectVariant } from "../enums/collections/variants";
import { Difficulty } from "../enums/Difficulty";
import { Dimension } from "../enums/Dimension";
import { Direction } from "../enums/Direction";
import { Ending } from "../enums/Ending";
import { EntityType } from "../enums/EntityType";
import { FadeoutTarget } from "../enums/FadeoutTarget";
import { DamageFlag } from "../enums/flags/DamageFlag";
import { TearFlag } from "../enums/flags/TearFlag";
import { GameStateFlag } from "../enums/GameStateFlag";
import { LevelStage } from "../enums/LevelStage";
import { RoomTransitionAnim } from "../enums/RoomTransitionAnim";
import { StageTransition } from "../enums/StageTransition";
import { ItemPool } from "./ItemPool";
import { Seeds } from "./Seeds";

declare global {
  function Game(this: void): Game;

  interface Game {
    AddDevilRoomDeal(): void;
    AddEncounteredBoss(entityType: EntityType, variant: int): void;
    AddPixelation(duration: int): void;
    AddStageWithoutDamage(): void;
    AddStageWithoutHeartsPicked(): void;
    AddTreasureRoomsVisited(): void;

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
    BombDamage(
      position: Vector,
      damage: float,
      radius: float,
      lineCheck?: boolean,
      source?: Entity,
      tearFlags?: TearFlag | BitFlags<TearFlag>,
      damageFlags?: DamageFlag | BitFlags<DamageFlag>,
      damageSource?: boolean,
    ): void;

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
    BombExplosionEffects(
      position: Vector,
      damage: float,
      tearFlags?: TearFlag | BitFlags<TearFlag>,
      color?: Color,
      source?: Entity,
      radiusMultiplier?: float,
      lineCheck?: boolean,
      damageSource?: boolean,
      damageFlags?: DamageFlag | BitFlags<DamageFlag>,
    ): void;

    /**
     * There is no separate `BombFlag` enum, so bombs use `TearFlag`.
     *
     * @param position
     * @param radius
     * @param tearFlags
     * @param source Default is undefined.
     * @param radiusMultiplier Default is 1.
     */
    BombTearflagEffects(
      position: Vector,
      radius: float,
      tearFlags: TearFlag | BitFlags<TearFlag>,
      source?: Entity,
      radiusMultiplier?: float,
    ): void;

    ButterBeanFart(
      position: Vector,
      radius: float,
      source: Entity,
      showEffect: boolean,
      doSuperKnockback: boolean,
    ): void;

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
    ChangeRoom(roomGridIndex: int, dimension?: Dimension): void;

    CharmFart(position: Vector, radius: float, source: Entity): void;
    ClearDonationModAngel(): void;
    ClearDonationModGreed(): void;
    ClearStagesWithoutDamage(): void;
    ClearStagesWithoutHeartsPicked(): void;
    Darken(darkness: float, timeout: int): void;
    DonateAngel(donate: int): void;
    DonateGreed(donate: int): void;
    End(ending: Ending): void;
    Fadein(speed: float): void;
    Fadeout(speed: float, fadeoutTarget: FadeoutTarget): void;

    /**
     * @param position
     * @param radius Default is 85.
     * @param source Default is undefined.
     * @param fartScale Default is 1.
     * @param fartSubType Default is 0.
     * @param fartColor Default is `Color.Default`.
     */
    Fart(
      position: Vector,
      radius?: float,
      source?: Entity,
      fartScale?: float,
      fartSubType?: int,
      fartColor?: Color,
    ): void;

    FinishChallenge(): void;

    // GetAmbush is not implemented.

    GetDarknessModifier(): float;
    GetDevilRoomDeals(): int;
    GetDonationModAngel(): int;
    GetDonationModGreed(): int;
    GetFont(): Font;
    GetFrameCount(): int;
    GetGreedBossWaveNum(): int;
    GetGreedWavesNum(): int;

    // GetItemOverlay is not implemented.

    GetHUD(): HUD;
    GetItemPool(): ItemPool;

    /**
     * @deprecated This function is bugged and returns useless userdata.
     */
    GetLastDevilRoomStage(fakeArg: never): LevelStage;

    GetLastLevelWithDamage(): LevelStage;
    GetLastLevelWithoutHalfHp(): LevelStage;
    GetLevel(): Level;
    GetNearestPlayer(position: Vector): EntityPlayer;
    GetNumEncounteredBosses(): int;
    GetNumPlayers(): int;

    /**
     * @deprecated Use the `Isaac.GetPlayer` method instead.
     */
    GetPlayer(index: int, fakeArg: never): EntityPlayer | undefined;

    GetRandomPlayer(position: Vector, radius: float): EntityPlayer;
    GetRoom(): Room;
    GetScreenShakeCountdown(): Readonly<int>;
    GetSeeds(): Seeds;
    GetStagesWithoutDamage(): int;
    GetStagesWithoutHeartsPicked(): int;
    GetStateFlag(gameStateFlag: GameStateFlag): boolean;
    GetTargetDarkness(): float;
    GetTreasureRoomVisitCount(): int;
    GetVictoryLap(): int;
    HasEncounteredBoss(entityType: EntityType, variant: int): boolean;
    HasHallucination(): int;
    IsGreedMode(): boolean;

    /** Returns true if the game is paused or the console is open. */
    IsPaused(): boolean;

    MoveToRandomRoom(IAmErrorRoom: boolean, seed: Seed): void;
    NextVictoryLap(): void;
    Render(): void;
    RerollEnemy(entity: Entity): boolean;
    RerollLevelCollectibles(): void;
    RerollLevelPickups(seed: Seed): void;
    SetLastDevilRoomStage(levelStage: LevelStage): void;
    SetLastLevelWithDamage(levelStage: LevelStage): void;
    SetLastLevelWithoutHalfHp(levelStage: LevelStage): void;
    SetStateFlag(gameStateFlag: GameStateFlag, value: boolean): void;
    ShakeScreen(timeout: int): void;
    ShowFortune(): void;

    /**
     * @param frameCount
     * @param hallucinationBackdrop Default is a null backdrop.
     */
    ShowHallucination(
      frameCount: int,
      hallucinationBackdropType?: BackdropType,
    ): void;

    ShowRule(): void;

    Spawn(
      entityType: EntityType,
      variant: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | undefined,
      subType: int,
      seed: Seed,
    ): Entity;

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
    SpawnParticles(
      position: Vector,
      effectVariant: EffectVariant,
      numParticles: int,
      speed: float,
      color?: Color,
      height?: float,
      subType?: int,
    ): void;

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
    StartRoomTransition(
      roomGridIndex: int,
      direction: Direction,
      roomTransitionAnim?: RoomTransitionAnim,
      player?: EntityPlayer,
      dimension?: Dimension,
    ): void;

    StartStageTransition(
      sameStage: boolean,
      stageTransition: StageTransition,
    ): void;

    Update(): void;

    /**
     * @param position
     * @param force Default is 10.
     * @param radius Default is 250.
     */
    UpdateStrangeAttractor(
      position: Vector,
      force?: float,
      radius?: float,
    ): void;

    BlueWombParTime: int;
    BossRushParTime: int;
    Challenge: Challenge;
    readonly Difficulty: Difficulty;
    ScreenShakeOffset: Readonly<Vector>;
    TimeCounter: int;
  }
}
