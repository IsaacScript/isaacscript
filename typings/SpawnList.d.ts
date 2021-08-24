declare interface SpawnList {
  Get(idx: int): RoomConfigSpawn | null;

  Size: int;
}
