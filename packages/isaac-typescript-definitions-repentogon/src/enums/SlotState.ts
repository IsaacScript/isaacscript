/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum SlotState {
  IDLE = 1,
  /** Only used by Shell Game and Hell Game. */
  IDLE_REWARD = 2,
  BOMBED = 3,
  PAYOUT = 4,
  /** Only used by Shell Game and Hell Game. */
  REWARD = 5,
}
