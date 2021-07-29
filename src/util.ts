import { RECOMMENDED_SHIFT_IDX } from "./constants";
import { game } from "./game";

/** Helper function for determining if two arrays contain the exact same elements. */
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
 */
export const ensureAllCases = (obj: never): never => obj;

/**
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * Example:
 * ```
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== null) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.TRINKET_SWALLOWED_PENNY);
 * }
 * ```
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | null {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinket0 = player.GetTrinket(0);
  const trinket1 = player.GetTrinket(1);

  if (maxTrinkets === 1) {
    return trinket0 === TrinketType.TRINKET_NULL ? 0 : null;
  }

  if (maxTrinkets === 2) {
    if (trinket0 === TrinketType.TRINKET_NULL) {
      return 0;
    }
    return trinket1 === TrinketType.TRINKET_NULL ? 1 : null;
  }

  error(`The player has ${maxTrinkets} trinket slots, which is not supported.`);
  return null;
}

/**
 * Helper function to get the room index of the current room. Use this instead of calling
 * `Game().GetLevel().GetCurrentRoomIndex()` directly to avoid bugs with big rooms.
 * (Big rooms can return the specific 1x1 quadrant that the player is in, which can break data
 * structures that use the room index as an index.)
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
 */
export function initRNG(seed: int): RNG {
  const rng = RNG();

  // The game expects seeds in the range of 0 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}
