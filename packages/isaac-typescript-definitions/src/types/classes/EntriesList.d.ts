declare interface EntriesList extends IsaacAPIClass {
  Get: (idx: int) => RoomConfigEntry | undefined;

  Size: int;
}
