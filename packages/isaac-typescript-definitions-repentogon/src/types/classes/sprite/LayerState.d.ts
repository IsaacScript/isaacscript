import type { AnimationRenderFlag } from "../../../enums/flags/AnimationRenderFlag";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LayerState extends IsaacAPIClass {
    /** Clears the custom shader. */
    readonly ClearCustomChampionShader: () => void;

    /** Clears the custom shader. */
    readonly ClearCustomShader: () => void;

    /** Returns the layer's `BlendMode`. */
    readonly GetBlendMode: () => BlendMode;

    /** Returns the layer's color. */
    readonly GetColor: () => Color;

    /** Returns the layer's crop offset. */
    readonly GetCropOffset: () => Vector;

    /** Returns the layer's default spritesheet. */
    readonly GetDefaultSpritesheetPath: () => string;

    /** Returns whether the layer is flipped on the X axis. */
    readonly GetFlipX: () => boolean;

    /** Returns whether the layer is flipped on the Y axis. */
    readonly GetFlipY: () => boolean;

    /** Returns the layer's ?ID. */
    readonly GetLayerID: () => int;

    /** Returns the layer's name. */
    readonly GetName: () => string;

    /** Returns the layer's position. */
    readonly GetPos: () => Vector;

    /** Returns the layer's animation render flags. */
    readonly GetRenderFlags: () => BitFlags<AnimationRenderFlag>;

    /** Returns the layer's rotation. */
    readonly GetRotation: () => number;

    /** Returns the layer's size. */
    readonly GetSize: () => Vector;

    /** Returns the path of the layer's spritesheet. */
    readonly GetSpritesheetPath: () => string;

    readonly GetWrapSMode: () => int;
    readonly GetWrapTMode: () => int;

    /** Returns whether the shader from the specified path is active. */
    readonly HasCustomChampionShader: (path: string) => boolean;

    /** Returns whether the shader from the specified path is active. */
    readonly HasCustomShader: (path: string) => boolean;

    /** Returns whether the layer is visible. */
    readonly IsVisible: () => boolean;

    /** Sets the layer's color. */
    readonly SetColor: (color: Color) => void;

    /** Sets the layer's crop offset. */
    readonly SetCropOffset: (cropOffset: Vector) => void;

    /**
     * Overrides the `coloroffset_champion` shader the sprite uses with a custom one. This shader is
     * only used if the entity is a champion.
     *
     * The custom shader must take the same inputs as the `coloroffset_champion` shader the game
     * uses.
     *
     * @param shaderPath A path to the folder containing the shaders. The path starts on the
     *                   resources folder and expects to find both a `.vs` and `.fs` file.
     */
    readonly SetCustomChampionShader: (shaderPath: string) => void;

    /**
     * Overrides the `coloroffset` shader the sprite uses with a custom one.
     *
     * The game will not use the shader if the entity is a champion or if the Gold/Dogma shader is
     * active.
     *
     * The custom shader must take the exact same inputs as the `coloroffset` shader the game uses.
     *
     * @param shaderPath A path to the folder containing the shaders. The path starts on the
     *                   resources folder and expects to find both a `.vs` and `.fs` file.
     */
    readonly SetCustomShader: (shaderPath: string) => void;

    /** Sets whether the layer is flipped on the X axis. */
    readonly SetFlipX: (flipped: boolean) => void;

    /** Sets whether the layer is flipped on the Y axis. */
    readonly SetFlipY: (flipped: boolean) => void;

    /** Sets the layer's position. */
    readonly SetPos: (position: Vector) => void;

    /** Sets the layer's animation render flags. */
    readonly SetRenderFlags: (
      flags: AnimationRenderFlag | BitFlags<AnimationRenderFlag>,
    ) => void;

    /** Sets the layer's rotation. */
    readonly SetRotation: (rotation: number) => void;

    /** Sets the layer's size. */
    readonly SetSize: (size: Vector) => void;

    /** Sets the layer's visibility. */
    readonly SetVisible: (isVisible: boolean) => void;

    readonly SetWrapSMode: (mode: int) => void;
    readonly SetWrapTMode: (mode: int) => void;
  }
}
