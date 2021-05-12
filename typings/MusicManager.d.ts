declare function MusicManager(this: void): MusicManager;

declare class MusicManager {
  Crossfade(
    music: Music | int,
    fadeRate?: float, // Default is 0.08
  ): void;
  Disable(): void;
  DisableLayer(
    layerID?: int, // Default is 0
  ): void;
  Enable(): void;
  EnableLayer(
    layerID?: int, // Default is 0
    instant?: boolean, // Default is false
  ): void;
  Fadein(
    music: Music | int,
    volume?: float, // Default is 1
    fadeRate?: float, // Default is 0.08
  ): void;
  Fadeout(
    fadeRate?: float, // Default is 0.08
  ): void;
  GetCurrentMusicID(): Music | int;
  GetQueuedMusicID(): Music | int;
  IsEnabled(): boolean;
  IsLayerEnabled(
    layerID?: int, // Default is 0
  ): boolean;
  Pause(): void;
  PitchSlide(targetPitch: float): void;
  Play(music: Music | int, volume: float): void;
  Queue(music: Music | int): void;
  ResetPitch(): void;
  Resume(): void;
  UpdateVolume(): void;
  VolumeSlide(
    targetVolume: float,
    fadeRate?: float, // Default is 0.08
  ): void;
}
