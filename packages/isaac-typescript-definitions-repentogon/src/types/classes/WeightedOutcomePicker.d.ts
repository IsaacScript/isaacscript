/**
 * Creates a new `WeightedOutcomePicker` object.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare function WeightedOutcomePicker(this: void): WeightedOutcomePicker;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface WeightedOutcomePicker extends IsaacAPIClass {
  /**
   * Adds a float outcome to the outcome selector with the weight as a float between 0 to 1.
   *
   * ```ts
   * const picker = WeightedOutcomePicker();
   *
   * picker.AddOutcomeFloat(1, 1.0); // ~45%
   * picker.AddOutcomeFloat(2, 1.0); // ~45%
   * picker.AddOutcomeFloat(3, 0.2); // ~9%
   * ```
   *
   * @param value
   * @param weight
   * @param scaleFactor Optional. The maximum weight. Default is 100.
   */
  AddOutcomeFloat: (value: int, weight: float, scaleFactor?: int) => void;

  /**
   * Adds a float outcome to the outcome selector with the weight as an integer.
   *
   * ```ts
   * const picker = WeightedOutcomePicker();
   *
   * picker.AddOutcomeFloat(1, 65); // 65%
   * picker.AddOutcomeFloat(2, 30); // 30%
   * picker.AddOutcomeFloat(3, 5); // 5%
   * ```
   */
  AddOutcomeWeight: (value: int, weight: int) => void;

  /** Clears all outcomes from the outcome picker. */
  ClearOutcomes: () => void;

  /** Returns the number of outcomes in the outcome picker. */
  GetNumOutcomes: () => int;

  /** Returns an array of all of the outcomes in the outcome picker. */
  GetOutcomes: () => Array<{ Value: int; Weight: number }>;

  /** Picks a random outcome from the list of outcomes. */
  PickOutcome: (rng: RNG) => int;

  /** Removes an outcome from the outcome picker with the specified `value`. */
  RemoveOutcome: (value: int) => void;
}
