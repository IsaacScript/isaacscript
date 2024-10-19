import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LootListEntry extends IsaacAPIClass {
    /** Returns the entry's RNG. Returns undefined if it has no RNG object. */
    GetRNG: () => RNG | undefined;

    /** Returns the entry's seed. */
    GetSeed: () => Seed;

    /** Returns the entry's sub-type. */
    GetSubType: () => int;

    /** Returns the entry's `EntityType`. */
    GetType: () => EntityType;

    /** Returns the entry's variant. */
    GetVariant: () => int;
  }
}
