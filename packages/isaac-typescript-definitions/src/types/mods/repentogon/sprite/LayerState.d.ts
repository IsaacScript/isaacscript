import { AnimationRenderFlag } from "../../../../enums/mods/repentogon/flags/AnimationRenderFlag";

declare global {
  /**
   *  This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface LayerState {
    GetBlendMode: () => RenderBlendMode;
    GetColor: () => Color;
    GetCropOffset: () => Vector;
    GetDefaultSpritesheetPath: () => string;
    GetLayerID: () => int;
    GetName: () => string;
    GetPos: () => Vector;
    GetRenderFlags: () => BitFlags<AnimationRenderFlag>;
    GetRotation: () => number;
    GetSize: () => Vector;
    GetSpritesheetPath: () => string;
    IsVisible: () => boolean;
    SetColor: (color: Color) => void;
    SetCropOffset: (offset: Vector) => void;
    SetPos: (position: Vector) => void;
    SetRenderFlags: (
      flags: AnimationRenderFlag | BitFlags<AnimationRenderFlag>,
    ) => void;
    SetRotation: (rotation: number) => void;
    SetSize: (size: number) => void;
    SetVisible: (visible: boolean) => void;
  }
}
