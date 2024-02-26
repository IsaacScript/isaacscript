import { CacheFlag } from "isaac-typescript-definitions";
import { PlayerStat } from "../enums/PlayerStat";
import type { PlayerStats } from "../interfaces/PlayerStats";
import { DEFAULT_PLAYER_STAT_MAP } from "../maps/defaultPlayerStatMap";
import { ReadonlySet } from "../types/ReadonlySet";
import { addTearsStat } from "./tears";

const STAT_CACHE_FLAGS_SET = new ReadonlySet<CacheFlag>([
  CacheFlag.DAMAGE, // 1 << 0
  CacheFlag.FIRE_DELAY, // 1 << 1
  CacheFlag.SHOT_SPEED, // 1 << 2
  CacheFlag.RANGE, // 1 << 3
  CacheFlag.SPEED, // 1 << 4
  CacheFlag.LUCK, // 1 << 10
]);

/**
 * Helper function to add a stat to a player based on the `CacheFlag` provided. Call this function
 * from the `EVALUATE_CACHE` callback.
 *
 * Note that for `CacheFlag.FIRE_DELAY`, the "amount" argument will be interpreted as the tear stat
 * to add (and not the amount to mutate `EntityPlayer.MaxFireDelay` by).
 *
 * This function supports the following cache flags:
 * - CacheFlag.DAMAGE (1 << 0)
 * - CacheFlag.FIRE_DELAY (1 << 1)
 * - CacheFlag.SHOT_SPEED (1 << 2)
 * - CacheFlag.RANGE (1 << 3)
 * - CacheFlag.SPEED (1 << 4)
 * - CacheFlag.LUCK (1 << 10)
 */
export function addPlayerStat(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
  amount: number,
): void {
  if (!STAT_CACHE_FLAGS_SET.has(cacheFlag)) {
    error(
      `You cannot add a stat to a player with the cache flag of: ${cacheFlag}`,
    );
  }

  switch (cacheFlag) {
    // 1 << 0
    case CacheFlag.DAMAGE: {
      player.Damage += amount;
      break;
    }

    // 1 << 1
    case CacheFlag.FIRE_DELAY: {
      addTearsStat(player, amount);
      break;
    }

    // 1 << 2
    case CacheFlag.SHOT_SPEED: {
      player.ShotSpeed += amount;
      break;
    }

    // 1 << 3
    case CacheFlag.RANGE: {
      player.TearHeight += amount;
      break;
    }

    // 1 << 4
    case CacheFlag.SPEED: {
      player.MoveSpeed += amount;
      break;
    }

    // 1 << 10
    case CacheFlag.LUCK: {
      player.Luck += amount;
      break;
    }

    default: {
      break;
    }
  }
}

/**
 * Returns the starting stat that Isaac (the default character) starts with. For example, if you
 * pass this function `CacheFlag.DAMAGE`, it will return 3.5.
 *
 * Note that the default fire delay is represented in the tear stat, not the `MaxFireDelay` value.
 */
export function getDefaultPlayerStat(cacheFlag: CacheFlag): number | undefined {
  return DEFAULT_PLAYER_STAT_MAP.get(cacheFlag);
}

/** Helper function to get the stat for a player corresponding to the `StatType`. */
export function getPlayerStat<T extends PlayerStat>(
  player: EntityPlayer,
  playerStat: T,
): PlayerStats[T] {
  const playerStats = getPlayerStats(player);
  return playerStats[playerStat];
}

/** Helper function to get all of the stat for a player. */
export function getPlayerStats(player: EntityPlayer): PlayerStats {
  return {
    [PlayerStat.DAMAGE]: player.Damage, // 1 << 0
    [PlayerStat.FIRE_DELAY]: player.MaxFireDelay, // 1 << 1
    [PlayerStat.SHOT_SPEED]: player.ShotSpeed, // 1 << 2
    [PlayerStat.TEAR_HEIGHT]: player.TearHeight, // 1 << 3
    [PlayerStat.TEAR_RANGE]: player.TearRange, // 1 << 3
    [PlayerStat.TEAR_FALLING_ACCELERATION]: player.TearFallingAcceleration, // 1 << 3
    [PlayerStat.TEAR_FALLING_SPEED]: player.TearFallingSpeed, // 1 << 3
    [PlayerStat.MOVE_SPEED]: player.MoveSpeed, // 1 << 4
    [PlayerStat.TEAR_FLAG]: player.TearFlags, // 1 << 5
    [PlayerStat.TEAR_COLOR]: player.TearColor, // 1 << 6
    [PlayerStat.FLYING]: player.CanFly, // 1 << 7
    [PlayerStat.LUCK]: player.Luck, // 1 << 10
    [PlayerStat.SIZE]: player.SpriteScale, // 1 << 11
  };
}
