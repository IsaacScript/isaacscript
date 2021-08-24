declare interface RoomList {
  Get(idx: int): RoomDescriptor | null;

  Size: int;
}
