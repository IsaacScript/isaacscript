import {
  CrawlSpaceVariant,
  GridEntityType,
  GridEntityXMLType,
  PitVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  RockVariant,
  StatueVariant,
  TrapdoorVariant,
} from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/**
 * This maps the GridEntityXMLType (i.e. the type contained in the room XML/STB file) to the
 * GridEntityType and the variant used by the game.
 */
export const GRID_ENTITY_XML_MAP = new ReadonlyMap<
  GridEntityXMLType,
  [GridEntityType, int]
>([
  // 0
  [GridEntityXMLType.DECORATION, [GridEntityType.DECORATION, 0]],

  // 1000
  [GridEntityXMLType.ROCK, [GridEntityType.ROCK, RockVariant.NORMAL]],

  // 1001
  [GridEntityXMLType.ROCK_BOMB, [GridEntityType.ROCK_BOMB, 0]],

  // 1002
  [GridEntityXMLType.ROCK_ALT, [GridEntityType.ROCK_ALT, 0]],

  // 1003
  [GridEntityXMLType.ROCK_TINTED, [GridEntityType.ROCK_TINTED, 0]],

  // 1008
  [GridEntityXMLType.ROCK_ALT_2, [GridEntityType.ROCK_ALT_2, 0]],

  // 1009
  [
    GridEntityXMLType.ROCK_EVENT,
    [GridEntityType.ROCK_ALT_2, RockVariant.EVENT],
  ],

  // 1010
  [GridEntityXMLType.ROCK_SPIKED, [GridEntityType.ROCK_SPIKED, 0]],

  // 1011
  [GridEntityXMLType.ROCK_GOLD, [GridEntityType.ROCK_GOLD, 0]],

  // 1300
  [GridEntityXMLType.TNT, [GridEntityType.TNT, 0]],

  // GridEntityXMLType.FIREPLACE (1400) and GridEntityXMLType.RED_FIREPLACE (1410) are intentionally
  // not mapped; the game converts these to EntityType.FIREPLACE (33). Manually spawning the grid
  // version of the fireplace will result in a bugged entity.

  // 1490
  [
    GridEntityXMLType.POOP_RED,
    [GridEntityType.POOP, PoopGridEntityVariant.RED],
  ],

  // 1494
  [
    GridEntityXMLType.POOP_RAINBOW,
    [GridEntityType.POOP, PoopGridEntityVariant.RAINBOW],
  ],

  // 1495
  [
    GridEntityXMLType.POOP_CORNY,
    [GridEntityType.POOP, PoopGridEntityVariant.CORNY],
  ],

  // 1496
  [
    GridEntityXMLType.POOP_GOLDEN,
    [GridEntityType.POOP, PoopGridEntityVariant.GOLDEN],
  ],

  // 1497
  [
    GridEntityXMLType.POOP_BLACK,
    [GridEntityType.POOP, PoopGridEntityVariant.BLACK],
  ],

  // 1498
  [
    GridEntityXMLType.POOP_WHITE,
    [GridEntityType.POOP, PoopGridEntityVariant.WHITE],
  ],

  // GridEntityXMLType.POOP_GIGA (1499) is intentionally not mapped; the game converts this to four
  // different grid entities that are all next to each other:
  // - PoopVariant.GIGA_TOP_LEFT (7)
  // - PoopVariant.GIGA_TOP_RIGHT (8)
  // - PoopVariant.GIGA_BOTTOM_LEFT (9)
  // - PoopVariant.GIGA_BOTTOM_RIGHT (10)

  // 1500
  [GridEntityXMLType.POOP, [GridEntityType.POOP, PoopGridEntityVariant.NORMAL]],

  // 1501
  [
    GridEntityXMLType.POOP_CHARMING,
    [GridEntityType.POOP, PoopGridEntityVariant.CHARMING],
  ],

  // 1900
  [GridEntityXMLType.BLOCK, [GridEntityType.BLOCK, 0]],

  // 1901
  [GridEntityXMLType.PILLAR, [GridEntityType.PILLAR, 0]],

  // 1930
  [GridEntityXMLType.SPIKES, [GridEntityType.SPIKES, 0]],

  // 1931
  [GridEntityXMLType.SPIKES_ON_OFF, [GridEntityType.SPIKES_ON_OFF, 0]],

  // 1940
  [GridEntityXMLType.SPIDER_WEB, [GridEntityType.SPIDER_WEB, 0]],

  // 1999
  [GridEntityXMLType.WALL, [GridEntityType.WALL, 0]],

  // 3000
  [GridEntityXMLType.PIT, [GridEntityType.PIT, PitVariant.NORMAL]],

  // 3001
  [
    GridEntityXMLType.FISSURE_SPAWNER,
    [GridEntityType.PIT, PitVariant.FISSURE_SPAWNER],
  ],

  // 3009 - `GridEntityXMLType.PIT_EVENT` spawns as a normal pit with VarData equal to 1. VarData
  // must be manually handled by any code that uses this mapping.)
  [GridEntityXMLType.PIT_EVENT, [GridEntityType.PIT, PitVariant.NORMAL]],

  // 4000
  [GridEntityXMLType.LOCK, [GridEntityType.LOCK, 0]],

  // 4500
  [
    GridEntityXMLType.PRESSURE_PLATE,
    [GridEntityType.PRESSURE_PLATE, PressurePlateVariant.PRESSURE_PLATE],
  ],

  // 5000
  [
    GridEntityXMLType.STATUE_DEVIL,
    [GridEntityType.STATUE, StatueVariant.DEVIL],
  ],

  // 5001
  [
    GridEntityXMLType.STATUE_ANGEL,
    [GridEntityType.STATUE, StatueVariant.ANGEL],
  ],

  // 6100
  [GridEntityXMLType.TELEPORTER, [GridEntityType.TELEPORTER, 0]],

  // 9000
  [
    GridEntityXMLType.TRAPDOOR,
    [GridEntityType.TRAPDOOR, TrapdoorVariant.NORMAL],
  ],

  // 9100
  [
    GridEntityXMLType.CRAWL_SPACE,
    [GridEntityType.CRAWL_SPACE, CrawlSpaceVariant.NORMAL],
  ],

  // 10000
  [GridEntityXMLType.GRAVITY, [GridEntityType.GRAVITY, 0]],
]);
