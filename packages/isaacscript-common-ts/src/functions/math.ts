/**
 * Helper function to normalize a number, ensuring that it is within a certain range.
 *
 * - If `num` is less than `min`, then it will be clamped to `min`.
 * - If `num` is greater than `max`, then it will be clamped to `max`.
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(num, max));
}
