import type { StageID } from "isaac-typescript-definitions";

declare global {
  interface RoomConfig extends IsaacAPIClass {
    GetStage: (stbType: StageID.BLUE_WOMB) => void;
    Mode: int;
  }
}
