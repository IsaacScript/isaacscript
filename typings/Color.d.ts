/**
 * @param r Range is 0-1.
 * @param g Range is 0-1.
 * @param b Range is 0-1.
 * @param a Default is 1. Range is 0-1.
 * @param ro Default is 0. Range is 0-1.
 * @param go Default is 0. Range is 0-1.
 * @param bo Default is 0. Range is 0-1.
 */
declare function Color(
  this: void,
  r: float,
  g: float,
  b: float,
  a?: float,
  ro?: int,
  go?: int,
  bo?: int,
): Color;

declare interface Color {
  Reset(): void;
  SetColorize(red: float, green: float, blue: float, amount: float): void;
  SetOffset(redOffset: float, greenOffset: float, blueOffset: float): void;
  SetTint(
    redTint: float,
    greenTint: float,
    blueTint: float,
    alphaTint: float,
  ): void;

  A: float;
  B: float;
  BO: float;
  G: float;
  GO: float;
  R: float;
  RO: float;
}

declare namespace Color {
  function Lerp(this: void, m1: Color, m2: Color, t: float): Color;

  const Default: Color;
}
