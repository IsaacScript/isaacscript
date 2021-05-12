type PlayerAnimationName = "Pickup" | "LiftItem" | "HideItem" | "UseItem";
type CollectibleAnimationName =
  | "Idle"
  | "Empty"
  | "ShopIdle"
  | "PlayerPickup"
  | "PlayerPickupSparkle";
type SlotId = 0 | 1;
type ZodiacCollectibles =
  | CollectibleType.COLLECTIBLE_CANCER
  | CollectibleType.COLLECTIBLE_ARIES
  | CollectibleType.COLLECTIBLE_LEO
  | CollectibleType.COLLECTIBLE_SCORPIO
  | CollectibleType.COLLECTIBLE_AQUARIUS
  | CollectibleType.COLLECTIBLE_PISCES
  | CollectibleType.COLLECTIBLE_TAURUS
  | CollectibleType.COLLECTIBLE_GEMINI
  | CollectibleType.COLLECTIBLE_CAPRICORN
  | CollectibleType.COLLECTIBLE_SAGITTARIUS
  | CollectibleType.COLLECTIBLE_LIBRA
  | CollectibleType.COLLECTIBLE_VIRGO;

declare class EntityPlayer extends Entity {
  AddBlackHearts(blackHearts: int): void;
  AddBlueFlies(amount: int, position: Vector, target: Entity | null): Entity;
  AddBlueSpider(position: Vector): Entity;
  AddBombs(amount: int): void;
  AddBoneHearts(hearts: int): void;
  AddCacheFlags(cacheFlags: CacheFlag): void;
  AddCard(card: Card | int): void;
  AddCoins(amount: int): void;
  /**
   * @param collectibleType
   * @param charge
   * @param addConsumables
   * @param activeSlot Sets the active slot this collectible should be added to.
   * @param varData Sets the variable data for this collectible (this is used to store extra data
   * for some active items like the number of uses for Jar of Wisps).
   */
  AddCollectible(
    collectibleType: CollectibleType | int,
    charge?: int, // Default is 0
    addConsumables?: boolean, // Default is true
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
    varData?: int, // Default is 0
  ): void;
  AddControlsCooldown(cooldown: int): void;
  AddCostume(itemConfigItem: ItemConfigItem, itemStateOnly: boolean): void;
  AddDeadEyeCharge(): void;
  AddDollarBillEffect(): void;
  AddEternalHearts(eternalHearts: int): void;
  AddGoldenBomb(): void;
  AddGoldenHearts(hearts: int): void;
  AddGoldenKey(): void;
  AddHearts(hearts: int): void;
  AddJarFlies(flies: int): void;
  AddJarHearts(hearts: int): void;
  AddKeys(amount: int): void;
  AddMaxHearts(maxHearts: int, ignoreKeeper: boolean): void;
  AddNullCostume(nullItemID: NullItemID): void;
  AddPill(pillColor: PillColor | int): void;
  AddPlayerFormCostume(playerForm: PlayerForm): void;
  AddPrettyFly(): void;
  AddSoulHearts(soulHearts: int): void;
  AddTrinket(
    trinketType: TrinketType | int,
    addConsumables?: boolean, // Default is true
  ): void;
  AnimateAppear(): void;
  AnimateCard(
    card: Card | int,
    playerAnimationName?: string, // Default is "Pickup"
  ): void;
  AnimateCollectible(
    collectibleType: CollectibleType | int,
    playerAnimationName?: PlayerAnimationName, // Default is "Pickup"
    spriteAnimationName?: CollectibleAnimationName, // Default is "PlayerPickupSparkle"
  ): void;
  AnimateHappy(): void;
  AnimateLightTravel(): void;
  AnimatePill(
    pillColor: PillColor | int,
    playerAnimationName?: string, // Default is "Pickup"
  ): void;
  AnimatePitfallIn(): void;
  AnimatePitfallOut(): void;
  AnimateSad(): void;
  AnimateTeleport(up: boolean): void;
  AnimateTrapdoor(): void;
  AnimateTrinket(
    trinketType: TrinketType | int,
    playerAnimationName?: string, // Default is "Pickup"
    spriteAnimationName?: string, // Default is "PlayerPickupSparkle"
  ): void;
  AreControlsEnabled(): boolean;
  AreOpposingShootDirectionsPressed(): boolean;
  CanAddCollectible(
    collectibleType?: CollectibleType, // Default is CollectibleType.COLLECTIBLE_NULL
  ): boolean;
  CanPickBlackHearts(): boolean;
  CanPickBoneHearts(): boolean;
  CanPickGoldenHearts(): boolean;
  CanPickRedHearts(): boolean;
  CanPickSoulHearts(): boolean;
  CanPickupItem(): boolean;
  CanShoot(): boolean;
  CanTurnHead(): boolean;
  /**
   * @param familiarVariant
   * @param targetCount
   * @param rng
   * @param sourceItem The item this type of familiar was created by.
   * @param familiarSubType The subtype of the familiar to check (-1 matches any subtype).
   */
  CheckFamiliar(
    familiarVariant: FamiliarVariant | int,
    targetCount: int,
    rng: RNG,
    sourceItem?: ItemConfigItem, // Default is nil
    familiarSubType?: int, // Default is -1
  ): void;
  ClearCostumes(): void;
  ClearDeadEyeCharge(): void;
  ClearTemporaryEffects(): void;
  DischargeActiveItem(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): void;
  DonateLuck(luck: int): void;
  DoZitEffect(direction: Vector): void;
  DropPocketItem(pocketNum: int, position: Vector): void;
  DropTrinket(dropPos: Vector, replaceTick: boolean): void;
  EvaluateItems(): void;
  FireBomb(
    position: Vector,
    velocity: Vector,
    source?: Entity, // Default is nil
  ): EntityBomb;
  FireBrimstone(
    direction: Vector,
    source?: Entity, // Default is nil
    damageMultiplier?: float, // Default is 1
  ): EntityLaser;
  FireDelayedBrimstone(angle: float, parent: Entity): EntityLaser;
  FireKnife(
    parent: Entity,
    rotationOffset?: float, // Default is 0
    cantOverwrite?: boolean, // Default is false
    subType?: int, // Default is 0
    variant?: int, // Default is 0
  ): EntityKnife;
  FireTear(
    position: Vector,
    velocity: Vector,
    canBeEye?: boolean, // Default is true
    noTractorBeam?: boolean, // Default is false
    canTriggerStreakEnd?: boolean, // Default is true
    source?: Entity, // Default is nil
    damageMultiplier?: float, // Default is 1
  ): EntityTear;
  FireTechLaser(
    position: Vector,
    laserOffset: LaserOffset,
    direction: Vector,
    leftEye: boolean,
    oneHit?: boolean, // Default is false
    source?: Entity, // Default is nil
    damageMultiplier?: float, // Default is 1
  ): EntityLaser;
  FireTechXLaser(
    position: Vector,
    direction: Vector,
    radius: float,
    source?: Entity, // Default is nil
    damageMultiplier?: float, // Default is 1
  ): EntityLaser;
  FlushQueueItem(): boolean;
  /**
   * @param activeSlot
   * @param force If set, items will always be charged even if they normally cannot be recharged by
   * batteries.
   */
  FullCharge(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
    force?: boolean,
  ): boolean;
  GetActiveCharge(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): int;
  GetActiveItem(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): CollectibleType | int;
  GetActiveSubCharge(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): int;
  GetActiveWeaponEntity(): Entity;
  GetAimDirection(): Readonly<Vector>;
  GetBabySkin(): BabySubType | int;
  GetBatteryCharge(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): int;
  GetBlackHearts(): int;
  GetBombFlags(): TearFlags;
  GetBombVariant(
    tearFlags: TearFlags,
    forceSmallBomb: boolean,
  ): BombVariant | int;
  GetBoneHearts(): int;
  GetCard(slotID: SlotId): Card | int;
  GetCardRNG(card: Card | int): RNG;
  GetCollectibleCount(): int;
  /**
   * @param collectibleType
   * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
   * ignores effects granted by items like Zodiac, 3 Dollar Bill and Lemegeton.
   */
  GetCollectibleNum(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean, // Default is false
  ): int;
  GetCollectibleRNG(collectibleType: CollectibleType | int): RNG;
  GetCostumeNullPos(
    nullFrameName: string,
    headScale: boolean,
    direction: Vector,
  ): Vector;
  GetDamageCooldown(): int;
  GetEffectiveMaxHearts(): int;
  GetEffects(): TemporaryEffects;
  GetEternalHearts(): int;
  GetExtraLives(): int;
  GetFireDirection(): Direction;
  GetFlyingOffset(): Vector;
  GetGoldenHearts(): int;
  GetGreedDonationBreakChance(): float;
  GetHeadDirection(): Direction;
  GetHeartLimit(): int;
  GetHearts(): int;
  GetItemState(): int;
  GetJarFlies(): int;
  GetJarHearts(): int;
  GetLaserOffset(laserOffset: LaserOffset, direction: Vector): Vector;
  GetLastActionTriggers(): int;
  GetLastDamageFlags(): DamageFlag;
  GetLastDamageSource(): Readonly<EntityRef>;
  GetLastDirection(): Readonly<Vector>;
  GetMaxHearts(): int;
  GetMaxPocketItems(): int;
  GetMaxTrinkets(): int;
  GetMovementDirection(): Direction;
  GetMovementInput(): Vector;
  GetMovementJoystick(): Vector;
  GetMovementVector(): Readonly<Vector>;
  GetMultiShotParams(
    // TODO check to see if MultiShotParams is implemented
    weaponType?: WeaponType, // Default is WeaponType.WEAPON_TEARS
  ): int; // MultiShotParams // MultiShotParams is not implemented
  GetMultiShotPositionVelocity(
    // TODO check to see if MultiShotParams is implemented
    loopIndex: int,
    weaponType: WeaponType,
    shotDirection: Vector,
    shotSpeed: float,
    multiShotParams: int, // MultiShotParams, // MultiShotParams is not implemented
  ): PosVel;
  GetName(): string;
  GetNPCTarget(): Entity;
  GetNumBlueFlies(): int;
  GetNumBlueSpiders(): int;
  GetNumBombs(): int;
  GetNumCoins(): int;
  GetNumKeys(): int;
  GetPill(slotID: SlotId): PillColor | int;
  GetPillRNG(pillEffect: PillEffect | int): RNG;
  GetPlayerType(): PlayerType | int;
  // GetPocketItem(slotID: int): Readonly<PlayerPocketItem>; // PlayerPocketItem is not implemented
  GetRecentMovementVector(): Readonly<Vector>;
  GetShootingInput(): Vector;
  GetShootingJoystick(): Vector;
  GetSmoothBodyRotation(): float;
  GetSoulHearts(): int;
  GetSubPlayer(): EntityPlayer;
  GetTearHitParams(
    weaponType: WeaponType,
    damageScale?: float, // Default is 1
    tearDisplacement?: int, // Default is 1
    source?: Entity, // Default is nil
  ): TearParams;
  GetTearMovementInheritance(shotDirection: Vector): Vector;
  GetTearPoisonDamage(): float;
  GetTearRangeModifier(): int;
  GetTotalDamageTaken(): int;
  GetTractorBeam(): Entity;
  GetTrinket(trinketIndex: 0 | 1): int;
  GetTrinketMultiplier(): int;
  GetTrinketRNG(trinketType: TrinketType | int): RNG;
  GetVelocityBeforeUpdate(): Readonly<Vector>;
  GetZodiacEffect(): ZodiacCollectibles;
  /**
   * @param collectibleType
   * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
   * ignores effects granted by items like Zodiac, 3 Dollar Bill and Lemegeton.
   */
  HasCollectible(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean, // Default is false
  ): boolean;
  HasFullHearts(): boolean;
  HasFullHeartsAndSoulHearts(): boolean;
  HasGoldenBomb(): boolean;
  HasGoldenKey(): boolean;
  HasInvincibility(
    damageFlag?: DamageFlag, // Default is 0
  ): boolean;
  HasPlayerForm(playerForm: PlayerForm): boolean;
  HasTimedItem(): boolean;
  /**
   * @param trinketType
   * @param ignoreModifiers If set to true, only counts trinkets the player actually holds and
   * ignores effects granted by other items.
   */
  HasTrinket(
    trinketType: TrinketType | int,
    ignoreModifiers?: boolean, // Default is false
  ): boolean;
  HasWeaponType(weaponType: WeaponType): boolean;
  InitBabySkin(): void;
  IsBlackHeart(heart: int): boolean;
  IsBoneHeart(heartSlot: int): boolean;
  IsExtraAnimationFinished(): boolean;
  IsFullSpriteRendering(): boolean;
  IsHeldItemVisible(): boolean;
  /* Is the player holding up an item (card/collectible/etc)? */
  IsHoldingItem(): boolean;
  IsItemQueueEmpty(): boolean;
  IsP2Appearing(): boolean;
  IsPosInSpotLight(position: Vector): boolean;
  IsSubPlayer(): boolean;
  NeedsCharge(
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): boolean;
  PlayExtraAnimation(animation: string): void;
  QueueExtraAnimation(animation: string): void;
  QueueItem(
    itemConfigItem: ItemConfigItem,
    charge?: int, // Default is 0
    touched?: boolean, // Default is false
    golden?: boolean, // Default is false
    varData?: int, // Default is false
  ): void;
  RemoveBlackHeart(blackHeart: int): void;
  RemoveBlueFly(): void;
  RemoveBlueSpider(): void;
  /**
   * @param collectibleType
   * @param ignoreModifiers Ignores collectible effects granted by other items (i.e. Void).
   * @param activeSlot Sets the active slot this collectible should be removed from.
   * @param removeFromPlayerForm If successfully removed and part of a transformation, decrease that
   * transformation's counter by 1.
   */
  RemoveCollectible(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean, // Default is false
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
    removeFromPlayerForm?: boolean, // Default is true
  ): void;
  RemoveCostume(itemConfigItem: ItemConfigItem): void;
  RemoveGoldenKey(): void;
  RemoveGoldenBomb(): void;
  RemoveSkinCostume(): void;
  RenderBody(position: Vector): void;
  RenderGlow(position: Vector): void;
  RenderHead(position: Vector): void;
  RenderTop(position: Vector): void;
  ReplaceCostumeSprite(
    itemConfigItem: ItemConfigItem,
    spritePath: string,
    spriteID: int,
  ): void;
  ResetDamageCooldown(): void;
  ResetItemState(): void;
  RespawnFamiliars(): void;
  Revive(): void;
  SetActiveCharge(
    charge: int,
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): void;
  SetCard(slotID: SlotId, card: Card | int): void;
  SetFullHearts(): void;
  SetMinDamageCooldown(damageCooldown: int): void;
  SetPill(slotID: SlotId, pillColor: PillColor | int): void;
  SetShootingCooldown(cooldown: int): void;
  SetTargetTrapDoor(trapDoor: GridEntity): void;
  ShootRedCandle(direction: Vector): void;
  SpawnMawOfVoid(timeout: int): EntityLaser;
  StopExtraAnimation(): void;
  SwapActiveItems(): void;
  ThrowBlueSpider(position: Vector, target: Vector): Entity;
  TryHoldTrinket(trinketType: TrinketType | int): boolean;
  TryRemoveCollectibleCostume(
    collectibleType: CollectibleType | int,
    keepPersistent: boolean,
  ): void;
  TryRemoveNullCostume(nullItemID: NullItemID): void;
  TryRemoveTrinket(trinketType: TrinketType | int): boolean;
  TryRemoveTrinketCostume(trinketType: TrinketType | int): void;
  TryUseKey(): boolean;
  UpdateCanShoot(): void;
  /**
   * @param collectibleType
   * @param useFlag
   * @param activeSlot The active slot this item was used from
   * (set to ActiveSlot.SLOT_NONE if this item wasn't triggered by any active slot).
   */
  UseActiveItem(
    collectibleType: CollectibleType | int,
    useFlag?: int, // Default is 0 // TODO set to UseFlags
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): void;
  /**
   * @param collectibleType
   * @param showAnim
   * @param keepActiveItem
   * @param allowNonMainPlayer
   * @param toAddCostume
   * @param activeSlot The active slot this item was used from
   * (set to ActiveSlot.SLOT_NONE if this item wasn't triggered by any active slot).
   */
  UseActiveItem(
    collectibleType: CollectibleType | int,
    showAnim: boolean,
    keepActiveItem: boolean,
    allowNonMainPlayer: boolean,
    toAddCostume: boolean,
    activeSlot?: ActiveSlot, // Default is ActiveSlot.SLOT_PRIMARY
  ): void;
  UseCard(
    card: Card | int,
    useFlag?: int, // Default is 0 // TODO set to UseFlags
  ): void;
  UsePill(
    pillEffect: PillEffect | int,
    pillColor: PillColor | int,
    useFlag?: int, // Default is 0 // TODO set to UseFlags
  ): void;
  WillPlayerRevive(): boolean;

  BabySkin: BabySubType | int;
  CanFly: boolean;
  readonly ControllerIndex: int;
  ControlsCooldown: int;
  ControlsEnabled: boolean;
  Damage: float;
  FireDelay: int;
  // readonly FriendBallEnemy: Readonly<EntityDesc>; // EntityDesc is not implemented
  HeadFrameDelay: int;
  ItemHoldCooldown: int;
  LaserColor: Color;
  Luck: float;
  MaxFireDelay: int;
  MoveSpeed: float;
  QueuedItem: QueueItemData;
  SecondaryActiveItem: ActiveItemDesc;
  ShotSpeed: float;
  SpriteScale: Vector;
  TearColor: Color;
  TearFallingAcceleration: float;
  TearFallingSpeed: float;
  TearFlags: TearFlags;
  TearHeight: float;
  readonly TearsOffset: Readonly<Vector>;
}
