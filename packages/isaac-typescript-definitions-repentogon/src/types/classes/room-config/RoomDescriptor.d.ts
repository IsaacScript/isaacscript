import type {
  Dimension,
  DoorSlot,
  DoorSlotFlag,
} from "isaac-typescript-definitions";

declare global {
  interface RoomDescriptor extends IsaacAPIClass {
    readonly AddRestrictedGridIndex: (gridIndex: int) => void;

    /** Returns the `EntitiesSaveStateVector` of the room's decorations. */
    readonly GetDecoSaveState: () => EntitiesSaveStateVector;

    /** Returns the dimension that the room is in. */
    readonly GetDimension: () => Dimension;

    readonly GetEntitiesSaveState: () => EntitiesSaveStateVector;
    readonly GetGridEntitiesSaveState: () => GridEntitiesSaveStateVector;

    /**
     * Returns a map that maps the door slots to a `RoomDescriptor` for all of the room's current
     * neighbors.
     */
    readonly GetNeighboringRooms: () => LuaMap<DoorSlot, RoomDescriptor>;

    readonly GetRestrictedGridIndexes: () => int[];
    readonly InitSeeds: (rng: RNG) => void;

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

    readonly BossDeathSeed: Seed;
  }
}
