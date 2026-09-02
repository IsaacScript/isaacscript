import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LootListEntry extends IsaacAPIClass {
    /** Returns the entry's RNG. Returns undefined if it has no RNG object. */
    readonly GetRNG: () => RNG | undefined;

    /** Returns the entry's seed. */
    readonly GetSeed: () => Seed;

    /** Returns the entry's sub-type. */
    readonly GetSubType: () => int;

    /** Returns the entry's `EntityType`. */
    readonly GetType: () => EntityType;

    /** Returns the entry's variant. */
    readonly GetVariant: () => int;
  }
}
