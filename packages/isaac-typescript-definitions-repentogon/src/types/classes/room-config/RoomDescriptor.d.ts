import type {
  Dimension,
  DoorSlot,
  DoorSlotFlag,
} from "isaac-typescript-definitions";

declare global {
  interface RoomDescriptor extends IsaacAPIClass {
    AddRestrictedGridIndex: (gridIndex: int) => void;

    /** Returns the dimension that the room is in. */
    GetDimension: () => Dimension;

    GetEntitiesSaveState: () => EntitiesSaveStateVector;
    GetGridEntitiesSaveState: () => GridEntitiesSaveStateVector;

    /**
     * Returns a map that maps the door slots to a `RoomDescriptor` for all of the room's current
     * neighbors.
     */
    GetNeighboringRooms: () => LuaMap<DoorSlot, RoomDescriptor>;

    GetRestrictedGridIndexes: () => int[];
    InitSeeds: (rng: RNG) => void;

    /** Bitflags corresponding to which door slots are currently enabled. */
    readonly AllowedDoors: BitFlags<DoorSlotFlag>;

    /**
     * Which level grid index each `DoorSlot` connects to. Returns -1 if the room's shape doesn't
     * allow a door in that slot.
     *
     * This typically provides a valid index even if there is no door present and if the room itself
     * doesn't allow a door in that slot.
     */
    readonly Doors: LuaTable<DoorSlot, int>;
  }
}
