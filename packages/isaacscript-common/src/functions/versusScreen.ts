import type { BossID, PlayerType } from "isaac-typescript-definitions";
import { BOSS_NAME_PNG_FILE_NAMES } from "../objects/bossNamePNGFileNames";
import { BOSS_PORTRAIT_PNG_FILE_NAMES } from "../objects/bossPortraitPNGFileNames";
import { PLAYER_NAME_PNG_FILE_NAMES } from "../objects/playerNamePNGFileNames";
import { PLAYER_PORTRAIT_PNG_FILE_NAMES } from "../objects/playerPortraitPNGFileNames";

/** Most of the PNG files related to the versus screen are located in this directory. */
const PNG_PATH_PREFIX = "gfx/ui/boss";

/**
 * Player portraits are not located in the same directory as everything else, since they are re-used
 * from the animation where the player travels to a new stage.
 */
const PLAYER_PORTRAIT_PNG_PATH_PREFIX = "gfx/ui/stage";

/**
 * Helper function to get the path to the name file that corresponds to the graphic shown on the
 * versus screen for the particular boss.
 *
 * For example, the file path for `BossID.MONSTRO` is "gfx/ui/boss/bossname_20.0_monstro.png".
 */
export function getBossNamePNGFilePath(bossID: BossID): string {
  const fileName = BOSS_NAME_PNG_FILE_NAMES[bossID];
  return `${PNG_PATH_PREFIX}/${fileName}`;
}

/**
 * Helper function to get the path to the portrait file that corresponds to the graphic shown on the
 * versus screen for the particular boss.
 *
 * For example, the file path for `BossID.MONSTRO` is "gfx/ui/boss/portrait_20.0_monstro.png".
 */
export function getBossPortraitPNGFilePath(bossID: BossID): string {
  const fileName = BOSS_PORTRAIT_PNG_FILE_NAMES[bossID];
  return `${PNG_PATH_PREFIX}/${fileName}`;
}

/**
 * Helper function to get the path to the name file that corresponds to the graphic shown on the
 * versus screen for the particular character.
 *
 * For example, the file path for `PlayerType.ISAAC` is "gfx/ui/boss/playername_01_isaac.png".
 */
export function getCharacterNamePNGFilePath(character: PlayerType): string {
  const fileName = PLAYER_NAME_PNG_FILE_NAMES[character];
  return `${PNG_PATH_PREFIX}/${fileName}`;
}

/**
 * Helper function to get the path to the portrait file that corresponds to the graphic shown on the
 * versus screen for the particular character.
 *
 * For example, the file path for `PlayerType.ISAAC` is "gfx/ui/boss/playerportrait_isaac.png".
 */
export function getCharacterPortraitPNGFilePath(character: PlayerType): string {
  const fileName = PLAYER_PORTRAIT_PNG_FILE_NAMES[character];
  return `${PLAYER_PORTRAIT_PNG_PATH_PREFIX}/${fileName}`;
}
