/**
 * This maps the GridEntityXMLType (i.e. the type contained in the room XML/STB file) to the
 * GridEntityType and the variant used by the game.
 */
export const GRID_ENTITY_XML_MAP: ReadonlyMap<
  GridEntityXMLType,
  [GridEntityType, int]
> = new Map([
  // 1000
  [GridEntityXMLType.ROCK, [GridEntityType.GRID_ROCK, RockVariant.NORMAL]],

  // 1001
  [GridEntityXMLType.ROCK_BOMB, [GridEntityType.GRID_ROCK_BOMB, 0]],

  // 1002
  [GridEntityXMLType.ROCK_ALT, [GridEntityType.GRID_ROCK_ALT, 0]],

  // 1003
  [GridEntityXMLType.ROCKT, [GridEntityType.GRID_ROCKT, 0]],

  // 1008
  [GridEntityXMLType.ROCK_ALT2, [GridEntityType.GRID_ROCK_ALT2, 0]],

  // 1009
  [
    GridEntityXMLType.ROCK_EVENT,
    [GridEntityType.GRID_ROCK_ALT2, RockVariant.EVENT],
  ],

  // 1010
  [GridEntityXMLType.ROCK_SPIKED, [GridEntityType.GRID_ROCK_SPIKED, 0]],

  // 1011
  [GridEntityXMLType.ROCK_GOLD, [GridEntityType.GRID_ROCK_GOLD, 0]],

  // 1300
  [GridEntityXMLType.TNT, [GridEntityType.GRID_TNT, 0]],

  // GridEntityXMLType.FIREPLACE (1400) and GridEntityXMLType.RED_FIREPLACE (1410) are intentionally
  // not mapped; the game converts these to EntityType.ENTITY_FIREPLACE (33)
  // Manually spawning the grid version of the fireplace will result in a bugged entity

  // 1490
  [
    GridEntityXMLType.POOP_RED,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RED],
  ],

  // 1494
  [
    GridEntityXMLType.POOP_RAINBOW,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RAINBOW],
  ],

  // 1495
  [
    GridEntityXMLType.POOP_CORN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CORN],
  ],

  // 1496
  [
    GridEntityXMLType.POOP_GOLDEN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.GOLDEN],
  ],

  // 1497
  [
    GridEntityXMLType.POOP_BLACK,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.BLACK],
  ],

  // 1498
  [
    GridEntityXMLType.POOP_WHITE,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.WHITE],
  ],

  // GridEntityXMLType.POOP_GIGA (1499) is intentionally not mapped;
  // the game converts this to four different grid entities that are all next to each other:
  // - PoopVariant.GIGA_TOP_LEFT (7)
  // - PoopVariant.GIGA_TOP_RIGHT (8)
  // - PoopVariant.GIGA_BOTTOM_LEFT (9)
  // - PoopVariant.GIGA_BOTTOM_RIGHT (10)

  // 1500
  [
    GridEntityXMLType.POOP,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.NORMAL],
  ],

  // 1501
  [
    GridEntityXMLType.POOP_CHARMING,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CHARMING],
  ],

  // 1900
  [GridEntityXMLType.ROCKB, [GridEntityType.GRID_ROCKB, 0]],

  // 1901
  [GridEntityXMLType.PILLAR, [GridEntityType.GRID_PILLAR, 0]],

  // 1930
  [GridEntityXMLType.SPIKES, [GridEntityType.GRID_SPIKES, 0]],

  // 1931
  [GridEntityXMLType.SPIKES_ONOFF, [GridEntityType.GRID_SPIKES_ONOFF, 0]],

  // 1940
  [GridEntityXMLType.SPIDERWEB, [GridEntityType.GRID_SPIDERWEB, 0]],

  // 1999
  [GridEntityXMLType.WALL, [GridEntityType.GRID_WALL, 0]],

  // 3000
  [GridEntityXMLType.PIT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],

  // 3001
  [
    GridEntityXMLType.FISSURE_SPAWNER,
    [GridEntityType.GRID_PIT, PitVariant.FISSURE_SPAWNER],
  ],

  // 3009
  // GridEntityXMLType.PIT_EVENT spawns as a normal pit with VarData equal to 1;
  // VarData must be manually handled by any code that uses this mapping
  [GridEntityXMLType.PIT_EVENT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],

  // 4000
  [GridEntityXMLType.LOCK, [GridEntityType.GRID_LOCK, 0]],

  // 4500
  [
    GridEntityXMLType.PRESSURE_PLATE,
    [GridEntityType.GRID_PRESSURE_PLATE, PressurePlateVariant.PRESSURE_PLATE],
  ],

  // 5000
  [
    GridEntityXMLType.STATUE_DEVIL,
    [GridEntityType.GRID_STATUE, StatueVariant.DEVIL],
  ],

  // 5001
  [
    GridEntityXMLType.STATUE_ANGEL,
    [GridEntityType.GRID_STATUE, StatueVariant.ANGEL],
  ],

  // 6100
  [GridEntityXMLType.TELEPORTER, [GridEntityType.GRID_TELEPORTER, 0]],

  // 9000
  [
    GridEntityXMLType.TRAPDOOR,
    [GridEntityType.GRID_TRAPDOOR, TrapdoorVariant.NORMAL],
  ],

  // 9100
  [
    GridEntityXMLType.STAIRS,
    [GridEntityType.GRID_STAIRS, StairsVariant.NORMAL],
  ],

  // 10000
  [GridEntityXMLType.GRAVITY, [GridEntityType.GRID_GRAVITY, 0]],
]);
