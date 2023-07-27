declare interface RoomList extends IsaacAPIClass {
  Get: (idx: int) => Readonly<RoomDescriptor> | undefined;

  Size: int;
}
