import type { BackdropType, Music } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface RoomConfigStage extends IsaacAPIClass {
    GetBackdrop: () => BackdropType;
    GetBossSpot: () => string;
    GetDisplayName: () => string;
    GetMusic: () => Music;
    GetPlayerSpot: () => string;
    GetSuffix: () => string;
    SetBackdrop: (backdrop: BackdropType) => void;
    SetBossSpot: (bossSpot: string) => void;
    SetDisplayName: (name: string) => void;
    SetMusic: (music: Music) => void;
    SetPlayerSpot: (playerSpot: string) => void;
    SetSuffix: (suffix: string) => void;
  }
}
