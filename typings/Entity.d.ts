/**
 * EntityVariantForAC (all classes) is a composition of multiple different kinds of variants for the
 * purposes of aiding autocompletion. Note that this type does not actually provide any type safety.
 * (e.g. "Variant: EntityVariantForAC" is the same as "Variant: int")
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
  GetData(): Record<string, unknown>;
  Update(): void;
  Render(offset: Vector): void;
  RenderShadowLayer(offset: Vector): boolean;
  PostRender(): void;
  TakeDamage(
    damage: float,
    damageFlags: int,
    source: EntityRef,
    damageCountdown: int,
  ): boolean;
  HasMortalDamage(): boolean;
  Kill(): void;
  Die(): void;
  Remove(): void;
  BloodExplode(): void;
  AddVelocity(velocity: Vector): void;
  MultiplyFriction(value: float): void;
  SetColor(
    color: Color,
    duration: int,
    priority: int,
    fadeout: boolean,
    share: boolean,
  ): void;
  GetColor(): Readonly<Color>;
  SetSpriteFrame(animationName: string, frameNum: int): void;
  SetSpriteOverlayFrame(animationName: string, frameNum: int): void;
  SetSize(size: float, sizeMulti: Vector, numGridCollisionPoints: int): void;
  CollidesWithGrid(): boolean;
  IsEnemy(): boolean;
  IsActiveEnemy(includeDead: boolean): boolean;
  IsVulnerableEnemy(): boolean;
  IsFlying(): boolean;
  AddEntityFlags(entityFlags: EntityFlag): void;
  ClearEntityFlags(entityFlags: EntityFlag): void;
  GetEntityFlags(): EntityFlag;
  HasEntityFlags(entityFlags: EntityFlag): boolean;
  HasFullHealth(): boolean;
  AddHealth(hitPoints: float): void;
  AddPoison(source: EntityRef, duration: int, damage: float): void;
  AddFreeze(source: EntityRef, duration: int): void;
  AddSlowing(
    source: EntityRef,
    duration: int,
    slowValue: float,
    slowColor: Color,
  ): void;
  AddCharmed(duration: int): void;
  AddConfusion(source: EntityRef, duration: int, ignoreBosses: boolean): void;
  AddMidasFreeze(source: EntityRef, duration: int): void;
  AddFear(source: EntityRef, duration: int): void;
  AddBurn(source: EntityRef, duration: int, damage: float): void;
  AddShrink(source: EntityRef, duration: int): void;
  RemoveStatusEffects(): void;
  Exists(): boolean;
  IsDead(): boolean;
  IsVisible(): boolean;
  IsInvincible(): boolean;
  CanShutDoors(): boolean;
  IsBoss(): boolean;
  GetBossID(): BossIDs | int;
  GetLastParent(): Entity;
  GetLastChild(): Entity;
  HasCommonParentWithEntity(other: Entity): boolean;
  IsFrame(frame: int, offset: int): boolean;
  GetDropRNG(): RNG;
  GetSprite(): Sprite;
  ToPlayer(): EntityPlayer | null;
  ToEffect(): EntityEffect | null;
  ToNPC(): EntityNPC | null;
  ToPickup(): EntityPickup | null;
  ToFamiliar(): EntityFamiliar | null;
  ToBomb(): EntityBomb | null;
  ToKnife(): EntityKnife | null;
  ToLaser(): EntityLaser | null;
  ToTear(): EntityTear | null;
  ToProjectile(): EntityProjectile | null;

  Friction: float;
  Position: Vector;
  Velocity: Vector;
  readonly Type: EntityType | int;
  Variant: EntityVariantForAC;
  SubType: int;
  SpawnerType: EntityType | int;
  SpawnerVariant: EntityVariantForAC;
  readonly SplatColor: Readonly<Color>;
  Visible: boolean;
  readonly PositionOffset: Readonly<Vector>;
  RenderZOffset: int;
  FlipX: boolean;
  readonly SpriteOffset: Readonly<Vector>;
  SpriteScale: Vector;
  SpriteRotation: float;
  SizeMulti: Vector;
  Mass: float;
  MaxHitPoints: float;
  HitPoints: float;
  readonly Index: int;
  readonly TargetPosition: Readonly<Vector>;
  GridCollisionClass: EntityGridCollisionClass;
  EntityCollisionClass: EntityCollisionClass;
  CollisionDamage: float;
  readonly SpawnGridIndex: int;
  Parent: Entity;
  Child: Entity;
  Target: Entity;
  SpawnerEntity: Entity | null;
  readonly FrameCount: int;
  readonly InitSeed: int;
  readonly DropSeed: int;
  DepthOffset: float;
  Size: float;
}
