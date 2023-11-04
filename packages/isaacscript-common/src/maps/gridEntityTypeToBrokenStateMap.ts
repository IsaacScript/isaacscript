import {
  GridEntityType,
  LockState,
  PoopState,
  RockState,
  SpiderWebState,
  TNTState,
} from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/** Not every grid entity can be broken. Thus use a map to represent this. */
export const GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP = new ReadonlyMap<
  GridEntityType,
  int
>([
  // 2
  [GridEntityType.ROCK, RockState.BROKEN],

  // 4
  [GridEntityType.ROCK_TINTED, RockState.BROKEN],

  // 5
  [GridEntityType.ROCK_BOMB, RockState.BROKEN],

  // 6
  [GridEntityType.ROCK_ALT, RockState.BROKEN],

  // 10
  [GridEntityType.SPIDER_WEB, SpiderWebState.BROKEN],

  // 11
  [GridEntityType.LOCK, LockState.UNLOCKED],

  // 12
  [GridEntityType.TNT, TNTState.EXPLODED],

  // 14
  [GridEntityType.POOP, PoopState.COMPLETELY_DESTROYED],

  // 22
  [GridEntityType.ROCK_SUPER_SPECIAL, RockState.BROKEN],

  // 25
  [GridEntityType.ROCK_SPIKED, RockState.BROKEN],

  // 26
  [GridEntityType.ROCK_ALT_2, RockState.BROKEN],

  // 27
  [GridEntityType.ROCK_GOLD, RockState.BROKEN],
]);
