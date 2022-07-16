import { CustomStage } from "../../interfaces/CustomStage";

const v = {
  run: {
    currentCustomStage: null as CustomStage | null,
    showingStreakText: false,
    showingBossVersusScreen: false,
  },
};
export default v;

/** Indexed by custom stage name. */
export const customStagesMap = new Map<string, CustomStage>();

/** Indexed by room variant. */
export const customStageCachedRoomData = new Map<int, Readonly<RoomConfig>>();

/** Indexed by entity ID. */
export const customBossPNGPaths = new Map<
  string,
  [namePNGPath: string, portraitPNGPath: string]
>();
