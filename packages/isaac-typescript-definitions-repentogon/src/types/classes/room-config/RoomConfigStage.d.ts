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
    GetBackdrop: () => BackdropType;

    /** Returns the sprite path for the boss spot used in the boss intro. */
    GetBossSpot: () => string;

    /** Returns the stage's name. */
    GetDisplayName: () => string;

    /** Returns the stage's `StageID`. */
    GetID: () => StageID;

    /** Returns the music that is played in default rooms. */
    GetMusic: () => Music;

    /**
     * Returns the sprite path for the player spot used in the boss intro and nightmare transition.
     */
    GetPlayerSpot: () => string;

    /** Returns a `RoomConfigSet`, which contains every `RoomConfig` in the stage. */
    GetRoomSet: (gameMode: GameMode) => RoomConfigSet;

    /** Returns the suffix used by the stage for stage-unique sprites. */
    GetSuffix: () => string;

    /** Returns the name of the stage's rooms XML file. */
    GetXMLName: () => string;

    /** Returns whether the `RoomConfigSet` of the provided `GameMode` has loaded. */
    IsLoaded: (gameMode: GameMode) => boolean;

    /** Sets the backdrop used in default rooms. */
    SetBackdrop: (backdrop: BackdropType) => void;

    /** Sets the sprite path for the boss spot used in the boss intro. */
    SetBossSpot: (spritePath: string) => void;

    /** Sets the stage's display name. */
    SetDisplayName: (name: string) => void;

    /** Sets the music used in default rooms. */
    SetMusic: (music: Music) => void;

    /** Sets the sprite path for the player spot used in the boss intro and nightmare transition. */
    SetPlayerSpot: (playerSpot: string) => void;

    /** Sets the suffix used by the stage for stage-unique sprites. */
    SetSuffix: (suffix: string) => void;

    /** Sets the name of the stage's rooms XML file. */
    SetXMLName: (name: string) => void;
  }
}
