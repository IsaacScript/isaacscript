declare class GridEntity {
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
  ToDoor(): GridEntityDoor;
  ToPit(): GridEntityPit;
  ToPoop(): GridEntityPoop;
  ToPressurePlate(): GridEntityPressurePlate;
  ToRock(): GridEntityRock;
  ToSpikes(): GridEntitySpikes;
  ToTNT(): GridEntityTNT;
  Update(): void;

  CollisionClass: GridCollisionClass;
  // Desc: GridEntityDesc; // Should use GetSaveState() instead
  readonly Position: Readonly<Vector>;
  State: int;
  VarData: int;
}
