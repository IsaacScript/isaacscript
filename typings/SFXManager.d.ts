declare function SFXManager(this: void): SFXManager;

declare class SFXManager {
  AdjustPitch(soundEffect: SoundEffect | int, pitch: float): void;
  AdjustVolume(soundEffect: SoundEffect | int, volume: float): void;
  GetAmbientSoundVolume(soundEffect: SoundEffect | int): float;
  IsPlaying(soundEffect: SoundEffect | int): boolean;
  Play(
    soundEffect: SoundEffect | int,
    volume?: float, // Default is 1
    frameDelay?: int, // Default is 2
    loop?: boolean, // Default is false
    pitch?: float, // Default is 1
    pan?: float, // Default is 0
  ): void;
  Preload(soundEffect: SoundEffect | int): void;
  SetAmbientSound(
    soundEffect: SoundEffect | int,
    volume: float,
    pitch: float,
  ): void;
  Stop(soundEffect: SoundEffect | int): void;
  StopLoopingSounds(): void;
}
