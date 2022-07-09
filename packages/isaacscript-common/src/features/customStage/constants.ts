import { DoorSlot, RoomType } from "isaac-typescript-definitions";
import { getLastEnumValue } from "../../functions/enums";

/**
 * In order to keep the size of the STB file small, we only allow certain room types to be used in
 * IsaacScript custom stages.
 */
export const CUSTOM_STAGE_ILLEGAL_ROOM_TYPES = new Set<RoomType>([
  RoomType.BOSS_RUSH,
  RoomType.BLACK_MARKET,
  RoomType.GREED_EXIT,
  RoomType.TELEPORTER,
  RoomType.TELEPORTER_EXIT,
  RoomType.SECRET_EXIT,
  RoomType.BLUE,
]);

/** StageAPI uses 70000 as a base. */
export const CUSTOM_STAGE_BASE_ROOM_VARIANT = 80000;

/**
 * - The `RoomShape` enum goes from 1 to 12.
 * - 12 in binary is 1100.
 * - Thus, we need 4 bits to represent `RoomShape`.
 */
export const CUSTOM_STAGE_NUM_ROOM_SHAPE_BITS = 4;

/**
 * One for each possible door slot. We add one to account for `DoorSlot.LEFT_0` being equal to zero.
 */
export const CUSTOM_STAGE_NUM_DOOR_SLOT_BITS =
  (getLastEnumValue(DoorSlot) as int) + 1;
