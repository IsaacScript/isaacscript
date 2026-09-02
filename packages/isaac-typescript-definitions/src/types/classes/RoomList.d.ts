declare interface RoomList extends IsaacAPIClass {
  readonly Get: (idx: int) => Readonly<RoomDescriptor> | undefined;

  Size: int;
}
