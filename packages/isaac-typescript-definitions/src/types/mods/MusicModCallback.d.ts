import type { Music } from "../../enums/Music";

declare global {
  const MMC: MusicModCallback | undefined;

  /** @noSelf */
  interface MusicModCallback {
    /**
     * Adds a callback to be triggered whenever a track is about to play. Used for changing music.
     *
     * @param mod The `Mod` object of your mod.
     * @param callback A function that is called every time a track is about to play. The function
     *                 should return one of the following:
     * - a track ID to play that instead
     * - a LuaMultiReturn<[jingleID: Music, trackID: Music]> to play a jingle and queue the track
     * - 0 to prevent the track from playing, and allow the current one to continue
     * - -1 to stop all music
     * - undefined to continue to internal code
     * @param tracks The tracks that will trigger your function call. If this argument is omitted,
     *               all music changes will trigger this callback.
     */
    AddMusicCallback: (
      mod: Mod,
      callback: (
        id: Music,
      ) =>
        | Music
        | LuaMultiReturn<[jingleID: Music, trackID: Music]>
        | number
        | undefined,
      ...tracks: readonly Music[]
    ) => void;

    /**
     * @returns The ID of the intended boss room entry music for this room (e.g. Satan, Mom). If not
     *          in a boss room, it will simply return one of the two generic themes.
     */
    GetBossTrack: () => Music;

    /**
     * @returns Either the ID of the current room's music, or a `LuaMultiReturn` containing the
     *          current jingle's ID and the current room's track ID.
     *
     * WARNING: Using this in an uncleared boss room will return ONLY the boss jingle. If you want
     * the intended boss music, use the `GetBossTrack` method.
     */
    GetMusicTrack: () => LuaMultiReturn<
      [currentRoomMusicOrJingle: Music, currentRoomMusic?: Music]
    >;

    GetStageTrack: () => Music;
    InCustomStage: () => boolean;

    /**
     * @returns A table that behaves identically to the MusicManager class, except that it will call
     *          all mod callbacks. Useful if you want to allow others to change the music of your
     *          custom room or stage with Music API.
     */
    Manager: () => MusicManager;

    /**
     * This will remove all callbacks associated with the mod.
     *
     * @param mod The mod object that you created with RegisterMod.
     */
    RemoveMusicCallback: (mod: Mod) => void;

    /**
     * True if music layers are disabled in favour of a mod that does not allow them. False by
     * default.
     *
     * Change to true if your mod does not support layers.
     *
     * This is not associated with the `MusicManager.DisableLayer` method. It takes priority if
     * true.
     */
    DisableMusicLayers: boolean;

    /** This variable is true if the mod has fully loaded. False otherwise. */
    Initialised: boolean; // cspell:ignore Initialised

    /**
     * The current version of the API. You can check that the right version is installed with your
     * mod, as there is a slight possibility that future versions will not be backwards compatible.
     * The mod version in metadata may not match this.
     */
    Version: string;
  }
}
