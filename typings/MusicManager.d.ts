declare class MusicManager {
  Play(music: Music, volume: float): void;
  Fadein(music: Music, volume: float): void;
  Crossfade(music: Music): void;
  Queue(music: Music): void;
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
  GetCurrentMusicID(): Music;
  GetQueuedMusicID(): Music;
}
