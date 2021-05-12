declare function Sprite(this: void): Sprite;

declare class Sprite {
  GetDefaultAnimation(): string;
  GetDefaultAnimationName(): Readonly<string>;
  GetFilename(): string;
  GetFrame(): int;
  GetLayerCount(): int;
  GetOverlayFrame(): int;
  GetTexel(samplePos: Vector, renderPos: Vector, alphaThreshold: float): Color;
  IsEventTriggered(eventName: string): boolean;
  IsFinished(animationName: string): boolean;
  IsLoaded(): boolean;
  IsOverlayFinished(animationName: string): boolean;
  IsOverlayPlaying(animationName: string): boolean;
  IsPlaying(animationName: string): boolean;
  Load(filename: string, loadGraphics: boolean): void;
  LoadGraphics(): void;
  Play(animationName: string, force: boolean): void;
  PlayOverlay(animationName: string, force: boolean): void;
  PlayRandom(seed: int): void;
  Reload(): void;
  RemoveOverlay(): void;
  Render(
    position: Vector,
    topLeftClamp: Vector,
    bottomRightClamp: Vector,
  ): void;
  RenderLayer(
    layerID: int,
    position: Vector,
    topLeftClamp?: Vector, // Default is Vector.Zero
    bottomRightClamp?: Vector, // Default is Vector.Zero
  ): void;
  ReplaceSpritesheet(layerID: int, pngFilename: string): void;
  Reset(): void;
  SetAnimation(animationName: string): boolean;
  SetFrame(frameNum: int): void;
  SetFrame(animationName: string, frameNum: int): void;
  SetLastFrame(): void;
  SetLayerFrame(layerID: int, frameNum: int): void;
  SetOverlayAnimation(animationName: string): boolean;
  SetOverlayFrame(animationName: string, frameNum: int): void;
  SetOverlayRenderPriority(renderFirst: boolean): void;
  Stop(): void;
  Update(): void;
  WasEventTriggered(eventName: string): boolean;

  Color: Color;
  FlipX: boolean;
  FlipY: boolean;
  Offset: Vector;
  PlaybackSpeed: float;
  Rotation: float;
  Scale: Vector;
}
