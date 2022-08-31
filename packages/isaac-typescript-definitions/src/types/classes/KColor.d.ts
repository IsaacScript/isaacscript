declare function KColor(
  this: void,
  r: float,
  g: float,
  b: float,
  a: float,
): KColor;

declare interface KColor extends IsaacAPIClass {
  Alpha: float;
  Blue: float;
  Green: float;
  Red: float;
}

// The `KColor` presets are not implemented, since they are unsafe. See the `K_COLORS` constant.
