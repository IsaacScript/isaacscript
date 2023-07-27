import type { SoundEffect } from "../../enums/SoundEffect";

declare global {
  function SFXManager(this: void): SFXManager;

  interface SFXManager extends IsaacAPIClass {
    AdjustPitch: (soundEffect: SoundEffect, pitch: float) => void;
    AdjustVolume: (soundEffect: SoundEffect, volume: float) => void;
    GetAmbientSoundVolume: (soundEffect: SoundEffect) => float;
    IsPlaying: (soundEffect: SoundEffect) => boolean;

    /**
     * @param soundEffect
     * @param volume Default is 1.
     * @param frameDelay Default is 2.
     * @param loop Default is false.
     * @param pitch Default is 1.
     * @param pan Default is 0.
     */
    Play: (
      soundEffect: SoundEffect,
      volume?: float,
      frameDelay?: int,
      loop?: boolean,
      pitch?: float,
      pan?: float,
    ) => void;

    Preload: (soundEffect: SoundEffect) => void;

    SetAmbientSound: (
      soundEffect: SoundEffect,
      volume: float,
      pitch: float,
    ) => void;

    Stop: (soundEffect: SoundEffect) => void;
    StopLoopingSounds: () => void;
  }
}
