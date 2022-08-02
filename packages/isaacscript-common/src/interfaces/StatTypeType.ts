import { TearFlag } from "isaac-typescript-definitions";
import { StatType } from "../enums/StatType";

/**
 * This is an interface mapping a stat type to the data type. For example, `StatType.DAMAGE` is a
 * `float` type.
 */
export interface StatTypeType {
  [StatType.DAMAGE]: float;
  [StatType.FIRE_DELAY]: float;
  [StatType.SHOT_SPEED]: float;
  [StatType.TEAR_HEIGHT]: float;
  [StatType.TEAR_RANGE]: float;
  [StatType.TEAR_FALLING_ACCELERATION]: float;
  [StatType.TEAR_FALLING_SPEED]: float;
  [StatType.MOVE_SPEED]: float;
  [StatType.TEAR_FLAG]: BitFlags<TearFlag>;
  [StatType.TEAR_COLOR]: Color;
  [StatType.FLYING]: boolean;
  [StatType.LUCK]: float;
  [StatType.SIZE]: Vector;
}
