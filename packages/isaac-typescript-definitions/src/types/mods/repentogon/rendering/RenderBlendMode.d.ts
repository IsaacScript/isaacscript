/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface RenderBlendMode extends IsaacAPIClass {
  Flag1: int;
  Flag2: int;
  Flag3: int;
  Flag4: int;

  SetMode: (mode: int) => void;
}
