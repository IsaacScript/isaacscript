/**
 * Matches the `RoomDescriptor.DISPLAY_*` members of the `RoomDescriptor` class. In IsaacScript, we
 * reimplement this as an enum instead, since it is cleaner.
 */
export enum RoomDescriptorDisplayType {
  NONE = 0,
  BOX = 1,
  LOCK = 2,
  ICON = 4,
  ALL = 5,
}
