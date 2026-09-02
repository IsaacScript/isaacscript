declare interface Sprite extends IsaacAPIClass {
  /** Return the name of the currently played animation. */
  readonly GetAnimation: () => string;

  /** Returns the `DefaultAnimation` value from the currently loaded anm2 file. */
  readonly GetDefaultAnimation: () => string;

  /**
   * The `Sprite.GetDefaultAnimationName` method is identical to the `Sprite.GetDefaultAnimation`
   * method, so the former is preferred.
   */
  // GetDefaultAnimationName(): string;

  /** Returns the path to the anm2 file that is loaded on the sprite. */
  readonly GetFilename: () => string;

  /** Returns the frame number of the animation that is currently being rendered. */
  readonly GetFrame: () => int;

  /**
   * Returns the number of layers in the anm2 file that is loaded on the sprite. All animations use
   * the same amount of layers.
   */
  readonly GetLayerCount: () => int;

  /**
   * Returns the name of the currently playing overlay animation. (The overlay animation is an
   * independent secondary animation that can be played at the same time as the normal animation.)
   */
  readonly GetOverlayAnimation: () => string;

  /**
   * Returns the frame number of the overlay animation that is currently being rendered. (The
   * overlay animation is an independent secondary animation that can be played at the same time as
   * the normal animation.)
   */
  readonly GetOverlayFrame: () => int;

  /**
   * Returns the color of the pixel of the sprite at the given sample position.
   *
   * @param samplePos
   * @param renderPos
   * @param alphaThreshold
   * @param layerID Default is 0.
   */
  readonly GetTexel: (
    samplePos: Vector,
    renderPos: Vector,
    alphaThreshold: float,
    layerID?: int,
  ) => KColor;

  /** Returns true if the specified event in the animation is currently being triggered. */
  readonly IsEventTriggered: (eventName: string) => boolean;

  /**
   * Returns whether the current animation is finished.
   *
   * @param animation Default is the name of the last played animation.
   */
  readonly IsFinished: (animation?: string) => boolean;

  readonly IsLoaded: () => boolean;

  /**
   * Returns whether the current overlay animation is finished.
   *
   * @param animation Default is the name of the last played animation.
   */
  readonly IsOverlayFinished: (animation?: string) => boolean;

  /**
   * Returns whether the current overlay animation is played or stopped.
   *
   * @param animation Default is the name of the last played animation.
   */
  readonly IsOverlayPlaying: (animation?: string) => boolean;

  /**
   * Returns whether the current animation is played or stopped.
   *
   * @param animation Default is the name of the last played animation.
   */
  readonly IsPlaying: (animation?: string) => boolean;

  /**
   * Loads the provided anm2 file to the sprite. Each sprite must have an anm2 file loaded in order
   * for it to display anything.
   *
   * @param anm2Path The path to the anm2 file that contains all of the animations for this sprite.
   *                 This should be relative to the "resources" folder.
   * @param loadGraphics Whether to immediately load the spritesheet PNG files. If false is passed,
   *                     then you must call the `Sprite.LoadGraphics` method at some point in the
   *                     future. Typically, you would pass false for this argument if you are
   *                     intending to use the `Sprite.ReplaceSpritesheet` method after loading the
   *                     anm2.
   */
  readonly Load: (anm2Path: string, loadGraphics: boolean) => void;

  /**
   * Used to load the PNG files that are specified in the sprite's anm2. Typically, you would only
   * call this method if you have previously passed false to the `loadGraphics` argument of the
   * `Sprite.Load` method or you have called the `Sprite.ReplaceSpritesheet` method.
   */
  readonly LoadGraphics: () => void;

  /**
   * Starts executing the given animation, starting at frame 0. After calling this method, you must
   * call the `Sprite.Update` method on every render frame in order to advance the animation to the
   * next frame. (Typically, you would also check to see if the animation is finished by using the
   * `Sprite.IsFinished` method.)
   *
   * Calling this method again will reset the current frame back to 0.
   *
   * @param animation The name of the animation to play.
   * @param force If true, the currently playing animation will be stopped. If false, and there is
   *              already a currently playing animation, this method will do nothing and the current
   *              animation will continue to play.
   */
  readonly Play: (animation: string, force: boolean) => void;

  /**
   * Starts executing the given overlay animation, starting at frame 0. (The overlay animation is an
   * independent secondary animation that can be played at the same time as the normal animation.)
   * After calling this method, you must call the `Sprite.Update` method on every render frame in
   * order to advance the animation to the next frame. (Typically, you would also check to see if
   * the animation is finished by using the `Sprite.IsOverlayFinished` method.)
   *
   * @param animation The name of the overlay animation to play.
   * @param force If true, the currently playing animation will be stopped. If false, and there is
   *              already a currently playing animation, this method will do nothing and the current
   *              animation will continue to play.
   */
  readonly PlayOverlay: (animation: string, force: boolean) => void;

  /** Plays a random animation from the currently loaded anm2 file. */
  readonly PlayRandom: (seed: Seed) => void;

  readonly Reload: () => void;
  readonly RemoveOverlay: () => void;

  /**
   * Renders the sprite at a given screen position, where (0, 0) is the top left corner of the
   * screen.
   *
   * In order for the sprite to be drawn, this function needs to be called on every render frame.
   * (For example in the `MC_POST_RENDER` callback.)
   *
   * @param position
   * @param topLeftClamp Default is `Vector.Zero`. This can be used to crop the sprite.
   * @param bottomRightClamp Default is `Vector.Zero`. This can be used to crop the sprite.
   */
  readonly Render: (
    position: Vector,
    topLeftClamp?: Vector,
    bottomRightClamp?: Vector,
  ) => void;

  /**
   * Renders a specific layer of the sprite at a given screen position, where (0, 0) is the top left
   * corner of the screen.
   *
   * This is similar to the `Sprite.Render` method, but it will only render a specific layer of the
   * sprite instead of all of the layers at once.
   *
   * @param layerID
   * @param position
   * @param topLeftClamp Default is `Vector.Zero`. This can be used to crop the sprite.
   * @param bottomRightClamp Default is `Vector.Zero`. This can be used to crop the sprite.
   */
  readonly RenderLayer: (
    layerID: int,
    position: Vector,
    topLeftClamp?: Vector,
    bottomRightClamp?: Vector,
  ) => void;

  /**
   * Changes the ".png" file associated with a specific layer of a sprite. (This does not change any
   * layers other than the one that is explicitly specified.)
   *
   * After replacing a spritesheet, you must call the `Sprite.LoadGraphics` method afterwards.
   *
   * @param layerID
   * @param pngPath The full path to the PNG file. For example:
   * "gfx/items/collectibles/questionmark.png"
   * @returns `true` if the spritesheet at the given layer ID was successfully replaced and if the
   *          new spritesheet is not the same as the old one, otherwise `false`. This return value
   *          was added in Repentance+.
   */
  readonly ReplaceSpritesheet: (layerID: int, pngPath: string) => boolean;

  /**
   * Resets the sprite such that it will be equivalent to a new sprite created with the `Sprite`
   * constructor.
   *
   * Doing this will obviously make the sprite disappear since the anm2 file will be unloaded.
   */
  readonly Reset: () => void;

  /**
   * Similar to the `Sprite.Play` method, but does not start the animation.
   *
   * @param animation
   * @param reset Default is true. Passing false will continue the animation from the current frame.
   *              This can be useful for seamlessly switching between two similar animations.
   */
  readonly SetAnimation: (animation: string, reset?: boolean) => boolean;

  /**
   * Changes the current animation to a specific frame.
   *
   * Note that normally, you would use the `Sprite.Update` method to automatically iterate the
   * sprite's animation frame. Thus, this method is typically used for sprites that don't play
   * animations.
   *
   * The `Sprite.SetFrame` method has two overloads: one which supports setting an animation at the
   * same time, and one that uses the currently playing animation.
   *
   * @param frameNum The frame number of the current animation to set.
   */
  readonly SetFrame: ((frameNum: int) => void)
    & ((animation: string, frameNum: int) => void);

  readonly SetLastFrame: () => void;
  readonly SetLayerFrame: (layerID: int, frameNum: int) => void;

  /**
   * Similar to the `Sprite.PlayOverlay` method, but does not start the animation.
   *
   * @param animation
   * @param reset Default is true. Passing false will continue the animation from the current frame.
   *              This can be useful for seamlessly switching between two similar animations.
   */
  readonly SetOverlayAnimation: (animation: string, reset?: boolean) => boolean;

  readonly SetOverlayFrame: (animation: string, frameNum: int) => void;
  readonly SetOverlayRenderPriority: (renderFirst: boolean) => void;
  readonly Stop: () => void;

  /**
   * Advances the currently playing animation by one frame. If a new animation was played, this will
   * set the frame to 0 (so that the 0th frame will not get skipped over).
   *
   * If the sprite is playing an animation, you need to call this on every render frame before you
   * render it.
   */
  readonly Update: () => void;

  /**
   * Returns true if the specified event in the animation was triggered at some point. (It remains
   * true until the animation stops playing.)
   */
  readonly WasEventTriggered: (eventName: string) => boolean;

  /**
   * You cannot modify the values of this `Color` class directly. Instead, replace the entire class
   * with a new object.
   *
   * For example:
   *
   * ```ts
   * const faded = copyColor(sprite.Color);
   * faded.A = 0.5;
   * sprite.Color = faded;
   * ```
   */
  Color: Readonly<Color>;

  FlipX: boolean;
  FlipY: boolean;
  Offset: Vector;
  PlaybackSpeed: float;
  Rotation: float;
  Scale: Vector;
}

declare function Sprite(this: void): Sprite;
