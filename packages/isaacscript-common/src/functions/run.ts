import {
  Challenge,
  Difficulty,
  PlayerType,
  SlotVariant,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { VectorZero } from "../core/constants";
import { FIRST_CHARACTER } from "../core/constantsFirstLast";
import { spawnSlot } from "./entitiesSpecific";
import { log } from "./log";

/**
 * Helper function to see if the current run can unlock achievements. For example, if playing on a
 * set seed or in a victory lap, achievements are disabled.
 */
export function canRunUnlockAchievements(): boolean {
  const greedDonationMachine = spawnSlot(
    SlotVariant.GREED_DONATION_MACHINE,
    0,
    VectorZero,
  );
  const canUnlockAchievements = greedDonationMachine.Exists();
  greedDonationMachine.Remove();

  return canUnlockAchievements;
}

/**
 * Helper function to check if the difficulty of the current run is equal to `Difficulty.GREED` or
 * `Difficulty.GREEDIER`.
 */
export function isGreedMode(): boolean {
  return (
    game.Difficulty === Difficulty.GREED ||
    game.Difficulty === Difficulty.GREEDIER
  );
}

/**
 * Whether or not the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 */
export function onSetSeed(): boolean {
  const seeds = game.GetSeeds();
  const customRun = seeds.IsCustomRun();
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.NULL && customRun;
}

/**
 * Helper function to restart the run using the console command of "restart". If the player is
 * playing a seeded run, then it will restart the game to the beginning of the seed. Otherwise, it
 * will put the player on a run with an entirely new seed.
 *
 * You can optionally specify a `PlayerType` to restart the game as that character.
 */
export function restart(character?: PlayerType): void {
  if (character === undefined) {
    const command = "restart";
    log(`Restarting the run with a console command of: ${command}`);
    Isaac.ExecuteCommand(command);
    return;
  }

  if (character < FIRST_CHARACTER) {
    error(`Restarting as a character of ${character} would crash the game.`);
  }

  const command = `restart ${character}`;
  log(
    `Restarting the run as PlayerType.${PlayerType[character]} (${character}) with a console command of: ${command}`,
  );
  Isaac.ExecuteCommand(command);
}

/**
 * Helper function to change the run status to that of an unseeded run with a new random seed.
 *
 * This is useful to revert the behavior where playing on a set and restarting the game will not
 * take you to a new seed.
 */
export function setUnseeded(): void {
  const seeds = game.GetSeeds();

  // Invoking the `Seeds.Reset` method will cause the start seed to be set to 0. Subsequently, the
  // `Seeds.GetStartSeed` method will return 0, and can cause crashes (due to RNG objects not being
  // able to handle a seed of 0). It also causes the log to be spammed with: "[ASSERT] - Error: Game
  // Start Seed was not set." Thus, we must immediately re-initialize the game start seed by using
  // the `Seeds.Restart` method.
  seeds.Reset();
  seeds.Restart(Challenge.NULL);
}
