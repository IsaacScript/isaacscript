declare class MusicManager {
  Play(music: Music | int, volume: float): void;
  Fadein(music: Music | int, volume: float): void;
  Crossfade(music: Music | int): void;
  Queue(music: Music | int): void;
  Fadeout(): void;
  Pause(): void;
  Resume(): void;
  EnableLayer(): void;
  DisableLayer(): void;
  IsLayerEnabled(): boolean;
  Enable(): void;
  Disable(): void;
  IsEnabled(): boolean;
  PitchSlide(targetPitch: float): void;
  ResetPitch(): void;
  VolumeSlide(targetVolume: float): void;
  UpdateVolume(): void;
  GetCurrentMusicID(): Music | int;
  GetQueuedMusicID(): Music | int;
}
