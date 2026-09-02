import type { Music } from "../../enums/Music";

declare global {
  interface MusicManager extends IsaacAPIClass {
    /**
     * @param music
     * @param fadeRate Default is 0.08.
     */
    readonly Crossfade: (music: Music, fadeRate?: float) => void;

    readonly Disable: () => void;

    /** @param layerID Default is 0. */
    readonly DisableLayer: (layerID?: int) => void;

    readonly Enable: () => void;

    /**
     * @param layerID Default is 0.
     * @param instant Default is false.
     */
    readonly EnableLayer: (layerID?: int, instant?: boolean) => void;

    /**
     * @param music
     * @param volume Default is 1.
     * @param fadeRate Default is 0.08.
     */
    readonly Fadein: (music: Music, volume?: float, fadeRate?: float) => void;

    /** @param fadeRate Default is 0.08. */
    readonly Fadeout: (fadeRate?: float) => void;

    readonly GetCurrentMusicID: () => Music;
    readonly GetQueuedMusicID: () => Music;
    readonly IsEnabled: () => boolean;

    /** @param layerID Default is 0. */
    readonly IsLayerEnabled: (layerID?: int) => boolean;

    readonly Pause: () => void;
    readonly PitchSlide: (targetPitch: float) => void;

    /**
     * You should always call the `MusicManager.UpdateVolume` method after using `MusicManager.Play`
     * in order to get the music to play at the correct volume. Alternatively, you can use the
     * `MusicManager.Crossfade` method, which will keep the current volume.
     *
     * @param music
     * @param volume Optional. Default is 1.
     */
    readonly Play: (music: Music, volume?: float) => void;

    readonly Queue: (music: Music) => void;
    readonly ResetPitch: () => void;
    readonly Resume: () => void;
    readonly UpdateVolume: () => void;

    /**
     * @param targetVolume
     * @param fadeRate Default is 0.08.
     */
    readonly VolumeSlide: (targetVolume: float, fadeRate?: float) => void;
  }

  function MusicManager(this: void): MusicManager;
}
