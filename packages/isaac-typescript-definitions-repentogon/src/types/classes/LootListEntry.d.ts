import type { EntityType } from "isaac-typescript-definitions";

declare global {
  interface LootListEntry extends IsaacAPIClass {
    GetRNG: () => RNG | undefined;
    GetSeed: () => Seed;
    GetSubType: () => int;
    GetType: () => EntityType;
    GetVariant: () => int;
  }
}
