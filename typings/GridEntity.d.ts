/**
 * GridEntityVariantForAC is a composition of multiple different kinds of variants for the purposes
 * of aiding autocompletion. Note that this type does not actually provide any type safety. (e.g.
 * "Variant: GridEntityVariantForAC" is the same as "Variant: int")
 */
type GridEntityVariantForAC = DoorVariant | PoopVariant | PlateVariant | int;

declare class GridEntity {
  Destroy(immediate: boolean): boolean;
  GetGridIndex(): int;
  GetSaveState(): GridEntityDesc;
  GetType(): GridEntityType | int;
  GetVariant(): GridEntityVariantForAC;
  Hurt(damage: int): boolean;
  Init(seed: int): void;
  PostInit(): void;
  Render(offset: Vector): void;
  SetType(gridEntityType: GridEntityType): void;
  SetVariant(variant: GridEntityVariantForAC): void;
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
  RNG: RNG;
  Sprite: Sprite;
  State: int;
  VarData: int;
}
