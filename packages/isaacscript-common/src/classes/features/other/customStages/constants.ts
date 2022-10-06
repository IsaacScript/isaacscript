import { LevelStage, StageType } from "isaac-typescript-definitions";

/** Corresponds to "resources/gfx/ui/ui_streak.anm2". */
export enum UIStreakAnimation {
  NONE,
  TEXT,
  TEXT_STAY,
}

export const CUSTOM_STAGE_FEATURE_NAME = "CustomStage";

export const ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH = "gfx/isaacscript-custom-stage";

export const DEFAULT_BASE_STAGE = LevelStage.BASEMENT_2;
export const DEFAULT_BASE_STAGE_TYPE = StageType.ORIGINAL;

/**
 * Equal to -1. Setting the stage to an invalid stage value is useful in that it prevents backdrops
 * and shadows from loading.
 */
export const CUSTOM_FLOOR_STAGE = -1 as LevelStage;

/**
 * We must use `StageType.WRATH_OF_THE_LAMB` instead of `StageType.ORIGINAL` or else the walls will
 * not render properly. DeadInfinity suspects that this might be because it is trying to use the
 * Dark Room's backdrop (instead of The Chest).
 */
export const CUSTOM_FLOOR_STAGE_TYPE = StageType.WRATH_OF_THE_LAMB;
