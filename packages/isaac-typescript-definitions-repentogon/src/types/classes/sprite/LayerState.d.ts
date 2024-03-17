import type { AnimationRenderFlag } from "../../../enums/flags/AnimationRenderFlag";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface LayerState {
  /** Returns the layer's `BlendMode`. */
  GetBlendMode: () => BlendMode;

  /** Returns the layer's color. */
  GetColor: () => Color;

  /** Returns the layer's crop offset. */
  GetCropOffset: () => Vector;

  /** Returns the layer's default spritesheet. */
  GetDefaultSpritesheetPath: () => string;

  /** Returns the layer's ?ID. */
  GetLayerID: () => int;

  /** Returns the layer's name. */
  GetName: () => string;

  /** Returns the layer's position. */
  GetPos: () => Vector;

  /** Returns the layer's animation render flags. */
  GetRenderFlags: () => BitFlags<AnimationRenderFlag>;

  /** Returns the layer's rotation. */
  GetRotation: () => number;

  /** Returns the layer's size. */
  GetSize: () => Vector;

  /** Returns the path of the layer's spritesheet. */
  GetSpritesheetPath: () => string;

  GetWrapSMode: () => int;
  GetWrapTMode: () => int;

  /** Returns whether the layer is visible. */
  IsVisible: () => boolean;

  /** Sets the layer's color. */
  SetColor: (color: Color) => void;

  /** Sets the layer's crop offset. */
  SetCropOffset: (cropOffset: Vector) => void;

  /** Sets the layer's position. */
  SetPos: (position: Vector) => void;

  /** Sets the layer's animation render flags. */
  SetRenderFlags: (flags: BitFlags<AnimationRenderFlag>) => void;

  /** Sets the layer's rotation. */
  SetRotation: (rotation: number) => void;

  /** Sets the layer's size. */
  SetSize: (size: Vector) => void;

  /** Sets the layer's visibility. */
  SetVisible: (isVisible: boolean) => void;

  SetWrapSMode: (mode: int) => void;
  SetWrapTMode: (mode: int) => void;
}
