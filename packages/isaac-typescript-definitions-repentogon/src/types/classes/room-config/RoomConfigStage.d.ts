import type {
  BackdropType,
  Music,
  StageID,
} from "isaac-typescript-definitions";
import type { GameMode } from "../../../enums/GameMode";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface RoomConfigStage extends IsaacAPIClass {
    /** Returns the `BackdropType` used in default rooms. */
    readonly GetBackdrop: () => BackdropType;

    /** Returns the sprite path for the boss spot used in the boss intro. */
    readonly GetBossSpot: () => string;

    /** Returns the stage's name. */
    readonly GetDisplayName: () => string;

    /** Returns the stage's `StageID`. */
    readonly GetID: () => StageID;

    /** Returns the music that is played in default rooms. */
    readonly GetMusic: () => Music;

    /**
     * Returns the sprite path for the player spot used in the boss intro and nightmare transition.
     */
    readonly GetPlayerSpot: () => string;

    /** Returns a `RoomConfigSet`, which contains every `RoomConfig` in the stage. */
    readonly GetRoomSet: (gameMode: GameMode) => RoomConfigSet;

    /** Returns the suffix used by the stage for stage-unique sprites. */
    readonly GetSuffix: () => string;

    /** Returns the name of the stage's rooms XML file. */
    readonly GetXMLName: () => string;

    /** Returns whether the `RoomConfigSet` of the provided `GameMode` has loaded. */
    readonly IsLoaded: (gameMode: GameMode) => boolean;

    /** Sets the backdrop used in default rooms. */
    readonly SetBackdrop: (backdrop: BackdropType) => void;

    /** Sets the sprite path for the boss spot used in the boss intro. */
    readonly SetBossSpot: (spritePath: string) => void;

    /** Sets the stage's display name. */
    readonly SetDisplayName: (name: string) => void;

    /** Sets the music used in default rooms. */
    readonly SetMusic: (music: Music) => void;

    /** Sets the sprite path for the player spot used in the boss intro and nightmare transition. */
    readonly SetPlayerSpot: (playerSpot: string) => void;

    /** Sets the suffix used by the stage for stage-unique sprites. */
    readonly SetSuffix: (suffix: string) => void;

    /** Sets the name of the stage's rooms XML file. */
    readonly SetXMLName: (name: string) => void;
  }
}
