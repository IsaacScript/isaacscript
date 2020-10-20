declare class MusicManager {
  Play(music: int, volume: float): void;
  Fadein(music: int, volume: float): void;
  Crossfade(music: int): void;
  Queue(music: int): void;
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
  GetCurrentMusicID(): int;
  GetQueuedMusicID(): int;
}
