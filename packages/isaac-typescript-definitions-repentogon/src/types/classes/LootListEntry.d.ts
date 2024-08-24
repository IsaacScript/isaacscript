import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LootListEntry extends IsaacAPIClass {
    GetRNG: () => RNG | undefined;
    GetSeed: () => Seed;
    GetSubType: () => int;
    GetType: () => EntityType;
    GetVariant: () => int;
  }
}
