import { game } from "../cachedClasses";
import { log } from "./log";

/**
 * Whether or not the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 */
export function onSetSeed(): boolean {
  const seeds = game.GetSeeds();
  const customRun = seeds.IsCustomRun();
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.CHALLENGE_NULL && customRun;
}

/**
 * Helper function to restart the game using the console command of "restart". You can optionally
 * specify a `PlayerType` to restart the game as that character.
 */
export function restart(character?: PlayerType): void {
  if (character === undefined) {
    log("Restarting.");
    Isaac.ExecuteCommand("restart");
    return;
  }

  if (character < 0 || character >= PlayerType.NUM_PLAYER_TYPES) {
    error(`Restarting as a character of ${character} would crash the game.`);
  }

  log(`Restarting as character: ${character}`);
  Isaac.ExecuteCommand(`restart ${character}`);
}
