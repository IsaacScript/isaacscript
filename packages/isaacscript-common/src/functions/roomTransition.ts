import {
  Direction,
  DoorSlot,
  LevelCurse,
  RoomTransitionAnim,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { runNextRoom } from "../features/runNextRoom";
import { hasCurse } from "./curses";
import { getRoomData, getRoomGridIndex } from "./roomData";

/**
 * Helper function to reload the current room using `Game.StartRoomTransition`.
 *
 * This is useful for canceling the "goto" console command or to make the `Level.SetStage` method
 * take effect.
 */
export function reloadRoom(): void {
  const roomGridIndex = getRoomGridIndex();
  teleport(
    roomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.FADE,
    true,
  );
}

/**
 * Helper function to change the current room. It can be used for both teleportation and "normal"
 * room transitions, depending on what is passed for the `direction` and `roomTransitionAnim`
 * arguments.
 *
 * Use this function instead of invoking the `Game.StartRoomTransition` method directly so that:
 * - you do not forget to set `Level.LeaveDoor` property
 * - to prevent crashing on invalid room grid indexes
 * - to automatically handle Curse of the Maze
 *
 * @param roomGridIndex The room grid index of the destination room.
 * @param direction Optional. Default is `Direction.NO_DIRECTION`.
 * @param roomTransitionAnim Optional. Default is `RoomTransitionAnim.TELEPORT`.
 * @param force Optional. Whether to temporarily disable Curse of the Maze. Default is false. If set
 *              to false, then this function may not go to the provided room grid index.
 */
export function teleport(
  roomGridIndex: int,
  direction = Direction.NO_DIRECTION,
  roomTransitionAnim = RoomTransitionAnim.TELEPORT,
  force = false,
): void {
  const level = game.GetLevel();

  // Before starting a room transition, we must ensure that Curse of the Maze is not in effect, or
  // else the room transition might send us to the wrong room.
  const shouldTempDisableCurse = force && hasCurse(LevelCurse.MAZE);
  if (shouldTempDisableCurse) {
    level.RemoveCurses(LevelCurse.MAZE);
  }

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    error(
      `Failed to change the room to grid index ${roomGridIndex} because that room does not exist.`,
    );
  }

  // This must be set before every `Game.StartRoomTransition` method invocation or else the function
  // can send you to the wrong room.
  level.LeaveDoor = DoorSlot.NO_DOOR_SLOT;

  game.StartRoomTransition(roomGridIndex, direction, roomTransitionAnim);

  if (shouldTempDisableCurse) {
    runNextRoom(() => {
      const futureLevel = game.GetLevel();
      futureLevel.AddCurse(LevelCurse.MAZE, false);
    });
  }
}
