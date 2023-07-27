import type { GridEntityType } from "isaac-typescript-definitions";

export const GridEntityTypeCustom = {
  /**
   * We arbitrarily choose 1000 as to not conflict with end-user mods. (The expectation is that
   * end-user mods will begin their enums with values of 0 and increment upwards.)
   */
  TRAPDOOR_CUSTOM: 1000 as GridEntityType,
} as const;
