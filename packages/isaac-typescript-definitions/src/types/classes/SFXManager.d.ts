import type { SoundEffect } from "../../enums/SoundEffect";

declare global {
  interface SFXManager extends IsaacAPIClass {
    readonly AdjustPitch: (soundEffect: SoundEffect, pitch: float) => void;
    readonly AdjustVolume: (soundEffect: SoundEffect, volume: float) => void;
    readonly GetAmbientSoundVolume: (soundEffect: SoundEffect) => float;
    readonly IsPlaying: (soundEffect: SoundEffect) => boolean;

    /**
     * @param soundEffect
     * @param volume Default is 1.
     * @param frameDelay Default is 2.
     * @param loop Default is false.
     * @param pitch Default is 1.
     * @param pan Default is 0.
     */
    readonly Play: (
      soundEffect: SoundEffect,
      volume?: float,
      frameDelay?: int,
      loop?: boolean,
      pitch?: float,
      pan?: float,
    ) => void;

    readonly Preload: (soundEffect: SoundEffect) => void;

    readonly SetAmbientSound: (
      soundEffect: SoundEffect,
      volume: float,
      pitch: float,
    ) => void;

    readonly Stop: (soundEffect: SoundEffect) => void;
    readonly StopLoopingSounds: () => void;
  }

  function SFXManager(this: void): SFXManager;
}
