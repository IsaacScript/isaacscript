import type { DoorSlotFlag } from "isaac-typescript-definitions";

declare global {
  interface RoomDescriptor extends IsaacAPIClass {
    AddRestrictedGridIndex: (gridIndex: int) => void;
    GetEntitiesSaveState: () => EntitiesSaveStateVector;
    GetGridEntitiesSaveState: () => GridEntitiesSaveStateVector;
    GetRestrictedGridIndexes: () => int[];
    InitSeeds: (rng: RNG) => void;

    AllowedDoors: BitFlags<DoorSlotFlag>;
    Doors: BitFlags<DoorSlotFlag>;
  }
}
