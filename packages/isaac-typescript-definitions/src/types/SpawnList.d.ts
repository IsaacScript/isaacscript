declare interface SpawnList {
  Get(idx: int): RoomConfigSpawn | undefined;

  Size: int;
}
