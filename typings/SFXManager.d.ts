declare class SFXManager {
  Play(
    soundEffect: SoundEffect | int,
    volume: float,
    frameDelay: int,
    loop: boolean,
    pitch: float,
  ): void;
  AdjustVolume(soundEffect: SoundEffect | int, volume: float): void;
  AdjustPitch(soundEffect: SoundEffect | int, pitch: float): void;
  Stop(soundEffect: SoundEffect | int): void;
  StopLoopingSounds(): void;
  Preload(soundEffect: SoundEffect | int): void;
  IsPlaying(soundEffect: SoundEffect | int): boolean;
  SetAmbientSound(soundEffect: SoundEffect | int, volume: float, pitch: float): void;
  GetAmbientSoundVolume(soundEffect: SoundEffect | int): float;
}
