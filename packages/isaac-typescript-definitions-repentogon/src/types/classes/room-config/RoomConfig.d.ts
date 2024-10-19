import type { StageID } from "isaac-typescript-definitions";

declare global {
  interface RoomConfig extends IsaacAPIClass {
    Mode: int;
  }

  /** @noSelf */
  namespace RoomConfig {
    function GetStage(stbType: StageID): RoomConfigStage;
  }
}
