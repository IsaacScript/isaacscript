declare interface SpawnList extends IsaacAPIClass {
  Get: (idx: int) => RoomConfigSpawn | undefined;

  Size: int;
}
