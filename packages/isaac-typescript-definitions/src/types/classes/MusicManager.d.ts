import type { Music } from "../../enums/Music";

declare global {
  function MusicManager(this: void): MusicManager;

  interface MusicManager extends IsaacAPIClass {
    /**
     * @param music
     * @param fadeRate Default is 0.08.
     */
    Crossfade: (music: Music, fadeRate?: float) => void;

    Disable: () => void;

    /** @param layerID Default is 0. */
    DisableLayer: (layerID?: int) => void;

    Enable: () => void;

    /**
     * @param layerID Default is 0.
     * @param instant Default is false.
     */
    EnableLayer: (layerID?: int, instant?: boolean) => void;

    /**
     * @param music
     * @param volume Default is 1.
     * @param fadeRate Default is 0.08.
     */
    Fadein: (music: Music, volume?: float, fadeRate?: float) => void;

    /** @param fadeRate Default is 0.08. */
    Fadeout: (fadeRate?: float) => void;

    GetCurrentMusicID: () => Music;
    GetQueuedMusicID: () => Music;
    IsEnabled: () => boolean;

    /** @param layerID Default is 0. */
    IsLayerEnabled: (layerID?: int) => boolean;

    Pause: () => void;
    PitchSlide: (targetPitch: float) => void;

    /**
     * You should always call the `MusicManager.UpdateVolume` method after using `MusicManager.Play`
     * in order to get the music to play at the correct volume. Alternatively, you can use the
     * `MusicManager.Crossfade` method, which will keep the current volume.
     *
     * @param music
     * @param volume Optional. Default is 1.
     */
    Play: (music: Music, volume?: float) => void;

    Queue: (music: Music) => void;
    ResetPitch: () => void;
    Resume: () => void;
    UpdateVolume: () => void;

    /**
     * @param targetVolume
     * @param fadeRate Default is 0.08.
     */
    VolumeSlide: (targetVolume: float, fadeRate?: float) => void;
  }
}
