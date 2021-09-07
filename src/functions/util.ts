import { VECTOR_BRAND } from "../constants";
import { getMaxCollectibleID } from "./collectibles";
import { getAngleDifference } from "./math";

/**
 * Helper function to get type safety on a switch statement.
 * Very useful to be future-safe against people adding values to a type or an enum.
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
 * TypeScriptToLua will transpile TypeScript enums to Lua tables that have a double mapping. Thus,
 * when you iterate over them, you will get both the names of the enums and the values of the enums,
 * in a random order. If all you need are the values of an enum, use this helper function.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/docs/gotchas#iterating-over-enums
 */
export function getEnumValues(transpiledEnum: unknown): int[] {
  const enumValues: int[] = [];
  for (const [key, value] of pairs(transpiledEnum)) {
    // Ignore the reverse mappings created by TypeScriptToLua
    if (type(key) === "string") {
      enumValues.push(value);
    }
  }

  // The enums will be in a random order, so sort them
  enumValues.sort();

  return enumValues;
}

/** Returns a set containing every valid collectible type in the game, including modded items. */
export function getCollectibleSet(): Set<CollectibleType | int> {
  const itemConfig = Isaac.GetItemConfig();

  const collectibleSet = new Set<CollectibleType | int>();
  for (
    let collectibleType = 1;
    collectibleType <= getMaxCollectibleID();
    collectibleType++
  ) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      collectibleSet.add(collectibleType);
    }
  }

  return collectibleSet;
}

/**
 * Used to determine is the given table is a serialized Vector created by the save data manager
 * and/or the `deepCopy` function.
 */
export function isSerializedVector(object: unknown): boolean {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const table = object as LuaTable;
  return table.has(VECTOR_BRAND) && table.has("X") && table.has("Y");
}

export function isVector(object: unknown): boolean {
  const objectType = type(object);
  if (objectType !== "userdata") {
    return false;
  }

  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return false;
  }

  const vectorMetatable = metatable as Record<string, string>;
  return vectorMetatable.__type === "Vector"; // eslint-disable-line no-underscore-dangle
}

export function lerp(a: number, b: number, pos: float): number {
  return a + (b - a) * pos;
}

export function lerpAngleDegrees(
  aStart: number,
  aEnd: number,
  percent: float,
): number {
  return aStart + getAngleDifference(aStart, aEnd) * percent;
}

/**
 * Whether or not the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 */
export function onSetSeed(): boolean {
  const game = Game();
  const seeds = game.GetSeeds();
  const customRun = seeds.IsCustomRun();
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.CHALLENGE_NULL && customRun;
}

/**
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function tableClear(table: LuaTable): void {
  for (const [key] of pairs(table)) {
    table.delete(key);
  }
}

export function teleport(
  roomIndex: int,
  direction = Direction.NO_DIRECTION,
  roomTransitionAnim = RoomTransitionAnim.TELEPORT,
): void {
  const game = Game();
  const level = game.GetLevel();

  // This must be set before every StartRoomTransition() invocation or else the function can send
  // you to the wrong room
  level.LeaveDoor = -1;

  game.StartRoomTransition(roomIndex, direction, roomTransitionAnim);
}

/** Helper function for finding out which way a vector is pointing. */
export function vectorToDirection(vector: Vector): Direction {
  const degrees = vector.GetAngleDegrees();

  if (degrees >= -45 && degrees < 45) {
    return Direction.RIGHT;
  }

  if (degrees >= 45 && degrees < 135) {
    return Direction.DOWN;
  }

  if (degrees < -45 && degrees >= -135) {
    return Direction.UP;
  }

  if (degrees >= 135 || degrees < -135) {
    return Direction.LEFT;
  }

  return Direction.NO_DIRECTION;
}
