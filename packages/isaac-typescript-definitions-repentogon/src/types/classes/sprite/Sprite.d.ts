import type { AnimationRenderFlag } from "../../../enums/flags/AnimationRenderFlag";
import type { LayerState } from "./LayerState";

declare function Sprite(
  this: void,
  anm2Path: string,
  loadGraphics?: boolean,
): LuaMultiReturn<[sprite: Sprite, loadedSuccessfully: boolean]>;

declare interface Sprite extends IsaacAPIClass {
  /** Clears the custom shader. */
  ClearCustomShader: () => void;

  /** Clears the custom shader. */
  ClearCustomChampionShader: () => void;

  /**
   * If the animation is currently stopped, it will start playing again from the current frame.
   *
   * This will not restart a finished non-looping animation.
   *
   * @param continueOverlay Optional. Default is true.
   */
  Continue: (continueOverlay?: boolean) => void;

  /**
   * If the overlay animation is currently stopped, it will start playing again from the current
   * frame.
   *
   * This will not restart a finished non-looping animation.
   *
   * @param continueOverlay
   */
  ContinueOverlay: () => void;

  /**
   * Returns an array of `AnimationData` representing all of the animations in the sprite's .anm2
   * file.
   */
  GetAllAnimationData: () => AnimationData[];

  /** Returns an array of all `LayerState` in the sprite. */
  GetAllLayers: () => LayerState[];

  /** Returns the current animation data. */
  GetCurrentAnimationData: () => AnimationData;

  /** Returns the layer data from the specified layer id. Returns undefined if none were found. */
  GetLayer: (layerIdOrName: string | int) => LayerState | undefined;

  /**
   * Returns the null frame from the specified layer name. Returns undefined if the null frame does
   * not exist.
   */
  GetNullFrame: (LayerName: string) => NullFrame | undefined;

  /**
   * Returns the `AnimationData` of the current playing overlay animation. Returns undefined if no
   * overlay animation is playing.
   */
  GetOverlayAnimationData: () => AnimationData | undefined;

  /**
   * Returns the null frame from the specified layer name of the current overlay animation. Returns
   * undefined if the null frame does not exist.
   */
  GetOverlayNullFrame: () => AnimationData | undefined;

  /** Returns a bitmask of the sprite's `AnimationRenderFlag`. */
  GetRenderFlags: () => BitFlags<AnimationRenderFlag>;

  /** Returns whether the shader from the specified path is active. */
  HasCustomShader: (path: string) => boolean;

  /** Returns whether the shader from the specified path is active. */
  HasCustomChampionShader: (path: string) => boolean;

  /** Returns true if the specified event in the overlay animation is currently being triggered. */
  IsOverlayEventTriggered: (eventName: string) => boolean;

  /**
   * Repentogon's modified `Sprite.ReplaceSpritesheet` method.
   *
   * Behaves the same as `Sprite.ReplaceSpritesheet` except specify an additional parameter that
   * forces the sprite to immediately load its graphics after replacing the spritesheet.
   *
   * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
   * definitions. However, when the project compiles the method's name will change to what it's
   * supposed to be.
   *
   * @param layerID
   * @param pngFileName
   * @param loadGraphics Optional. Default is false.
   * @customName ReplaceSpritesheet
   */
  ReplaceSpritesheetEx: (
    layerID: int,
    pngFileName: string,
    loadGraphics?: boolean,
  ) => void;

  /**
   * Overrides the default color offset shader the sprite uses.
   *
   * @param shaderPath A path to the folder containing the shaders. The path starts on the resources
   *                   folder and expects to find both a `.vs` and `.fs` file.
   */
  SetCustomShader: (shaderPath: string) => void;

  /**
   * @param shaderPath A path to the folder containing the shaders. The path starts on the resources
   *                   folder and expects to find both a `.vs` and `.fs` file.
   */
  SetCustomChampionShader: (shaderPath: string) => void;

  /**
   * Repentogon's modified `Sprite.SetOverlayFrame` method.
   *
   * Behaves the same as `Sprite.SetOverlayFrame` except it only sets the frame for the current
   * animation without stopping it.
   *
   * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
   * definitions. However, when the project compiles the method's name will change to what it's
   * supposed to be.
   *
   * @customName SetOverlayFrame
   */
  SetOverlayFrameEx: (frameNumber: int) => void;

  /** Sets the animation's render flags. */
  SetRenderFlags: (
    flags: AnimationRenderFlag | BitFlags<AnimationRenderFlag>,
  ) => void;

  /**
   * Repentogon's modified `Sprite.Stop` method.
   *
   * Behaves the same as `Sprite.Stop` except you can now specify whether the overlay animation
   * should also be stopped.
   *
   * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
   * definitions. However, when the project compiles the method's name will change to what it's
   * supposed to be.
   *
   * @param stopOverlay Optional. Default is true.
   * @customName Stop
   */
  StopEx: (stopOverlay: boolean) => void;

  /** Stops the currently playing overlay animation. */
  StopOverlay: () => void;

  /**
   * Returns true if the specified event in the overlay animation was triggered at some point. (It
   * remains true until the animation stops playing.)
   */
  WasOverlayEventTriggered: (eventName: string) => boolean;
}
