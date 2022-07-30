declare interface RoomConfigSpawn extends IsaacAPIClass {
  PickEntry(r: float): Readonly<RoomConfigEntry>;

  EntryCount: int;
  SumWeights: float;
  X: int;
  Y: int;
}
