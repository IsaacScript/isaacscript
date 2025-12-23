/**
 * Constructs a new `ColorModifier` object.
 *
 * @param r Optional. Default is 1.
 * @param g Optional. Default is 1.
 * @param b Optional. Default is 1.
 * @param a Optional. Default is 0.
 * @param brightness Optional. Default is 0.
 * @param contrast Optional. Default is 1. This class is for REPENTOGON, an exe-hack which expands
 *                 the modding API.
 * @see https://repentogon.com/
 */
declare function ColorModifier(
  this: void,
  r?: float,
  g?: float,
  b?: float,
  a?: float,
  brightness?: float,
  contrast?: float,
): ColorModifier;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface ColorModifier extends IsaacAPIClass {
  A: float;
  B: float;
  Brightness: float;
  Contrast: float;
  G: float;
  R: float;

  // The underscore methods like `__add` are not implemented in favor of having `add` and so on.
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types

  add: LuaAdditionMethod<ColorModifier, ColorModifier>;
  sub: LuaSubtractionMethod<ColorModifier, ColorModifier>;
  mul: LuaMultiplicationMethod<number | ColorModifier, ColorModifier>;
  div: LuaDivisionMethod<ColorModifier | number, ColorModifier>;
}
