import { GridEntityType } from "isaac-typescript-definitions";

export const CUSTOM_TRAPDOOR_FEATURE_NAME = "customTrapdoor";

/** This also applies to crawl spaces. The value was determined through trial and error. */
export const TRAPDOOR_OPEN_DISTANCE = 60;

export const TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS = TRAPDOOR_OPEN_DISTANCE * 2.5;
export const TRAPDOOR_BOSS_REACTION_FRAMES = 30;

export const GridEntityTypeCustom = {
  TRAPDOOR_CUSTOM: 1000 as GridEntityType,
} as const;
