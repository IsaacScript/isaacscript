declare interface EntriesList extends IsaacAPIClass {
  readonly Get: (idx: int) => RoomConfigEntry | undefined;

  Size: int;
}
