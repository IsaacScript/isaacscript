import { PlayerType } from "isaac-typescript-definitions";

/**
 * This is the set of characters that look like The Lost and play the "LostDeath" animation when
 * they die.
 */
export const LOST_STYLE_CHARACTERS_SET: ReadonlySet<PlayerType> = new Set([
  PlayerType.LOST, // 10
  PlayerType.SOUL, // 17
  PlayerType.LOST_B, // 31
  PlayerType.JACOB_2_B, // 39
  PlayerType.SOUL_B, // 40
]);
