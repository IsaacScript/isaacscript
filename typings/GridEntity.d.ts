declare class GridEntity {
  SetType(gridEntityType: int): void;
  SetVariant(variant: int): void;
  Init(seed: int): void;
  PostInit(): void;
  Update(): void;
  Render(offset: Vector): void;
  Hurt(damage: int): boolean;
  Destroy(immediate: boolean): boolean;
  GetType(): int;
  GetVariant(): int;
  GetGridIndex(): int;
  GetSaveState(): GridEntityDesc;
  ToDoor(): GridEntityDoor;
  ToPit(): GridEntityPit;
  ToPoop(): GridEntityPoop;
  ToRock(): GridEntityRock;
  ToPressurePlate(): GridEntityPressurePlate;
  ToSpikes(): GridEntitySpikes;
  ToTNT(): GridEntityTNT;

  readonly Position: Readonly<Vector>;
  State: int;
  VarData: int;
  // Desc: GridEntityDesc; // Should use GetSaveState() instead
  RNG: RNG;
  CollisionClass: GridCollisionClass;
  Sprite: Sprite;
}
