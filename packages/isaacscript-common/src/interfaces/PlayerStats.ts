import type { TearFlag } from "isaac-typescript-definitions";
import type { PlayerStat } from "../enums/PlayerStat";
import { interfaceSatisfiesEnum } from "../functions/enums";

/**
 * Contains every player stat along with its corresponding data type. For example, `StatType.DAMAGE`
 * is a `float` type.
 */
export interface PlayerStats {
  [PlayerStat.DAMAGE]: float;
  [PlayerStat.FIRE_DELAY]: float;
  [PlayerStat.SHOT_SPEED]: float;
  [PlayerStat.TEAR_HEIGHT]: float;
  [PlayerStat.TEAR_RANGE]: float;
  [PlayerStat.TEAR_FALLING_ACCELERATION]: float;
  [PlayerStat.TEAR_FALLING_SPEED]: float;
  [PlayerStat.MOVE_SPEED]: float;
  [PlayerStat.TEAR_FLAG]: BitFlags<TearFlag>;
  [PlayerStat.TEAR_COLOR]: Color;
  [PlayerStat.FLYING]: boolean;
  [PlayerStat.LUCK]: float;
  [PlayerStat.SIZE]: Vector;
}

interfaceSatisfiesEnum<PlayerStats, PlayerStat>();
