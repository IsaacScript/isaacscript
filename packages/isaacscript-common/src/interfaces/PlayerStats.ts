import type { TearFlag } from "isaac-typescript-definitions";
import type { PlayerStat } from "../enums/PlayerStat";
import { interfaceSatisfiesEnum } from "../functions/enums";

/**
 * Contains every player stat along with its corresponding data type. For example, `StatType.DAMAGE`
 * is a `float` type.
 */
export interface PlayerStats {
  readonly [PlayerStat.DAMAGE]: float;
  readonly [PlayerStat.FIRE_DELAY]: float;
  readonly [PlayerStat.SHOT_SPEED]: float;
  readonly [PlayerStat.TEAR_HEIGHT]: float;
  readonly [PlayerStat.TEAR_RANGE]: float;
  readonly [PlayerStat.TEAR_FALLING_ACCELERATION]: float;
  readonly [PlayerStat.TEAR_FALLING_SPEED]: float;
  readonly [PlayerStat.MOVE_SPEED]: float;
  readonly [PlayerStat.TEAR_FLAG]: Readonly<BitFlags<TearFlag>>;
  readonly [PlayerStat.TEAR_COLOR]: Readonly<Color>;
  readonly [PlayerStat.FLYING]: boolean;
  readonly [PlayerStat.LUCK]: float;
  readonly [PlayerStat.SIZE]: Readonly<Vector>;
}

interfaceSatisfiesEnum<PlayerStats, PlayerStat>();
