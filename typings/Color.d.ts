/** @noSelf */
declare function Color(
  r: float,
  g: float,
  b: float,
  a: float,
  ro: int,
  go: int,
  bo: int,
): Color;

declare class Color {
  Reset(): void;
  SetTint(
    redTint: float,
    greenTint: float,
    blueTint: float,
    alphaTint: float,
  ): void;
  SetColorize(red: float, green: float, blue: float, amount: float): void;
  SetOffset(redOffset: float, greenOffset: float, blueOffset: float): void;

  /** @noSelf */
  static Lerp(m1: Color, m2: Color, t: float): Color;

  R: float;
  G: float;
  B: float;
  A: float;
  RO: float;
  GO: float;
  BO: float;
}
