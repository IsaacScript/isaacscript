import {
  CoinSubType,
  CollectibleType,
  TrinketType,
} from "isaac-typescript-definitions";
import { RockAltType } from "../enums/RockAltType";
import { spawnCoinWithSeed, spawnTrinketWithSeed } from "./pickupsSpecific";
import { getRandom } from "./random";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import { spawnCollectible } from "./spawnCollectible";
import { repeat } from "./utils";
import { getRandomVector } from "./vector";

/**
 * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
 * breaks.
 *
 * Note that most of the time, this function will do nothing, similar to how most of the time, when
 * an individual urn is destroyed, nothing will spawn.
 *
 * For the purposes of spawning collectibles, this function assumes that the player has not seen the
 * collectible yet in the current run. In vanilla, it is only possible to get a e.g. Quarter if the
 * collectible still exists in the Treasure Room pool.
 *
 * The logic in this function is based on the rewards listed on the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks
 *
 * @param position The place to spawn the reward.
 * @param rockAltType The type of reward to spawn. For example, `RockAltType.URN` will have a chance
 *                    at spawning coins and spiders.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`. Normally, you
 *                  should pass the `InitSeed` of the grid entity that was broken.
 * @returns Whether or not this function spawned something.
 */
export function spawnRockAltReward(
  position: Vector,
  rockAltType: RockAltType,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): boolean {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);
  const chance = getRandom(rng);

  switch (rockAltType) {
    case RockAltType.URN: {
      let totalChance = 0;

      // Nothing. (68.00%)
      totalChance += 0.68;
      if (chance < totalChance) {
        return false;
      }

      // One random coin. (4.72%)
      totalChance += 0.0472;
      if (chance < totalChance) {
        const velocity = getRandomVector(rng);
        spawnCoinWithSeed(CoinSubType.NULL, position, rng, velocity);
        return true;
      }

      // Two random coins. (4.72%)
      totalChance += 0.0472;
      if (chance < totalChance) {
        repeat(2, () => {
          const velocity = getRandomVector(rng);
          spawnCoinWithSeed(CoinSubType.NULL, position, rng, velocity);
        });
        return true;
      }

      // Swallowed Penny. (2.50%)
      totalChance += 0.025;
      if (chance < totalChance) {
        spawnTrinketWithSeed(TrinketType.SWALLOWED_PENNY, position, rng);
      }

      // A Quarter. (0.50%)
      totalChance += 0.005;
      if (chance < totalChance) {
        spawnCollectible(CollectibleType.QUARTER, position, rng);
      }

      // One spider. (9.74%)
      totalChance += 0.0974;
      if (chance < totalChance) {
        // TODO
      }

      // Two spiders. (9.74%)
      totalChance += 0.0974;
      if (chance < totalChance) {
        /// EntityNPC.ThrowSpider(position, undefined, targetPos, big, yOffset)
      }

      // TODO
      return false;
    }

    case RockAltType.MUSHROOM: {
      // TODO
      return false;
    }

    case RockAltType.SKULL: {
      // TODO
      return false;
    }

    case RockAltType.POLYP: {
      // TODO
      return false;
    }

    case RockAltType.BUCKET: {
      // TODO
      return false;
    }
  }
}
