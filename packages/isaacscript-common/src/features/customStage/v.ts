import { ControllerIndex } from "isaac-typescript-definitions";
import { CustomStage } from "../../interfaces/CustomStage";

const v = {
  run: {
    currentCustomStage: null as CustomStage | null,
    showingBossVersusScreen: false,

    /** Values are the render frame that the controller first pressed the map button. */
    controllerIndexPushingMapRenderFrame: new Map<ControllerIndex, int>(),

    topStreakTextStartedRenderFrame: null as int | null,
  },

  room: {
    showingShadows: false,
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
