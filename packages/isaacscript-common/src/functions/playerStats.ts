import { StatType } from "../enums/StatType";
import { StatTypeType } from "../interfaces/StatTypeType";

/** Helper function to get the stat for a player corresponding to the `StatType`. */
export function getPlayerStat<T extends StatType>(
  player: EntityPlayer,
  statType: T,
): StatTypeType[T] {
  // We can't use a switch statement here because control-flow based type analysis does not apply to
  // generic type parameters.
  return {
    [StatType.DAMAGE]: player.Damage, // 1 << 0
    [StatType.FIRE_DELAY]: player.MaxFireDelay, // 1 << 1
    [StatType.SHOT_SPEED]: player.ShotSpeed, // 1 << 2
    [StatType.TEAR_HEIGHT]: player.TearHeight, // 1 << 3
    [StatType.TEAR_RANGE]: player.TearRange, // 1 << 3
    [StatType.TEAR_FALLING_ACCELERATION]: player.TearFallingAcceleration, // 1 << 3
    [StatType.TEAR_FALLING_SPEED]: player.TearFallingSpeed, // 1 << 3
    [StatType.MOVE_SPEED]: player.MoveSpeed, // 1 << 4
    [StatType.TEAR_FLAG]: player.TearFlags, // 1 << 5
    [StatType.TEAR_COLOR]: player.TearColor, // 1 << 6
    [StatType.FLYING]: player.CanFly, // 1 << 7
    [StatType.LUCK]: player.Luck, // 1 << 10
    [StatType.SIZE]: player.SpriteScale, // 1 << 11
  }[statType];
}
