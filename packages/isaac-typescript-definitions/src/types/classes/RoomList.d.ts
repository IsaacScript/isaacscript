declare interface RoomList {
  Get(idx: int): Readonly<RoomDescriptor> | undefined;

  Size: int;
}
