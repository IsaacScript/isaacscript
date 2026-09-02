import type { Music } from "isaac-typescript-definitions";

declare global {
  interface MusicManager extends IsaacAPIClass {
    /** Returns the current pitch of the music. */
    readonly GetCurrentPitch: () => number;

    /** Plays a jingle. */
    readonly PlayJingle: (jingle: Music, duration: int) => void;

    /** Sets the pitch of the music. */
    readonly SetCurrentPitch: (pitch: float) => void;

    /** Stops the currently playing jingle. */
    readonly StopJingle: () => void;
  }

  function MusicManager(this: void): MusicManager;
}
