/**
 * GridEntityVariantForAC is a composition of multiple different kinds of variants for the purposes
 * of aiding autocompletion. Note that this type does not actually provide any type safety. (e.g.
 * "Variant: GridEntityVariantForAC" is the same as "Variant: int")
 */
type GridEntityVariantForAC = DoorVariant | PoopVariant | PlateVariant | int;

declare class GridEntity {
  Destroy(immediate: boolean): boolean;
  GetGridIndex(): int;
  /** The RNG returned is a reference (i.e. not a copy). */
  GetRNG(): RNG;
  GetSaveState(): GridEntityDesc;
  /** The Sprite returned is a reference (i.e. not a copy). */
  GetSprite(): Sprite;
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
  State: int;
  VarData: int;
}
