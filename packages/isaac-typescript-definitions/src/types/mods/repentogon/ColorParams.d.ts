/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export interface ColorParams extends IsaacAPIClass {
  GetColor: () => Color;
  GetDuration: () => int;
  GetFadeout: () => boolean;
  GetLifespan: () => int;
  GetPriority: () => int;
  GetShared: () => boolean;
  SetColor: (color: Color) => void;
  SetDuration: (duration: int) => void;
  SetFadeout: (isFading: boolean) => void;
  SetLifespan: (duration: int) => void;
  SetPriority: (priority: int) => void;
}
