import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntitiesSaveState extends IsaacAPIClass {
    readonly GetB1: () => boolean;
    readonly GetB2: () => boolean;
    readonly GetDropSeed: () => Seed;
    readonly GetF1: () => number;
    readonly GetF2: () => number;
    readonly GetGridSpawnIdx: () => number;
    readonly GetI1: () => int;
    readonly GetI2: () => int;
    readonly GetI3: () => int;
    readonly GetI4: () => int;
    readonly GetI5: () => int;
    readonly GetI6: () => int;
    readonly GetI7: () => int;
    readonly GetI8: () => int;
    readonly GetInitSeed: () => Seed;
    readonly GetPos: () => Vector;
    readonly GetSpawnerType: () => EntityType;
    readonly GetSpawnerVariant: () => int;
    readonly GetSubType: () => int;
    readonly GetType: () => EntityType;

    /** Returns a boolean if the entity is an `EntityPickup`, otherwise it returns an integer. */
    readonly GetU1: () => boolean | int;
    readonly GetVariant: () => int;
    readonly SetB1: (b1: boolean) => void;
    readonly SetB2: (b2: boolean) => void;
    readonly SetF1: (f1: number) => void;
    readonly SetF2: (f2: number) => void;
    readonly SetI1: (i1: number) => void;
    readonly SetI2: (i2: number) => void;
    readonly SetI3: (i3: number) => void;
    readonly SetI4: (i4: number) => void;
    readonly SetI5: (i5: number) => void;
    readonly SetI6: (i6: number) => void;
    readonly SetI7: (i7: number) => void;
    readonly SetI8: (i8: number) => void;
    readonly SetPos: (position: Vector) => void;
    readonly SetSubType: (subType: int) => void;
    readonly SetType: (entityType: EntityType) => void;
    readonly SetU1: (num: boolean | int) => void;
    readonly SetVariant: (variant: int) => void;
  }
}
