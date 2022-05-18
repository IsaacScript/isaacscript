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
  Load(filename: string, loadGraphics: boolean): void;
  LoadGraphics(): void;
  Play(animation: string, force: boolean): void;
  PlayOverlay(animation: string, force: boolean): void;
  PlayRandom(seed: Seed): void;
  Reload(): void;
  RemoveOverlay(): void;

  Render(
    position: Vector,
    topLeftClamp: Vector,
    bottomRightClamp: Vector,
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

  ReplaceSpritesheet(layerID: int, pngFilename: string): void;
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
   * ```
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
