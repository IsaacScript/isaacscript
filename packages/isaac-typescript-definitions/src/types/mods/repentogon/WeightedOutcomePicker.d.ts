/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface WeightedOutcomePicker {
  /**
   * Adds an outcome to the outcome selector with the specified weight.
   *
   * The internal weight is still an integer calculated with `scaleFactor * weight`, where
   * `scaleFactor` is the maximum weight (equivalent to 1.0).
   *
   * ```ts
   * const picker = WeightedOutcomePicker();
   *
   * picker.AddOutcomeFloat(1, 1.0) // ~45%
   * picker.AddOutcomeFloat(2, 1.0) // ~45%
   * picker.AddOutcomeFloat(3, 0.2) // ~9%
   * ```
   */
  AddOutcomeFloat: (value: int, weight: number, scaleFactor?: number) => void;

  /**
   * Adds an outcome to the outcome selector with the specified weight.
   *
   * ```ts
   * const picker = WeightedOutcomePicker();
   *
   * picker.AddOutcomeWeight(1, 65) // 65%
   * picker.AddOutcomeWeight(2, 30) // 30%
   * picker.AddOutcomeWeight(3, 5) // 5%
   * ```
   */
  AddOutcomeWeight: (value: int, weight: int) => void;

  /** Clears all outcomes from the outcome picker. */
  ClearOutcomes: () => void;

  /** Returns the number of outcomes in the outcome picker. */
  GetNumOutcomes: () => void;

  /** Returns an array containing a list of all outcomes in the outcome picker. */
  GetOutcomes: () => Array<{ Value: number; Weight: number }>;

  PickOutcome: (rng: RNG) => int;

  /** Removes an outcome from the outcome picker with the given value. */
  RemoveOutcome: (value: int) => void;
}

export function WeightedOutcomePicker(): WeightedOutcomePicker;
