declare class SFXManager {
  Play(
    soundEffect: int,
    volume: float,
    frameDelay: int,
    loop: boolean,
    pitch: float,
  ): void;
  AdjustVolume(soundEffect: int, volume: float): void;
  AdjustPitch(soundEffect: int, pitch: float): void;
  Stop(soundEffect: int): void;
  StopLoopingSounds(): void;
  Preload(soundEffect: int): void;
  IsPlaying(soundEffect: int): boolean;
  SetAmbientSound(soundEffect: int, volume: float, pitch: float): void;
  GetAmbientSoundVolume(soundEffect: int): float;
}
