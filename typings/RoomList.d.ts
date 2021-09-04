declare interface RoomList {
  Get(idx: int): RoomDescriptor | undefined;

  Size: int;
}
