declare class Game {
  AddDevilRoomDeal(): void;
  AddEncounteredBoss(entityType: EntityType | int, variant: int): void;
  AddPixelation(duration: int): void;
  AddStageWithoutDamage(): void;
  AddStageWithoutHeartsPicked(): void;
  AddTreasureRoomsVisited(): void;
  /**
   * There is no separate BombFlags enum, so bombs use tear flags.
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   *
   * @param position
   * @param damage
   * @param radius
   * @param lineCheck Default is true.
   * @param source Default is nil.
   * @param tearFlags Default is TearFlags.TEAR_NORMAL.
   * @param damageFlags Default is DamageFlag.DAMAGE_EXPLOSION.
   * @param damageSource Default is false.
   */
  BombDamage(
    position: Vector,
    damage: float,
    radius: float,
    lineCheck?: boolean,
    source?: Entity,
    tearFlags?: int,
    damageFlags?: DamageFlag,
    damageSource?: boolean,
  ): void;
  /**
   * There is no separate BombFlags enum, so bombs use tear flags.
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   *
   * @param position
   * @param damage
   * @param tearFlags Default is TearFlags.TEAR_NORMAL.
   * @param color Default is Color.Default.
   * @param source Default is nil.
   * @param radiusMult Default is 1.
   * @param lineCheck Default is true.
   * @param damageSource Default is false.
   * @param damageFlags Default is DamageFlag.DAMAGE_EXPLOSION.
   */
  BombExplosionEffects(
    position: Vector,
    damage: float,
    tearFlags?: int,
    color?: Color,
    source?: Entity,
    radiusMult?: float,
    lineCheck?: boolean,
    damageSource?: boolean,
    damageFlags?: DamageFlag,
  ): void;
  /**
   * There is no separate BombFlags enum, so bombs use tear flags.
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   *
   * @param position
   * @param radius
   * @param tearFlags
   * @param source Default is nil.
   * @param radiusMult Default is 1.
   */
  BombTearflagEffects(
    position: Vector,
    radius: float,
    tearFlags: int,
    source?: Entity,
    radiusMult?: float,
  ): void;
  ButterBeanFart(
    position: Vector,
    radius: float,
    source: Entity,
    showEffect: boolean,
    doSuperKnockback: boolean,
  ): void;
  /**
   * @param roomIndex
   * @param dimension Default is Dimension.CURRENT.
   */
  ChangeRoom(roomIndex: int, dimension?: Dimension): void;
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
   * @param source Default is nil.
   * @param fartScale Default is 1.
   * @param fartSubType Default is 0
   * @param fartColor Default is Color.Default.
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
  GetHUD(): HUD;
  GetItemPool(): ItemPool;
  /** This function is bugged and returns useless userdata. */
  GetLastDevilRoomStage(fakeArg: never): LevelStage;
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
  HasEncounteredBoss(entityType: EntityType | int, variant: int): boolean;
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
  /**
   * @param frameCount
   * @param hallucinationBackdrop Default is BackdropType.NUM_BACKDROPS.
   */
  ShowHallucination(
    frameCount: int,
    hallucinationBackdropType?: BackdropType,
  ): void;
  ShowRule(): void;
  Spawn(
    entityType: EntityType | int,
    variant: int,
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
  /**
   * @param position
   * @param effectVariant
   * @param numParticles
   * @param speed
   * @param color Default is Color.Default.
   * @param height Default is 100000.
   * @param subType Default is 0.
   */
  SpawnParticles(
    position: Vector,
    effectVariant: EffectVariant | int,
    numParticles: int,
    speed: float,
    color?: Color,
    height?: float,
    subType?: int,
  ): void;
  /**
   * You have to set Level.LeaveDoor to an appropriate value before using this function. Otherwise,
   * you will be sent to the wrong room. (For teleports, set it to -1.)
   *
   * @param roomIndex
   * @param direction
   * @param roomTransition Default is RoomTransitionAnim.WALK.
   * @param player Default is nil.
   * @param dimension Default is Dimension.CURRENT.
   */
  StartRoomTransition(
    roomIndex: int,
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
  UpdateStrangeAttractor(position: Vector, force?: float, radius?: float): void;

  BlueWombParTime: int;
  BossRushParTime: int;
  Challenge: Challenge | int;
  readonly Difficulty: Difficulty;
  readonly ScreenShakeOffset: Readonly<Vector>;
  TimeCounter: int;
}
