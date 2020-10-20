/** @noSelf */
declare function Sprite(): Sprite;

declare class Sprite {
  IsFinished(animationName: string): boolean;
  Play(animationName: string, force: boolean): void;
  SetFrame(animationName: string, frameNum: int): void;
  Reset(): void;
  Update(): void;
  Render(
    position: Vector,
    topLeftClamp: Vector,
    bottomRightClamp: Vector,
  ): void;
  RenderLayer(layerID: int, position: Vector): void;
  Load(filename: string, loadGraphics: boolean): void;
  Reload(): void;
  ReplaceSpritesheet(layerID: int, pngFilename: string): void;
  LoadGraphics(): void;
  IsLoaded(): boolean;
  GetFilename(): string;
  PlayRandom(seed: int): void;
  Stop(): void;
  SetAnimation(animationName: string): boolean;
  GetFrame(): int;
  SetLastFrame(): void;
  IsPlaying(animationName: string): boolean;
  SetLayerFrame(layerID: int, frameNum: int): void;
  PlayOverlay(animationName: string, force: boolean): void;
  SetOverlayAnimation(animationName: string): boolean;
  SetOverlayRenderPriority(renderFirst: boolean): void;
  SetOverlayFrame(animationName: string, frameNum: int): void;
  GetOverlayFrame(): int;
  RemoveOverlay(): void;
  IsOverlayPlaying(animationName: string): boolean;
  IsOverlayFinished(animationName: string): boolean;
  IsEventTriggered(eventName: string): boolean;
  WasEventTriggered(eventName: string): boolean;
  GetLayerCount(): int;
  GetDefaultAnimationName(): Readonly<string>;
  GetTexel(samplePos: Vector, renderPos: Vector, alphaThreshold: float): Color;
  GetDefaultAnimation(): string;

  readonly Offset: Readonly<Vector>;
  readonly Scale: Readonly<Vector>;
  Rotation: float;
  readonly Color: Readonly<Color>;
  FlipX: boolean;
  FlipY: boolean;
  PlaybackSpeed: float;
}
