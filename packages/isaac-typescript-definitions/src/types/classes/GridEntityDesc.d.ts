import type { GridEntityType } from "../../enums/GridEntityType";

declare global {
  interface GridEntityDesc extends IsaacAPIClass {
    Initialized: boolean;
    SpawnCount: int;
    SpawnSeed: Seed;
    State: int;
    Type: GridEntityType;
    VarData: int;
    VariableSeed: Seed;
    Variant: int;
  }
}
