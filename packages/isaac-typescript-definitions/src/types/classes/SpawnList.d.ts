declare interface SpawnList extends IsaacAPIClass {
  readonly Get: (idx: int) => RoomConfigSpawn | undefined;

  Size: int;
}
