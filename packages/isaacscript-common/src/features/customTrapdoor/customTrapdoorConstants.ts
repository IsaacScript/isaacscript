import { GridEntityType } from "isaac-typescript-definitions";

export const CUSTOM_TRAPDOOR_FEATURE_NAME = "customTrapdoor";

export const GridEntityTypeCustom = {
  TRAPDOOR_CUSTOM: 1000 as GridEntityType,
} as const;

/** This also applies to crawl spaces. The value was determined through trial and error. */
export const TRAPDOOR_OPEN_DISTANCE = 60;

export const TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS = TRAPDOOR_OPEN_DISTANCE * 2.5;
export const TRAPDOOR_BOSS_REACTION_FRAMES = 30;

export const TRAPDOOR_TOUCH_DISTANCE = 16.5;

export const ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL: ReadonlySet<string> =
  new Set(["Happy", "Sad", "Jump"]);

export const PIXELATION_TO_BLACK_FRAMES = 52;

export const OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES = 10;
export const OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES = 4;
