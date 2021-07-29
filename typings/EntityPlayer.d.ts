type CollectibleAnimationName =
  | "Idle"
  | "Empty"
  | "ShopIdle"
  | "PlayerPickup"
  | "PlayerPickupSparkle";
type ControllerIndex = 0 | 1 | 2 | 3;
type PlayerAnimationName = "Pickup" | "LiftItem" | "HideItem" | "UseItem";
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
  /** This adds Tainted Bethany's blood charges. */
  AddBloodCharge(num: int): void;
  AddBlueFlies(amount: int, position: Vector, target: Entity | null): Entity;
  AddBlueSpider(position: Vector): Entity;
  AddBombs(amount: int): void;
  AddBoneHearts(hearts: int): void;
  AddBrokenHearts(hearts: int): void;
  AddCacheFlags(cacheFlags: CacheFlag): void;
  AddCard(card: Card | int): void;
  AddCoins(amount: int): void;
  /**
   * @param collectibleType
   * @param charge Default is 0.
   * @param firstTimePickingUp Setting this to false will not spawn or add consumables for the item
   * and will not cause it to count towards transformations. Default is true.
   * @param activeSlot Sets the active slot this collectible should be added to.
   * Default is ActiveSlot.SLOT_PRIMARY.
   * @param varData Sets the variable data for this collectible (this is used to store extra data
   * for some active items like the number of uses for Jar of Wisps).
   * Default is 0.
   */
  AddCollectible(
    collectibleType: CollectibleType | int,
    charge?: int,
    firstTimePickingUp?: boolean,
    activeSlot?: ActiveSlot,
    varData?: int,
  ): void;
  AddControlsCooldown(cooldown: int): void;
  AddCostume(itemConfigItem: ItemConfigItem, itemStateOnly: boolean): void;
  /**
   * Disables all item effects similarly to the abandoned mineshaft in Mines II.
   * This also temporarily removes consumables and pocket items.
   */
  AddCurseMistEffect(): void;
  AddDeadEyeCharge(): void;
  AddDollarBillEffect(): void;
  AddEternalHearts(eternalHearts: int): void;
  /**
   * Spawns a friendly dip from Dirty Mind.
   *
   * @param subType
   * @param position
   */
  AddFriendlyDip(subType: int, position: Vector): EntityFamiliar;
  /**
   * Turns the given number of bombs into giga bombs.
   * This does not actually increase the number of bombs held. To actually add bombs, AddBombs()
   * should be called first.
   *
   * @param num
   */
  AddGigaBombs(num: int): void;
  AddGoldenBomb(): void;
  AddGoldenHearts(hearts: int): void;
  AddGoldenKey(): void;
  AddHearts(hearts: int): void;
  /**
   * Spawns a Lemegeton wisp.
   *
   * @param subType The ID of the passive item to mimic.
   * @param position
   * @param adjustOrbitLayer Default is false.
   */
  AddItemWisp(
    subType: int,
    position: Vector,
    adjustOrbitLayer?: boolean,
  ): EntityFamiliar;
  AddJarFlies(flies: int): void;
  AddJarHearts(hearts: int): void;
  AddKeys(amount: int): void;
  AddMaxHearts(maxHearts: int, ignoreKeeper: boolean): void;
  /**
   * Spawns a mini Isaac from Giant Cell.
   *
   * @param position
   * @param playAnim If false, skips the appear animation for the familiars.
   */
  AddMinisaac(position: Vector, playAnim?: boolean): EntityFamiliar;
  AddNullCostume(nullItemID: NullItemID | int): void;
  AddPill(pillColor: PillColor | int): void;
  AddPlayerFormCostume(playerForm: PlayerForm): void;
  AddPrettyFly(): void;
  /**
   * @param hearts The number of hearts to add x2, even though rotten hearts are only worth half a
   * heart. (For example, AddRottenHearts(4) will add 2 rotten hearts.)
   */
  AddRottenHearts(hearts: int): void;
  /** This adds Bethany's soul heart charges. */
  AddSoulCharge(num: int): void;
  AddSoulHearts(soulHearts: int): void;
  /**
   * Spawns a defensive fly from The Swarm.
   *
   * @param position
   */
  AddSwarmFlyOrbital(position: Vector): EntityFamiliar;
  /**
   * If you provide an argument of 0 or an otherwise invalid trinket ID, the game will crash.
   *
   * @param trinketType
   * @param firstTimePickingUp Setting this to false will not spawn or add consumables for the item
   * and will not cause it to count towards transformations. Default is true.
   */
  AddTrinket(
    trinketType: TrinketType | int,
    firstTimePickingUp?: boolean,
  ): void;
  /**
   * Spawns a Book of Virtues wisp.
   *
   * @param subType The ID of the active item to spawn a wisp from. Wisps with a special ID (for
   * example "s0" in wisps.xml) can be spawned with the subtype 0x10000 + X where X is the number
   * after the "s".
   * @param position
   * @param adjustOrbitLayer If true, allows wisps to spawn outside of their usual orbit if their
   * assigned orbit is full. Default is false.
   * @param dontUpdate If true, the spawned wisp will not update immediately. This allows certain
   * properties to be set on the first frame before the wisp is fully initialized. Default is false.
   */
  AddWisp(
    subType: int,
    position: Vector,
    adjustOrbitLayer?: boolean,
    dontUpdate?: boolean,
  ): EntityFamiliar;
  AnimateAppear(): void;
  /**
   * @param card
   * @param playerAnimationName Default is "Pickup".
   */
  AnimateCard(card: Card | int, playerAnimationName?: string): void;
  /**
   *
   * @param collectibleType
   * @param playerAnimationName Default is "Pickup".
   * @param spriteAnimationName Default is "PlayerPickupSparkle".
   */
  AnimateCollectible(
    collectibleType: CollectibleType | int,
    playerAnimationName?: PlayerAnimationName,
    spriteAnimationName?: CollectibleAnimationName,
  ): void;
  AnimateHappy(): void;
  AnimateLightTravel(): void;
  /**
   * @param pillColor
   * @param playerAnimationName Default is "Pickup".
   */
  AnimatePill(pillColor: PillColor | int, playerAnimationName?: string): void;
  AnimatePitfallIn(): void;
  AnimatePitfallOut(): void;
  AnimateSad(): void;
  AnimateTeleport(up: boolean): void;
  AnimateTrapdoor(): void;
  /**
   * @param trinketType
   * @param playerAnimationName Default is "Pickup".
   * @param spriteAnimationName Default is "PlayerPickupSparkle".
   */
  AnimateTrinket(
    trinketType: TrinketType | int,
    playerAnimationName?: string,
    spriteAnimationName?: string,
  ): void;
  AreControlsEnabled(): boolean;
  AreOpposingShootDirectionsPressed(): boolean;
  /**
   * @param collectibleType Default is CollectibleType.COLLECTIBLE_NULL.
   */
  CanAddCollectible(collectibleType?: CollectibleType): boolean;
  /** Returns true if the player can pick up black hearts, false otherwise. */
  CanPickBlackHearts(): boolean;
  /** Returns true if the player can pick up bone hearts, false otherwise. */
  CanPickBoneHearts(): boolean;
  /** Returns true if the player can pick up golden hearts, false otherwise. */
  CanPickGoldenHearts(): boolean;
  /** Returns true if the player can pick up red hearts, false otherwise. */
  CanPickRedHearts(): boolean;
  /** Returns true if the player can pick up rotten hearts, false otherwise. */
  CanPickRottenHearts(): boolean;
  /** Returns true if the player can pick up soul hearts, false otherwise. */
  CanPickSoulHearts(): boolean;
  CanPickupItem(): boolean;
  CanShoot(): boolean;
  CanTurnHead(): boolean;
  /**
   * This will attempt to merge forms when called on characters like Jacob and Esau.
   * This currently does not work correctly when changing from/to certain characters.
   * (i.e. Tainted Isaac)
   *
   * @param type
   */
  ChangePlayerType(type: PlayerType): void;
  /**
   * @param familiarVariant
   * @param targetCount
   * @param rng
   * @param sourceItem The item this type of familiar was created by. Default is nil.
   * @param familiarSubType The subtype of the familiar to check (-1 matches any subtype). Default
   * is -1.
   */
  CheckFamiliar(
    familiarVariant: FamiliarVariant | int,
    targetCount: int,
    rng: RNG,
    sourceItem?: ItemConfigItem,
    familiarSubType?: int,
  ): void;
  ClearCostumes(): void;
  ClearDeadEyeCharge(): void;
  ClearTemporaryEffects(): void;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  DischargeActiveItem(activeSlot?: ActiveSlot): void;
  DoZitEffect(direction: Vector): void;
  DonateLuck(luck: int): void;
  DropPocketItem(pocketNum: int, position: Vector): void;
  DropTrinket(dropPos: Vector, replaceTick: boolean): void;
  EvaluateItems(): void;
  /**
   * @param position
   * @param velocity
   * @param source Default is nil.
   */
  FireBomb(position: Vector, velocity: Vector, source?: Entity): EntityBomb;
  /**
   * @param direction
   * @param source Default is nil.
   * @param damageMultiplier Default is 1.
   */
  FireBrimstone(
    direction: Vector,
    source?: Entity,
    damageMultiplier?: float,
  ): EntityLaser;
  FireDelayedBrimstone(angle: float, parent: Entity): EntityLaser;
  /**
   * @param parent
   * @param rotationOffset Default is 0.
   * @param cantOverwrite Default is false.
   * @param subType Default is 0.
   * @param variant Default is 0.
   */
  FireKnife(
    parent: Entity,
    rotationOffset?: float,
    cantOverwrite?: boolean,
    subType?: int,
    variant?: int,
  ): EntityKnife;
  /**
   * @param position
   * @param velocity
   * @param canBeEye Default is true.
   * @param noTractorBeam Default is false.
   * @param canTriggerStreakEnd Default is true.
   * @param source Default is nil.
   * @param damageMultiplier Default is 1.
   */
  FireTear(
    position: Vector,
    velocity: Vector,
    canBeEye?: boolean,
    noTractorBeam?: boolean,
    canTriggerStreakEnd?: boolean,
    source?: Entity,
    damageMultiplier?: float,
  ): EntityTear;
  /**
   * @param position
   * @param laserOffset
   * @param direction
   * @param leftEye
   * @param oneHit Default is false.
   * @param source Default is nil.
   * @param damageMultiplier Default is 1.
   */
  FireTechLaser(
    position: Vector,
    laserOffset: LaserOffset,
    direction: Vector,
    leftEye: boolean,
    oneHit?: boolean,
    source?: Entity,
    damageMultiplier?: float,
  ): EntityLaser;
  /**
   * @param position
   * @param direction
   * @param radius
   * @param source Default is nil.
   * @param damageMultiplier Default is 1.
   */
  FireTechXLaser(
    position: Vector,
    direction: Vector,
    radius: float,
    source?: Entity,
    damageMultiplier?: float,
  ): EntityLaser;
  FlushQueueItem(): boolean;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   * @param force If set, items will always be charged even if they normally cannot be recharged by
   * batteries.
   */
  FullCharge(activeSlot?: ActiveSlot, force?: boolean): boolean;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  GetActiveCharge(activeSlot?: ActiveSlot): int;
  /**
   *
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  GetActiveItem(activeSlot?: ActiveSlot): CollectibleType | int;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  GetActiveSubCharge(activeSlot?: ActiveSlot): int;
  GetActiveWeaponEntity(): Entity;
  GetAimDirection(): Readonly<Vector>;
  GetBabySkin(): BabySubType | int;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  GetBatteryCharge(activeSlot?: ActiveSlot): int;
  GetBlackHearts(): int;
  /** This gets Tainted Bethany's blood charges. */
  GetBloodCharge(): int;
  /**
   * There is no separate BombFlags enum, so bombs use tear flags.
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  GetBombFlags(): int;
  /**
   * There is no separate BombFlags enum, so bombs use tear flags.
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  GetBombVariant(
    tearFlags: TearFlags,
    forceSmallBomb: boolean,
  ): BombVariant | int;
  GetBoneHearts(): int;
  GetBrokenHearts(): int;
  /** Returns 0 if there is no card. */
  GetCard(slotID: SlotId): Card | int;
  GetCardRNG(card: Card | int): RNG;
  GetCollectibleCount(): int;
  /**
   * @param collectibleType
   * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
   * ignores effects granted by items like Zodiac, 3 Dollar Bill and Lemegeton. Default is false.
   */
  GetCollectibleNum(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean,
  ): int;
  GetCollectibleRNG(collectibleType: CollectibleType | int): RNG;
  GetCostumeNullPos(
    nullFrameName: string,
    headScale: boolean,
    direction: Vector,
  ): Vector;
  GetDamageCooldown(): int;
  /** This returns the number of blood charges when called on Tainted Bethany, 0 otherwise. */
  GetEffectiveBloodCharge(): int;
  GetEffectiveMaxHearts(): int;
  /** This returns the number of soul charges when called on Bethany, 0 otherwise. */
  GetEffectiveSoulCharge(): int;
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
  /**
   * When called on Jacob or Esau, returns Jacob.
   * When called on Tainted Forgotten or Tainted Forgotten's Soul, returns Tainted Forgotten.
   * When called on any other character, returns that character.
   */
  GetMainTwin(): EntityPlayer;
  GetMaxHearts(): int;
  GetMaxPocketItems(): int;
  GetMaxTrinkets(): int;
  /**
   * Returns the current passive item mimicked by Modeling Clay
   * (or COLLECTIBLE_NULL if no effect is being mimicked).
   */
  GetModelingClayEffect(): CollectibleType;
  GetMovementDirection(): Direction;
  GetMovementInput(): Vector;
  GetMovementJoystick(): Vector;
  GetMovementVector(): Readonly<Vector>;
  /**
   * @param weaponType Default is WeaponType.WEAPON_TEARS.
   */
  // MultiShotParams is not implemented
  /*
  GetMultiShotParams(
    weaponType?: WeaponType,
  ): MultiShotParams;
  GetMultiShotPositionVelocity(
    loopIndex: int,
    weaponType: WeaponType,
    shotDirection: Vector,
    shotSpeed: float,
    multiShotParams: MultiShotParams, // MultiShotParams is not implemented
  ): PosVel;
  */
  GetNPCTarget(): Entity;
  GetName(): string;
  GetNumBlueFlies(): int;
  GetNumBlueSpiders(): int;
  GetNumBombs(): int;
  GetNumCoins(): int;
  /** Returns the number of giga bombs held. */
  GetNumGigaBombs(): int;
  GetNumKeys(): int;
  /**
   * When called on Jacob, returns Esau.
   * When called on Esau, returns Jacob.
   * When called on Tainted Forgotten, returns Tainted Forgotten's Soul.
   * When called on Tainted Forgotten's Soul, returns Tainted Forgotten.
   * When called on any other character, returns nil.
   */
  GetOtherTwin(): EntityPlayer;
  /** Returns 0 if there is no pill. */
  GetPill(slotID: SlotId): PillColor | int;
  GetPillRNG(pillEffect: PillEffect | int): RNG;
  GetPlayerType(): PlayerType | int;
  // GetPocketItem(slotID: int): Readonly<PlayerPocketItem>; // PlayerPocketItem is not implemented
  GetRecentMovementVector(): Readonly<Vector>;
  /**
   * This returns the actual number of rotten hearts.
   * (For example, this returns 2 if the player has 2 rotten hearts.)
   */
  GetRottenHearts(): int;
  GetShootingInput(): Vector;
  GetShootingJoystick(): Vector;
  GetSmoothBodyRotation(): float;
  /** This gets Bethany's soul heart charges. */
  GetSoulCharge(): int;
  GetSoulHearts(): int;
  GetSubPlayer(): EntityPlayer;
  /**
   * @param weaponType
   * @param damageScale Default is 1.
   * @param tearDisplacement Default is 1.
   * @param source Default is nil.
   */
  GetTearHitParams(
    weaponType: WeaponType,
    damageScale?: float,
    tearDisplacement?: int,
    source?: Entity,
  ): TearParams;
  GetTearMovementInheritance(shotDirection: Vector): Vector;
  GetTearPoisonDamage(): float;
  GetTearRangeModifier(): int;
  GetTotalDamageTaken(): int;
  GetTractorBeam(): Entity;
  /** Returns 0 if there is no trinket. */
  GetTrinket(trinketIndex: 0 | 1): int;
  GetTrinketMultiplier(): int;
  GetTrinketRNG(trinketType: TrinketType | int): RNG;
  GetVelocityBeforeUpdate(): Readonly<Vector>;
  GetZodiacEffect(): ZodiacCollectibles;
  /**
   * @param collectibleType
   * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
   * ignores effects granted by items like Zodiac, 3 Dollar Bill and Lemegeton. Default is false.
   */
  HasCollectible(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean,
  ): boolean;
  /** Returns true if the player's item effects are currently being disabled. */
  HasCurseMistEffect(): boolean;
  HasFullHearts(): boolean;
  HasFullHeartsAndSoulHearts(): boolean;
  HasGoldenBomb(): boolean;
  HasGoldenKey(): boolean;
  /**
   * @param damageFlag Default is 0.
   */
  HasInvincibility(damageFlag?: DamageFlag): boolean;
  HasPlayerForm(playerForm: PlayerForm): boolean;
  HasTimedItem(): boolean;
  /**
   * @param trinketType
   * @param ignoreModifiers If set to true, only counts trinkets the player actually holds and
   * ignores effects granted by other items. Default is false.
   */
  HasTrinket(
    trinketType: TrinketType | int,
    ignoreModifiers?: boolean,
  ): boolean;
  HasWeaponType(weaponType: WeaponType): boolean;
  InitBabySkin(): void;
  IsBlackHeart(heart: int): boolean;
  IsBoneHeart(heartSlot: int): boolean;
  /** Returns true if the player is a co-op ghost. */
  IsCoopGhost(): boolean;
  IsExtraAnimationFinished(): boolean;
  IsFullSpriteRendering(): boolean;
  IsHeldItemVisible(): boolean;
  /* Is the player holding up an item (card/collectible/etc)? */
  IsHoldingItem(): boolean;
  IsItemQueueEmpty(): boolean;
  IsP2Appearing(): boolean;
  IsPosInSpotLight(position: Vector): boolean;
  IsSubPlayer(): boolean;
  /**
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  NeedsCharge(activeSlot?: ActiveSlot): boolean;
  PlayExtraAnimation(animation: string): void;
  QueueExtraAnimation(animation: string): void;
  /**
   * @param itemConfigItem
   * @param charge Default is 0.
   * @param touched Default is false.
   * @param golden Default is false.
   * @param varData Default is false.
   */
  QueueItem(
    itemConfigItem: ItemConfigItem,
    charge?: int,
    touched?: boolean,
    golden?: boolean,
    varData?: int,
  ): void;
  RemoveBlackHeart(blackHeart: int): void;
  RemoveBlueFly(): void;
  RemoveBlueSpider(): void;
  /**
   * @param collectibleType
   * @param ignoreModifiers Ignores collectible effects granted by other items (i.e. Void).
   * Default is false.
   * @param activeSlot Sets the active slot this collectible should be removed from.
   * Default is ActiveSlot.SLOT_PRIMARY.
   * @param removeFromPlayerForm If successfully removed and part of a transformation, decrease that
   * transformation's counter by 1. Default is true.
   */
  RemoveCollectible(
    collectibleType: CollectibleType | int,
    ignoreModifiers?: boolean,
    activeSlot?: ActiveSlot,
    removeFromPlayerForm?: boolean,
  ): void;
  RemoveCostume(itemConfigItem: ItemConfigItem): void;
  /**
   * Re-enables item effects removed by AddCurseMistEffect().
   * Also attempts to restore consumables and pocket items removed by AddCurseMistEffect().
   */
  RemoveCurseMistEffect(): void;
  RemoveGoldenBomb(): void;
  RemoveGoldenKey(): void;
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
  /**
   * @param charge
   * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
   */
  SetActiveCharge(charge: int, activeSlot?: ActiveSlot): void;
  /**
   * This sets Tainted Bethany's blood charges.
   *
   * @param num
   */
  SetBloodCharge(num: int): void;
  SetCard(slotID: SlotId, card: Card | int): void;
  SetFullHearts(): void;
  SetMinDamageCooldown(damageCooldown: int): void;
  SetPill(slotID: SlotId, pillColor: PillColor | int): void;
  /**
   * Sets the player's pocket active item to the given active item.
   * Items added to SLOT_POCKET2 will always be removed upon being used.
   *
   * @param collectibleType
   * @param slot Can be either ActiveSlot.SLOT_POCKET or ActiveSlot.SLOT_POCKET2. Default is ActiveSlot.SLOT_POCKET.
   * @param keepInPools If true, the item will not be removed from the item pools. Default is false.
   */
  SetPocketActiveItem(
    collectibleType: CollectibleType,
    slot?: ActiveSlot,
    keepInPools?: boolean,
  ): void;
  SetShootingCooldown(cooldown: int): void;
  /**
   * This sets Bethany's soul heart charges.
   *
   * @param num
   */
  SetSoulCharge(num: int): void;
  SetTargetTrapDoor(trapDoor: GridEntity): void;
  ShootRedCandle(direction: Vector): void;
  SpawnMawOfVoid(timeout: int): EntityLaser;
  StopExtraAnimation(): void;
  SwapActiveItems(): void;
  ThrowBlueSpider(position: Vector, target: Vector): Entity;
  /**
   * Spawns a friendly dip from Dirty Mind and throws it towards the specified target.
   *
   * @param subType
   * @param position
   * @param target If Vector.Zero, throws the spawned dip in a random direction. Default is
   * Vector.Zero.
   */
  ThrowFriendlyDip(
    subType: int,
    position: Vector,
    target?: Vector,
  ): EntityFamiliar;
  /**
   * If holding an entity, throws it in the specified direction and returns it, otherwise returns
   * nil.
   *
   * @param velocity
   */
  ThrowHeldEntity(velocity: Vector): Entity;
  /**
   * Triggers the extra effect granted by Book of Virtues for the given active item.
   *
   * @param collectibleType Default is CollectibleType.COLLECTIBLE_NULL.
   */
  TriggerBookOfVirtues(collectibleType?: CollectibleType): void;
  /**
   * Attempts to pick up the given entity, returns true on success.
   * Currently only works with some entity types (mainly bombs and enemies).
   */
  TryHoldEntity(entity: Entity): boolean;
  TryHoldTrinket(trinketType: TrinketType | int): boolean;
  TryRemoveCollectibleCostume(
    collectibleType: CollectibleType | int,
    keepPersistent: boolean,
  ): void;
  TryRemoveNullCostume(nullItemID: NullItemID | int): void;
  /** If you provide an argument of 0 or an otherwise invalid trinket ID, the game will crash. */
  TryRemoveTrinket(trinketType: TrinketType | int): boolean;
  TryRemoveTrinketCostume(trinketType: TrinketType | int): void;
  TryUseKey(): boolean;
  UpdateCanShoot(): void;
  /**
   * @param collectibleType
   * @param useFlag Default is 0.
   * @param activeSlot The active slot this item was used from.
   * (Set to -1 if this item wasn't triggered by any active slot.)
   * Default is ActiveSlot.SLOT_PRIMARY.
   */
  UseActiveItem(
    collectibleType: CollectibleType | int,
    useFlag?: UseFlag,
    activeSlot?: ActiveSlot,
  ): void;
  /**
   * @param collectibleType
   * @param showAnim
   * @param keepActiveItem
   * @param allowNonMainPlayer
   * @param toAddCostume
   * @param activeSlot The active slot this item was used from.
   * (Set to -1 if this item wasn't triggered by any active slot.)
   * Default is ActiveSlot.SLOT_PRIMARY.
   */
  UseActiveItem(
    collectibleType: CollectibleType | int,
    showAnim: boolean,
    keepActiveItem: boolean,
    allowNonMainPlayer: boolean,
    toAddCostume: boolean,
    activeSlot?: ActiveSlot,
  ): void;
  /**
   * @param card
   * @param useFlag Default is 0.
   */
  UseCard(card: Card | int, useFlag?: UseFlag): void;
  /**
   * @param pillEffect
   * @param pillColor
   * @param useFlag Default is 0.
   */
  UsePill(
    pillEffect: PillEffect | int,
    pillColor: PillColor | int,
    useFlag?: UseFlag,
  ): void;
  WillPlayerRevive(): boolean;

  BabySkin: BabySubType | int;
  CanFly: boolean;
  readonly ControllerIndex: ControllerIndex;
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
  SecondaryActiveItem: ActiveItemDesc | null;
  ShotSpeed: float;
  SpriteScale: Vector;
  TearColor: Color;
  TearFallingAcceleration: float;
  TearFallingSpeed: float;
  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  TearFlags: int;
  TearHeight: float;
  readonly TearsOffset: Readonly<Vector>;
}
