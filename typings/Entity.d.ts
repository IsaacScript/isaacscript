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
  AddEntityFlags(entityFlags: int): void;
  ClearEntityFlags(entityFlags: int): void;
  GetEntityFlags(): int;
  HasEntityFlags(entityFlags: int): boolean;
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
  GetBossID(): int;
  GetLastParent(): Entity;
  GetLastChild(): Entity;
  HasCommonParentWithEntity(other: Entity): boolean;
  IsFrame(frame: int, offset: int): boolean;
  GetDropRNG(): RNG;
  GetSprite(): Sprite;
  ToPlayer(): EntityPlayer;
  ToEffect(): EntityEffect;
  ToNPC(): EntityNPC;
  ToPickup(): EntityPickup;
  ToFamiliar(): EntityFamiliar;
  ToBomb(): EntityBomb;
  ToKnife(): EntityKnife;
  ToLaser(): EntityLaser;
  ToTear(): EntityTear;
  ToProjectile(): EntityProjectile;

  Friction: float;
  Position: Vector;
  Velocity: Vector;
  readonly Type: int;
  Variant: int;
  SubType: int;
  SpawnerType: int;
  SpawnerVariant: int;
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
  GridCollisionClass: GridCollisionClass;
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
