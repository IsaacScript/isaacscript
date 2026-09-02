/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface BossPool extends IsaacAPIClass {
  /** Returns the ID of the Boss Pool's Double Trouble room. */
  readonly GetDoubleTroubleRoomID: () => int;
  readonly GetDoubleTroubleRoomVariantStart: () => int;

  /** Returns an array of the Boss Pool's entries. */
  readonly GetEntries: () => BossPoolEntry[];

  /** Returns the name of the Boss Pool. */
  readonly GetName: () => string;

  /** Returns the RNG object of the Boss Pool. The RNG object is used to select the floor's boss. */
  readonly GetRNG: () => RNG;

  /** Returns the Boss Pool's weight. */
  readonly GetWeight: () => float;
}
