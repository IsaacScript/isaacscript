/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface WeightedOutcomePicker {
  /**
   * Adds an outcome to the outcome selector with the specified Weight.
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

  PickOutcome: (rng: RNG) => int;
}

export function WeightedOutcomePicker(): WeightedOutcomePicker;
