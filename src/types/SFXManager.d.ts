import { SoundEffect } from "../enums/SoundEffect";

declare global {
  function SFXManager(this: void): SFXManager;

  interface SFXManager {
    AdjustPitch(soundEffect: SoundEffect | int, pitch: float): void;
    AdjustVolume(soundEffect: SoundEffect | int, volume: float): void;
    GetAmbientSoundVolume(soundEffect: SoundEffect | int): float;
    IsPlaying(soundEffect: SoundEffect | int): boolean;

    /**
     * @param soundEffect
     * @param volume Default is 1.
     * @param frameDelay Default is 2.
     * @param loop Default is false.
     * @param pitch Default is 1.
     * @param pan Default is 0.
     */
    Play(
      soundEffect: SoundEffect | int,
      volume?: float,
      frameDelay?: int,
      loop?: boolean,
      pitch?: float,
      pan?: float,
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
}
