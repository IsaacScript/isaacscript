/**
 * This maps the GridEntityXMLType (i.e. the type contained in the room XML/STB file) to the
 * GridEntityType and the variant used by the game.
 */
export const GRID_ENTITY_XML_MAP: ReadonlyMap<
  GridEntityXMLType,
  [GridEntityType, int]
> = new Map([
  [GridEntityXMLType.ROCK, [GridEntityType.GRID_ROCK, RockVariant.NORMAL]],
  [GridEntityXMLType.ROCK_BOMB, [GridEntityType.GRID_ROCK_BOMB, 0]],
  [GridEntityXMLType.ROCK_ALT, [GridEntityType.GRID_ROCK_ALT, 0]],
  [GridEntityXMLType.ROCKT, [GridEntityType.GRID_ROCKT, 0]],
  [GridEntityXMLType.ROCK_ALT2, [GridEntityType.GRID_ROCK_ALT2, 0]],
  [
    GridEntityXMLType.ROCK_EVENT,
    [GridEntityType.GRID_ROCK_ALT2, RockVariant.EVENT],
  ],
  [GridEntityXMLType.ROCK_SPIKED, [GridEntityType.GRID_ROCK_SPIKED, 0]],
  [GridEntityXMLType.ROCK_GOLD, [GridEntityType.GRID_ROCK_GOLD, 0]],
  [GridEntityXMLType.TNT, [GridEntityType.GRID_TNT, 0]],
  // GridEntityXMLType.FIREPLACE (1400) and GridEntityXMLType.RED_FIREPLACE (1410) are intentionally
  // not mapped; the game converts these to EntityType.ENTITY_FIREPLACE (33)
  // Manually spawning the grid version of the fireplace will result in a bugged entity
  [
    GridEntityXMLType.POOP_RED,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RED],
  ],
  [
    GridEntityXMLType.POOP_RAINBOW,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RAINBOW],
  ],
  [
    GridEntityXMLType.POOP_CORN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CORN],
  ],
  [
    GridEntityXMLType.POOP_GOLDEN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.GOLDEN],
  ],
  [
    GridEntityXMLType.POOP_BLACK,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.BLACK],
  ],
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
  [
    GridEntityXMLType.POOP,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.NORMAL],
  ],
  [
    GridEntityXMLType.POOP_CHARMING,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CHARMING],
  ],
  [GridEntityXMLType.ROCKB, [GridEntityType.GRID_ROCKB, 0]],
  [GridEntityXMLType.PILLAR, [GridEntityType.GRID_PILLAR, 0]],
  [GridEntityXMLType.SPIKES, [GridEntityType.GRID_SPIKES, 0]],
  [GridEntityXMLType.SPIKES_ONOFF, [GridEntityType.GRID_SPIKES_ONOFF, 0]],
  [GridEntityXMLType.SPIDERWEB, [GridEntityType.GRID_SPIDERWEB, 0]],
  [GridEntityXMLType.WALL, [GridEntityType.GRID_WALL, 0]],
  [GridEntityXMLType.PIT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],
  [
    GridEntityXMLType.FISSURE_SPAWNER,
    [GridEntityType.GRID_PIT, PitVariant.FISSURE_SPAWNER],
  ],
  // GridEntityXMLType.PIT_EVENT (3009) spawns as a normal pit with VarData equal to 1;
  // VarData must be manually handled by any code that uses this mapping
  [GridEntityXMLType.PIT_EVENT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],
  [GridEntityXMLType.LOCK, [GridEntityType.GRID_LOCK, 0]],
  [
    GridEntityXMLType.PRESSURE_PLATE,
    [GridEntityType.GRID_PRESSURE_PLATE, PressurePlateVariant.PRESSURE_PLATE],
  ],
  [
    GridEntityXMLType.STATUE_DEVIL,
    [GridEntityType.GRID_STATUE, StatueVariant.DEVIL],
  ],
  [
    GridEntityXMLType.STATUE_ANGEL,
    [GridEntityType.GRID_STATUE, StatueVariant.ANGEL],
  ],
  [GridEntityXMLType.TELEPORTER, [GridEntityType.GRID_TELEPORTER, 0]],
  [
    GridEntityXMLType.TRAPDOOR,
    [GridEntityType.GRID_TRAPDOOR, TrapdoorVariant.NORMAL],
  ],
  [
    GridEntityXMLType.STAIRS,
    [GridEntityType.GRID_STAIRS, StairsVariant.NORMAL],
  ],
  [GridEntityXMLType.GRAVITY, [GridEntityType.GRID_GRAVITY, 0]],
]);
