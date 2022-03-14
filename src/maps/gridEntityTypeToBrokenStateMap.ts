// Not every grid entity can be broken, thus we can use a map to represent this
export const GRID_ENTITY_TYPE_TO_BROKEN_STATE_MAP: ReadonlyMap<
  GridEntityType,
  int
> = new Map<GridEntityType, int>([
  // 2
  [GridEntityType.GRID_ROCK, RockState.BROKEN],

  // 4
  [GridEntityType.GRID_ROCKT, RockState.BROKEN],

  // 5
  [GridEntityType.GRID_ROCK_BOMB, RockState.BROKEN],

  // 6
  [GridEntityType.GRID_ROCK_ALT, RockState.BROKEN],

  // 10
  [GridEntityType.GRID_SPIDERWEB, SpiderWebState.BROKEN],

  // 11
  [GridEntityType.GRID_LOCK, LockState.UNLOCKED],

  // 12
  [GridEntityType.GRID_TNT, TNTState.EXPLODED],

  // 14
  [GridEntityType.GRID_POOP, PoopState.COMPLETELY_DESTROYED],

  // 22
  [GridEntityType.GRID_ROCK_SS, RockState.BROKEN],

  // 25
  [GridEntityType.GRID_ROCK_SPIKED, RockState.BROKEN],

  // 26
  [GridEntityType.GRID_ROCK_ALT2, RockState.BROKEN],

  // 27
  [GridEntityType.GRID_ROCK_GOLD, RockState.BROKEN],
]);
