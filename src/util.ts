import { BEAST_ROOM_SUB_TYPE, RECOMMENDED_SHIFT_IDX } from "./constants";
import { game } from "./game";

/**
 * Helper function for determining if two arrays contain the exact same elements.
 *
 * @category Utility
 */
export function arrayEquals<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Helper function for quickly switching to a new room without playing a particular animation.
 * Always use this helper function over invoking `Game().ChangeRoom()` directly to ensure that you
 * do not forget to set the LeaveDoor property.
 *
 * @category Utility
 */
export function changeRoom(roomIndex: int): void {
  const level = game.GetLevel();

  // LeaveDoor must be set before every ChangeRoom() invocation or else the function can send you to
  // the wrong room
  level.LeaveDoor = -1;

  game.ChangeRoom(roomIndex);
}

/**
 * Helper function to get type safety on a switch statement.
 * Very useful to be future-safe against people adding values to a type or an enums.
 *
 * Example:
 * ```
 * enum Situations {
 *   Situation1,
 *   Situation2,
 *   Situation3,
 *   // Situation4, // If we uncomment this line, the program will no longer compile
 * }
 *
 * function doThingBasedOnSituation(situation: Situation) {
 *   switch (situation) {
 *     case Situation1: {
 *       return 41;
 *     }
 *
 *     case Situation2: {
 *       return 68;
 *     }
 *
 *     case Situation3: {
 *       return 12;
 *     }
 *
 *     default: {
 *       ensureAllCases(situation);
 *       return 0;
 *     }
 *   }
 * }
 * ```
 *
 * @category Utility
 */
export const ensureAllCases = (obj: never): never => obj;

/**
 * This returns a random number between x and y, inclusive.
 *
 * Example:
 * ```
 * const oneTwoOrThree = getRandom(1, 3, seed);
 * ```
 *
 * @category Utility
 */
export function getRandom(x: int, y: int, seed: int): int {
  const rng = initRNG(seed);

  return rng.RandomInt(y - x + 1) + x;
}

/**
 * Helper function to get the room index of the current room. Use this instead of calling
 * `Game().GetLevel().GetCurrentRoomIndex()` directly to avoid bugs with big rooms.
 * (Big rooms can return the specific 1x1 quadrant that the player is in, which can break data
 * structures that use the room index as an index.)
 *
 * @category Utility
 */
export function getRoomIndex(): int {
  const level = game.GetLevel();

  const roomIndex = level.GetCurrentRoomDesc().SafeGridIndex;
  if (roomIndex < 0) {
    // SafeGridIndex is always -1 for rooms outside the grid
    return level.GetCurrentRoomIndex();
  }

  return roomIndex;
}

/**
 * Converts a room X and Y coordinate to a position. For example, the coordinates of 0, 0 are
 * equal to `Vector(80, 160)`.
 *
 * @category Utility
 */
export function gridToPos(x: int, y: int): Vector {
  const room = game.GetRoom();

  x += 1;
  y += 1;

  const gridIndex = y * room.GetGridWidth() + x;

  return room.GetGridPosition(gridIndex);
}

/**
 * Helper function for determining whether the current room is a crawlspace. Use this function over
 * comparing to `GridRooms.ROOM_DUNGEON_IDX` directly since there is a special case of the player
 * being in The Beast room.
 *
 * @category Utility
 */
export function inCrawlspace(): boolean {
  const level = game.GetLevel();
  const roomDesc = level.GetCurrentRoomDesc();
  const roomData = roomDesc.Data;
  const roomSubType = roomData.Subtype;
  const roomIndex = getRoomIndex();

  return (
    roomIndex === GridRooms.ROOM_DUNGEON_IDX &&
    roomSubType !== BEAST_ROOM_SUB_TYPE
  );
}

/**
 * Helper function to initialize an RNG object.
 *
 * Example:
 * ```
 * const startSeed = Game():GetSeeds():GetStartSeed();
 * const rng = initRNG(startSeed);
 * const fiftyFiftyChance = rng.RandomInt(2) === 0;
 * ```
 *
 * @param seed The seed to initialize it with.
 * (If you aren't initializing it with a seed, then don't use this function and instead simply call
 * the `RNG()` constructor.)
 * @category Utility
 */
export function initRNG(seed: int): RNG {
  const rng = RNG();

  // The game expects seeds in the range of 0 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}

/**
 * @category Utility
 */
export function isRepentanceStage(): boolean {
  const level = game.GetLevel();
  const stageType = level.GetStageType();

  return (
    stageType === StageType.STAGETYPE_REPENTANCE ||
    stageType === StageType.STAGETYPE_REPENTANCE_B
  );
}

/**
 * Whether or not the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 *
 * @category Utility
 */
export function onSetSeed(): boolean {
  const seeds = game.GetSeeds();
  const customRun = seeds.IsCustomRun();
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.CHALLENGE_NULL && customRun;
}

/**
 * @returns 1 if n is positive, -1 if n is negative, or 0 if n is 0.
 * @category Utility
 */
export function sign(n: number): int {
  if (n > 0) {
    return 1;
  }

  if (n < 0) {
    return -1;
  }

  return 0;
}
