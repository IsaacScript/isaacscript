declare interface Entity {
  AddBurn(source: EntityRef, duration: int, damage: float): void;
  AddCharmed(source: EntityRef, duration: int): void;
  AddConfusion(source: EntityRef, duration: int, ignoreBosses: boolean): void;
  AddEntityFlags(entityFlags: EntityFlag): void;
  AddFear(source: EntityRef, duration: int): void;
  AddFreeze(source: EntityRef, duration: int): void;
  AddHealth(hitPoints: float): void;
  AddMidasFreeze(source: EntityRef, duration: int): void;
  AddPoison(source: EntityRef, duration: int, damage: float): void;
  AddShrink(source: EntityRef, duration: int): void;

  AddSlowing(
    source: EntityRef,
    duration: int,
    slowValue: float,
    slowColor: Color,
  ): void;

  AddVelocity(velocity: Vector): void;
  BloodExplode(): void;
  // CanShutDoors is deliberately not implemented here because it conflicts with
  // EntityNPC.CanShutDoors
  // CanShutDoors(): boolean;
  ClearEntityFlags(entityFlags: EntityFlag): void;
  CollidesWithGrid(): boolean;
  Die(): void;
  Exists(): boolean;
  GetBossID(): BossID | int;
  GetColor(): Readonly<Color>;
  GetData(): Record<string, unknown>;
  GetDropRNG(): RNG;
  GetEntityFlags(): EntityFlag;
  GetLastChild(): Entity;
  GetLastParent(): Entity;
  GetSprite(): Sprite;
  HasCommonParentWithEntity(other: Entity): boolean;
  HasEntityFlags(entityFlags: EntityFlag): boolean;
  HasFullHealth(): boolean;
  HasMortalDamage(): boolean;
  IsActiveEnemy(includeDead: boolean): boolean;
  IsBoss(): boolean;
  IsDead(): boolean;
  IsEnemy(): boolean;
  IsFlying(): boolean;
  IsFrame(frame: int, offset: int): boolean;
  IsInvincible(): boolean;
  IsVisible(): boolean;

  /** Returns true for enemies that can be damaged. */
  IsVulnerableEnemy(): boolean;

  Kill(): void;
  MultiplyFriction(value: float): void;
  PostRender(): void;
  Remove(): void;
  RemoveStatusEffects(): void;
  Render(offset: Vector): void;
  RenderShadowLayer(offset: Vector): boolean;

  /**
   *
   * @param color
   * @param duration
   * @param priority
   * @param fadeout Default value is false.
   * @param share Default value is false.
   */
  SetColor(
    color: Color,
    duration: int,
    priority: int,
    fadeout?: boolean,
    share?: boolean,
  ): void;

  SetSize(size: float, sizeMulti: Vector, numGridCollisionPoints: int): void;
  SetSpriteFrame(animationName: string, frameNum: int): void;
  SetSpriteOverlayFrame(animationName: string, frameNum: int): void;

  TakeDamage(
    damage: float,
    damageFlags: int,
    source: EntityRef,
    damageCountdown: int,
  ): boolean;

  ToBomb(): EntityBomb | undefined;
  ToEffect(): EntityEffect | undefined;
  ToFamiliar(): EntityFamiliar | undefined;
  ToKnife(): EntityKnife | undefined;
  ToLaser(): EntityLaser | undefined;
  ToNPC(): EntityNPC | undefined;
  ToPickup(): EntityPickup | undefined;
  ToPlayer(): EntityPlayer | undefined;
  ToProjectile(): EntityProjectile | undefined;
  ToTear(): EntityTear | undefined;
  Update(): void;

  Child: Entity | undefined;
  CollisionDamage: float;
  DepthOffset: float;
  readonly DropSeed: int;
  EntityCollisionClass: EntityCollisionClass;
  FlipX: boolean;
  readonly FrameCount: int;
  Friction: float;
  GridCollisionClass: EntityGridCollisionClass;
  HitPoints: float;
  readonly Index: int;
  readonly InitSeed: int;
  Mass: float;
  MaxHitPoints: float;
  Parent: Entity | undefined;
  Position: Vector;
  readonly PositionOffset: Readonly<Vector>;
  RenderZOffset: int;
  Size: float;
  SizeMulti: Vector;
  readonly SpawnGridIndex: int;
  SpawnerEntity: Entity | undefined;
  SpawnerType: EntityType | int;
  SpawnerVariant: int;

  /**
   * The color of the gibs when an entity dies.
   *
   * The Color of this property is read only, so if you want to change it, you have to replace the
   * entire thing with a new Color object.
   */
  SplatColor: Readonly<Color>;

  SpriteOffset: Vector;
  SpriteRotation: float;
  SpriteScale: Vector;
  SubType: int;
  Target: Entity | undefined;
  readonly TargetPosition: Readonly<Vector>;
  readonly Type: EntityType | int;
  Variant: int;
  Velocity: Vector;
  Visible: boolean;
}
