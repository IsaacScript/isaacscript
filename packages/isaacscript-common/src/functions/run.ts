import type { PlayerType } from "isaac-typescript-definitions";
import {
  Challenge,
  Difficulty,
  SeedEffect,
  SlotVariant,
} from "isaac-typescript-definitions";
import { SEED_EFFECTS } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { VectorZero } from "../core/constants";
import { FIRST_CHARACTER } from "../core/constantsFirstLast";
import { getCharacterName } from "./characters";
import { spawnSlot } from "./entitiesSpecific";
import { log } from "./log";

/** Alias for the `anySeedEffectEnabled` function. */
export function anyEasterEggEnabled(): boolean {
  return anySeedEffectEnabled();
}

/**
 * Helper function to see if any seed effects (i.e. Easter Eggs) are enabled for the current run.
 */
export function anySeedEffectEnabled(): boolean {
  const seeds = game.GetSeeds();
  const numSeedEffects = seeds.CountSeedEffects();

  return numSeedEffects > 0;
}

/**
 * Helper function to see if the current run can unlock achievements. For example, if playing on a
 * set seed or in a victory lap, achievements are disabled.
 *
 * Under the hood, this is determined by spawning a Greed Donation Machine and then seeing if it
 * exists before removing it.
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
 * Helper function to get the seed effects (i.e. Easter Eggs) that are enabled for the current run.
 */
export function getSeedEffects(): SeedEffect[] {
  const seeds = game.GetSeeds();

  return SEED_EFFECTS.filter(
    (seedEffect) =>
      seedEffect !== SeedEffect.NORMAL && seeds.HasSeedEffect(seedEffect),
  );
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
 * Whether the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 *
 * Under the hood, this checks if the current challenge is `Challenge.NULL` and the
 * `Seeds.IsCustomRun` method.
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
  const characterName = getCharacterName(character);
  log(
    `Restarting the run as ${characterName} (${character}) with a console command of: ${command}`,
  );
  Isaac.ExecuteCommand(command);
}

/**
 * Helper function to change the run status to that of an unseeded run with a new random seed.
 *
 * This is useful to revert the behavior where playing on a set and restarting the game will not
 * take you to a new seed.
 *
 * Under the hood, this function calls the `Seeds.Reset` method and the
 * `Seeds.Restart(Challenge.NULL)` method.
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
