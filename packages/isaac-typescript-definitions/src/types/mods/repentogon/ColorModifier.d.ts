/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface ColorModifier extends IsaacAPIClass {
  A: number;
  B: number;
  Brightness: number;
  Contrast: number;
  G: number;
  R: number;

  add: LuaAdditionMethod<ColorModifier, ColorModifier>;
  divide: LuaAdditionMethod<ColorModifier, ColorModifier>;
  mul: LuaMultiplicationMethod<ColorModifier, ColorModifier>;
  sub: LuaMultiplicationMethod<ColorModifier, ColorModifier>;
}

/**
 * Constructs a new ColorModifier class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 *
 * @param this
 * @param r Default is 1.
 * @param g Default is 1.
 * @param b Default is 1.
 * @param a Default is 0.
 * @param brightness Default is 0.
 * @param contrast Default is 1.
 */
export function ColorModifier(
  this: void,
  r?: number,
  g?: number,
  b?: number,
  a?: number,
  brightness?: number,
  contrast?: number,
): ColorModifier;
