// This does not exist in the API docs but is used in Level.GetRooms()
declare class RoomList {
  Get(idx: int): RoomDescriptor;

  Size: int;
}
