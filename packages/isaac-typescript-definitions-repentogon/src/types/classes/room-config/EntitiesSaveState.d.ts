import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntitiesSaveState extends IsaacAPIClass {
    GetB1: () => boolean;
    GetB2: () => boolean;
    GetDropSeed: () => Seed;
    GetF1: () => number;
    GetF2: () => number;
    GetGridSpawnIdx: () => number;
    GetI1: () => int;
    GetI2: () => int;
    GetI3: () => int;
    GetI4: () => int;
    GetI5: () => int;
    GetI6: () => int;
    GetI7: () => int;
    GetI8: () => int;
    GetInitSeed: () => Seed;
    GetPos: () => Vector;
    GetSpawnerType: () => EntityType;
    GetSpawnerVariant: () => int;
    GetSubType: () => int;
    GetType: () => EntityType;

    /** Returns a boolean if the entity is an `EntityPickup`, otherwise it returns an integer. */
    GetU1: () => boolean | int;
    GetVariant: () => int;
    SetB1: (b1: boolean) => void;
    SetB2: (b2: boolean) => void;
    SetF1: (f1: number) => void;
    SetF2: (f2: number) => void;
    SetI1: (i1: number) => void;
    SetI2: (i2: number) => void;
    SetI3: (i3: number) => void;
    SetI4: (i4: number) => void;
    SetI5: (i5: number) => void;
    SetI6: (i6: number) => void;
    SetI7: (i7: number) => void;
    SetI8: (i8: number) => void;
    SetPos: (position: Vector) => void;
    SetSubType: (subType: int) => void;
    SetType: (entityType: EntityType) => void;
    SetU1: (num: boolean | int) => void;
    SetVariant: (variant: int) => void;
  }
}
