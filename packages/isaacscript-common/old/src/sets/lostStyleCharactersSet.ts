import { PlayerType } from "isaac-typescript-definitions";

/**
 * This is the set of characters that look like The Lost and play the "LostDeath" animation when
 * they die.
 */
export const LOST_STYLE_CHARACTERS_SET: ReadonlySet<PlayerType> = new Set([
  PlayerType.THE_LOST, // 10
  PlayerType.THE_SOUL, // 17
  PlayerType.THE_LOST_B, // 31
  PlayerType.JACOB_2_B, // 39
  PlayerType.THE_SOUL_B, // 40
]);
