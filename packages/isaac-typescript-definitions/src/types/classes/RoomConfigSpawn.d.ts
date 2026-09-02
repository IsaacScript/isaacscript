declare interface RoomConfigSpawn extends IsaacAPIClass {
  readonly PickEntry: (r: float) => Readonly<RoomConfigEntry>;

  Entries: EntriesList;
  EntryCount: int;
  SumWeights: float;
  X: int;
  Y: int;
}
