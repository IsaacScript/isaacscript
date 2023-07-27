import type { ControllerIndex } from "isaac-typescript-definitions";
import { UIStreakAnimation } from "../../../../enums/private/UIStreakAnimation";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";

// This is registered in "CustomStages.ts".
// eslint-disable-next-line isaacscript/require-v-registration
export const v = {
  run: {
    currentCustomStage: null as CustomStage | null,

    /** Whether we are on e.g. Caves 1 or Caves 2. */
    firstFloor: true,

    showingBossVersusScreen: false,

    /** Values are the render frame that the controller first pressed the map button. */
    controllerIndexPushingMapRenderFrame: new Map<ControllerIndex, int>(),

    topStreakTextStartedRenderFrame: null as int | null,

    topStreakText: {
      animation: UIStreakAnimation.NONE,
      frame: 0,
      pauseFrame: false,
    },

    bottomStreakText: {
      animation: UIStreakAnimation.NONE,
      frame: 0,
      pauseFrame: false,
    },
  },
};
