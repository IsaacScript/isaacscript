/**
 * Matches the RoomDescriptor.DISPLAY_* members of the RoomDescriptor class.
 *
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum RoomDescriptorDisplayType {
  NONE = 0,
  BOX = 1,
  LOCK = 2,
  ICON = 4,
  ALL = 5,
}
