import {
  Direction,
  DoorSlot,
  RoomTransitionAnim,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { getRoomData, getRoomGridIndex } from "./roomData";
import { assertDefined } from "./utils";

/**
 * Helper function to reload the current room using `Game.StartRoomTransition`.
 *
 * This is useful for canceling the "goto" console command or to make the `Level.SetStage` method
 * take effect.
 */
export function reloadRoom(): void {
  const roomGridIndex = getRoomGridIndex();
  teleport(roomGridIndex, Direction.NO_DIRECTION, RoomTransitionAnim.FADE);
}

/**
 * Helper function to change the current room. It can be used for both teleportation and "normal"
 * room transitions, depending on what is passed for the `direction` and `roomTransitionAnim`
 * arguments.
 *
 * Use this function instead of invoking the `Game.StartRoomTransition` method directly so that:
 * - you do not forget to set the `Level.LeaveDoor` field
 * - to prevent crashing on invalid room grid indexes
 *
 * Note that if the current floor has Curse of the Maze, it may redirect the intended teleport.
 *
 * @param roomGridIndex The room grid index of the destination room.
 * @param direction Optional. Default is `Direction.NO_DIRECTION`.
 * @param roomTransitionAnim Optional. Default is `RoomTransitionAnim.TELEPORT`.
 */
export function teleport(
  roomGridIndex: int,
  direction = Direction.NO_DIRECTION,
  roomTransitionAnim = RoomTransitionAnim.TELEPORT,
): void {
  const level = game.GetLevel();

  const roomData = getRoomData(roomGridIndex);
  assertDefined(
    roomData,
    `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
  );

  // This must be set before every `Game.StartRoomTransition` method invocation or else the function
  // can send you to the wrong room.
  level.LeaveDoor = DoorSlot.NO_DOOR_SLOT;

  game.StartRoomTransition(roomGridIndex, direction, roomTransitionAnim);
}
