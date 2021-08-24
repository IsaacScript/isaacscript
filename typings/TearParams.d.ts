declare interface TearParams {
  BombVariant: int;
  TearColor: Color;
  TearDamage: float;
  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  TearFlags: int;
  TearHeight: float;
  TearScale: float;
  TearVariant: TearVariant | int;
}
