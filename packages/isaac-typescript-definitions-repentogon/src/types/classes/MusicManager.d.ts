import type { Music } from "isaac-typescript-definitions";

declare global {
  function MusicManager(this: void): MusicManager;

  interface MusicManager extends IsaacAPIClass {
    /** Returns the current pitch of the music. */
    GetCurrentPitch: () => number;

    /** Plays a jingle. */
    PlayJingle: (jingle: Music, duration: int) => void;

    /** Sets the pitch of the music. */
    SetCurrentPitch: (pitch: float) => void;

    /** Stops the currently playing jingle. */
    StopJingle: () => void;
  }
}
