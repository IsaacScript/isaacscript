import { PlayerStat } from "../enums/PlayerStat";
import type { PlayerStats } from "../interfaces/PlayerStats";

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
