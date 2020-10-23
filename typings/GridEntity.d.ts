/**
 * GridEntityVariantForAC is a composition of multiple different kinds of variants for the purposes
 * of aiding autocompletion. Note that this type does not actually provide any type safety. (e.g.
 * "Variant: GridEntityVariantForAC" is the same as "Variant: int")
 */
type GridEntityVariantForAC = DoorVariant | PoopVariant | PlateVariant | int;

declare class GridEntity {
  SetType(gridEntityType: GridEntityType): void;
  SetVariant(variant: GridEntityVariantForAC): void;
  Init(seed: int): void;
  PostInit(): void;
  Update(): void;
  Render(offset: Vector): void;
  Hurt(damage: int): boolean;
  Destroy(immediate: boolean): boolean;
  GetType(): GridEntityType | int;
  GetVariant(): GridEntityVariantForAC;
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
