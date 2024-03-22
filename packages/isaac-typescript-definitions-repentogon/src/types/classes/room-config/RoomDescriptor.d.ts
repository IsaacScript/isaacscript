import type { DoorSlotFlag } from "isaac-typescript-definitions";

declare interface RoomDescriptor extends IsaacAPIClass {
  AddRestrictedGridIndex: (gridIndex: int) => void;
  GetEntitiesSaveState: () => EntitiesSaveStateVector;
  GetGridEntitiesSaveState: () => GridEntitiesSaveStateVector;
  GetRestrictedGridIndexes: () => int[];

  AllowedDoors: BitFlags<DoorSlotFlag>;
  Doors: BitFlags<DoorSlotFlag>;
}
