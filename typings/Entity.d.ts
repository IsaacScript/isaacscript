/**
 * EntityVariantForAC (all classes) is a composition of multiple different kinds of variants for the
 * purposes of aiding auto-completion. Note that this type does not actually provide any type
 * safety. (e.g. "Variant: EntityVariantForAC" is the same as "Variant: int".)
 */
type EntityVariantForAC =
  | EffectVariant
  | PickupVariant
  | BombVariant
  | FamiliarVariant
  | TearVariant
  | ProjectileVariant
  | PlayerVariant
  | LaserVariant
  | int;

declare class Entity {
  AddBurn(source: EntityRef, duration: int, damage: float): void;
  AddCharmed(duration: int): void;
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
  CanShutDoors(): boolean;
  ClearEntityFlags(entityFlags: EntityFlag): void;
  CollidesWithGrid(): boolean;
  Die(): void;
  Exists(): boolean;
  GetBossID(): BossIDs | int;
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
  ToBomb(): EntityBomb | null;
  ToEffect(): EntityEffect | null;
  ToFamiliar(): EntityFamiliar | null;
  ToKnife(): EntityKnife | null;
  ToLaser(): EntityLaser | null;
  ToNPC(): EntityNPC | null;
  ToPickup(): EntityPickup | null;
  ToPlayer(): EntityPlayer | null;
  ToProjectile(): EntityProjectile | null;
  ToTear(): EntityTear | null;
  Update(): void;

  Child: Entity | null;
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
  Parent: Entity | null;
  Position: Vector;
  readonly PositionOffset: Readonly<Vector>;
  RenderZOffset: int;
  Size: float;
  SizeMulti: Vector;
  readonly SpawnGridIndex: int;
  SpawnerEntity: Entity | null;
  SpawnerType: EntityType | int;
  SpawnerVariant: EntityVariantForAC;
  readonly SplatColor: Readonly<Color>;
  SpriteOffset: Vector;
  SpriteRotation: float;
  SpriteScale: Vector;
  SubType: int;
  Target: Entity | null;
  readonly TargetPosition: Readonly<Vector>;
  readonly Type: EntityType | int;
  Variant: EntityVariantForAC;
  Velocity: Vector;
  Visible: boolean;
}
