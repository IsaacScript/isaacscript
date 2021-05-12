declare class Game {
  AddDevilRoomDeal(): void;
  AddEncounteredBoss(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
  ): void;
  AddPixelation(duration: int): void;
  AddStageWithoutDamage(): void;
  AddStageWithoutHeartsPicked(): void;
  AddTreasureRoomsVisited(): void;
  BombDamage(
    position: Vector,
    damage: float,
    radius: float,
    lineCheck?: boolean, // Default is true
    source?: Entity, // Default is nil
    tearFlags?: TearFlags, // Default is TearFlags.TEAR_NORMAL
    damageFlags?: DamageFlag, // Default is DamageFlag.DAMAGE_EXPLOSION
    damageSource?: boolean, // Default is false
  ): void;
  BombExplosionEffects(
    position: Vector,
    damage: float,
    tearFlags?: TearFlags, // Default is TearFlags.TEAR_NORMAL
    color?: Color, // Default is Color.Default
    source?: Entity, // Default is nil
    radiusMult?: float, // Default is 1
    lineCheck?: boolean, // Default is true
    damageSource?: boolean, // Default is false
    damageFlags?: DamageFlag, // Default is DamageFlag.DAMAGE_EXPLOSION
  ): void;
  BombTearflagEffects(
    position: Vector,
    radius: float,
    tearFlags: TearFlags,
    source?: Entity, // Default is nil
    radiusMult?: float, // Default is 1
  ): void;
  ButterBeanFart(
    position: Vector,
    radius: float,
    source: Entity,
    showEffect: boolean,
  ): void;
  ChangeRoom(
    roomIndex: int,
    dimension?: Dimension, // Default is Dimension.CURRENT
  ): void;
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
  Fart(
    position: Vector,
    radius?: float, // Default is 85
    source?: Entity, // Default is nil
    fartScale?: float, // Default is 1
    fartSubType?: int, // Default is 0
    fartColor?: Color, // Default is Color.Default
  ): void;
  FinishChallenge(): void;
  // GetAmbush(): Ambush; // Ambush is not implemented
  GetDarknessModifier(): float;
  GetDevilRoomDeals(): int;
  GetDonationModAngel(): int;
  GetDonationModGreed(): int;
  GetFont(): Font;
  GetFrameCount(): int;
  GetGreedBossWaveNum(): int;
  GetGreedWavesNum(): int;
  // GetItemOverlay(): ItemOverlay; // ItemOverlay is not implemented
  GetItemPool(): ItemPool;
  GetLastDevilRoomStage(): LevelStage;
  GetLastLevelWithDamage(): LevelStage;
  GetLastLevelWithoutHalfHp(): LevelStage;
  GetLevel(): Level;
  GetNearestPlayer(position: Vector): EntityPlayer;
  GetNumEncounteredBosses(): int;
  GetNumPlayers(): int;
  GetPlayer(index: int): EntityPlayer | null;
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
  HasEncounteredBoss(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
  ): boolean;
  HasHallucination(): int;
  IsGreedMode(): boolean;
  IsPaused(): boolean;
  MoveToRandomRoom(IAmErrorRoom: boolean, seed: int): void;
  NextVictoryLap(): void;
  Render(): void;
  RerollEnemy(entity: Entity): boolean;
  RerollLevelCollectibles(): void;
  RerollLevelPickups(seed: int): void;
  SetLastDevilRoomStage(levelStage: LevelStage): void;
  SetLastLevelWithDamage(levelStage: LevelStage): void;
  SetLastLevelWithoutHalfHp(levelStage: LevelStage): void;
  SetStateFlag(gameStateFlag: GameStateFlag, val: boolean): void;
  ShakeScreen(timeout: int): void;
  ShowFortune(): void;
  ShowHallucination(
    frameCount: int,
    hallucinationBackdrop?: Backdrop, // Default is BackdropType.NUM_BACKDROPS
  ): void;
  ShowRule(): void;
  Spawn(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
    position: Vector,
    velocity: Vector,
    spawner: Entity | null,
    subType: int,
    seed: int,
  ): Entity;
  /*
  SpawnEntityDesc(
    entityDesc: EntityDesc, // EntityDesc is not implemented
    position: Vector,
    spawner: Entity,
  ): EntityNPC;
  */
  SpawnParticles(
    position: Vector,
    effectVariant: EffectVariant | int,
    numParticles: int,
    speed: float,
    color?: Color, // Default is Color.Default
    height?: float, // Default is 100000
    subType?: int, // Default is 0
  ): void;
  StartRoomTransition(
    roomIndex: int,
    direction: Direction,
    roomTransition?: RoomTransition, // Default is RoomTransitionAnim.WALK
    player?: EntityPlayer, // Default is nil
    dimension?: Dimension, // Default is Dimension.CURRENT
  ): void;
  StartStageTransition(
    sameStage: boolean,
    stageTransition: StageTransition,
  ): void;
  Update(): void;
  UpdateStrangeAttractor(
    position: Vector,
    force?: float, // Default is 10
    radius?: float, // Default is 250
  ): void;

  BlueWombParTime: int;
  BossRushParTime: int;
  Challenge: Challenge | int;
  readonly Difficulty: Difficulty;
  readonly ScreenShakeOffset: Readonly<Vector>;
  TimeCounter: int;
}
