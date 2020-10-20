declare class SFXManager {
  Play(
    soundEffect: SoundEffect,
    volume: float,
    frameDelay: int,
    loop: boolean,
    pitch: float,
  ): void;
  AdjustVolume(soundEffect: SoundEffect, volume: float): void;
  AdjustPitch(soundEffect: SoundEffect, pitch: float): void;
  Stop(soundEffect: SoundEffect): void;
  StopLoopingSounds(): void;
  Preload(soundEffect: SoundEffect): void;
  IsPlaying(soundEffect: SoundEffect): boolean;
  SetAmbientSound(soundEffect: SoundEffect, volume: float, pitch: float): void;
  GetAmbientSoundVolume(soundEffect: SoundEffect): float;
}
