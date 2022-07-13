declare function Sprite(this: void): Sprite;

declare interface Sprite {
  GetAnimation(): string;
  GetDefaultAnimation(): string;
  GetDefaultAnimationName(): Readonly<string>;
  GetFilename(): string;
  GetFrame(): int;
  GetLayerCount(): int;
  GetOverlayAnimation(): string;
  GetOverlayFrame(): int;

  /**
   * @param samplePos
   * @param renderPos
   * @param alphaThreshold
   * @param layerID Default is 0.
   */
  GetTexel(
    samplePos: Vector,
    renderPos: Vector,
    alphaThreshold: float,
    layerID?: int,
  ): KColor;

  IsEventTriggered(eventName: string): boolean;
  IsFinished(animation: string): boolean;
  IsLoaded(): boolean;
  IsOverlayFinished(animation: string): boolean;
  IsOverlayPlaying(animation: string): boolean;
  IsPlaying(animation: string): boolean;

  /**
   * @param anm2 The path to the anm2 file that contains all of the animations for this sprite.
   * @param loadGraphics Whether or not to immediately load the spritesheet PNG files. If false is
   *                     passed, then you must call the `Sprite.LoadGraphics` method at some point
   *                     in the future. Typically, you would pass false for this argument if you are
   *                     intending to use the `Sprite.ReplaceSpritesheet` method after loading the
   *                     anm2.
   */
  Load(anm2: string, loadGraphics: boolean): void;

  /**
   * Used to load the PNG files that are specified in the sprite's anm2. Typically, you would only
   * call this method if you have previously passed false to the `loadGraphics` argument of the
   * `Sprite.Load` method.
   */
  LoadGraphics(): void;

  Play(animation: string, force: boolean): void;
  PlayOverlay(animation: string, force: boolean): void;
  PlayRandom(seed: Seed): void;
  Reload(): void;
  RemoveOverlay(): void;

  /**
   * @param position
   * @param topLeftClamp Default is `Vector.Zero`.
   * @param bottomRightClamp Default is `Vector.Zero`.
   */
  Render(
    position: Vector,
    topLeftClamp?: Vector,
    bottomRightClamp?: Vector,
  ): void;

  /**
   * @param layerID
   * @param position
   * @param topLeftClamp Default is `Vector.Zero`.
   * @param bottomRightClamp Default is `Vector.Zero`.
   */
  RenderLayer(
    layerID: int,
    position: Vector,
    topLeftClamp?: Vector,
    bottomRightClamp?: Vector,
  ): void;

  /**
   * @param layerID
   * @param pngPath The full path to the PNG file. For example:
   *                "gfx/items/collectibles/questionmark.png"
   */
  ReplaceSpritesheet(layerID: int, pngPath: string): void;

  Reset(): void;
  SetAnimation(animation: string): boolean;
  SetFrame(frameNum: int): void;
  SetFrame(animation: string, frameNum: int): void;
  SetLastFrame(): void;
  SetLayerFrame(layerID: int, frameNum: int): void;
  SetOverlayAnimation(animation: string): boolean;
  SetOverlayFrame(animation: string, frameNum: int): void;
  SetOverlayRenderPriority(renderFirst: boolean): void;
  Stop(): void;
  Update(): void;
  WasEventTriggered(eventName: string): boolean;

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
