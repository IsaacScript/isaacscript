declare interface GridEntity {
  Destroy(immediate: boolean): boolean;
  GetGridIndex(): int;
  /** The RNG returned is a reference (i.e. not a copy). */
  GetRNG(): RNG;
  GetSaveState(): GridEntityDesc;
  /** The Sprite returned is a reference (i.e. not a copy). */
  GetSprite(): Sprite;
  GetType(): GridEntityType | int;
  GetVariant(): int;
  Hurt(damage: int): boolean;
  Init(seed: int): void;
  PostInit(): void;
  Render(offset: Vector): void;
  SetType(gridEntityType: GridEntityType): void;
  SetVariant(variant: int): void;
  ToDoor(): GridEntityDoor | undefined;
  ToPit(): GridEntityPit | undefined;
  ToPoop(): GridEntityPoop | undefined;
  ToPressurePlate(): GridEntityPressurePlate | undefined;
  ToRock(): GridEntityRock | undefined;
  ToSpikes(): GridEntitySpikes | undefined;
  ToTNT(): GridEntityTNT | undefined;
  Update(): void;

  CollisionClass: GridCollisionClass;
  /**
   * Use the `GetSaveState()` method instead of accessing Desc directly, as it is a deprecated
   * property.
   */
  Desc: never; // GridEntityDesc;
  readonly Position: Readonly<Vector>;
  State: int;
  VarData: int;
}
