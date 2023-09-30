import { GridEntityType } from "isaac-typescript-definitions";

// cspell:disable

export const GRID_ENTITY_TYPE_TO_ANM2_PATH = {
  [GridEntityType.NULL]: undefined, // 0
  [GridEntityType.DECORATION]: "gfx/grid/Props_01_Basement.anm2", // 1
  // Also there is:
  // - props_03_caves.anm2
  // - props_05_depths.anm2
  // - props_07_the womb.anm2
  // - props_07_utero.anm2
  // - props_07_the womb_blue.anm2
  // - props_09_sheol.anm2
  // - props_10_cathedral.anm2
  // - props_11_the chest.anm2
  // - props_12_greed.anm2
  // - props_01x_downpour.anm2
  // - props_02x_dross.anm2
  // - props_03x_mines.anm2
  // - props_07_the corpse.anm2
  // - props_0ex_isaacs_bedroom.anm2
  [GridEntityType.ROCK]: "gfx/grid/grid_rock.anm2", // 2
  [GridEntityType.BLOCK]: "gfx/grid/grid_rock.anm2", // 3
  [GridEntityType.ROCK_TINTED]: "gfx/grid/grid_rock.anm2", // 4
  [GridEntityType.ROCK_BOMB]: "gfx/grid/grid_rock.anm2", // 5
  [GridEntityType.ROCK_ALT]: "gfx/grid/grid_rock.anm2", // 6
  [GridEntityType.PIT]: "gfx/grid/grid_pit.anm2", // 7
  [GridEntityType.SPIKES]: "gfx/grid/grid_spikes.anm2", // 8
  [GridEntityType.SPIKES_ON_OFF]: "gfx/grid/grid_spikes.anm2", // 9
  [GridEntityType.SPIDER_WEB]: "gfx/grid/grid_web.anm2", // 10
  [GridEntityType.LOCK]: "gfx/grid/grid_locks.anm2", // 11
  [GridEntityType.TNT]: "gfx/grid/grid_tnt.anm2", // 12
  [GridEntityType.FIREPLACE]: "gfx/grid/grid_fireplace.anm2", // 13
  [GridEntityType.POOP]: "gfx/grid/grid_poop.anm2", // 14
  [GridEntityType.WALL]: undefined, // 15
  [GridEntityType.DOOR]: undefined, // 16
  [GridEntityType.TRAPDOOR]: "gfx/grid/Door_11_TrapDoor.anm2", // 17
  [GridEntityType.CRAWL_SPACE]: "gfx/grid/door_20_secrettrapdoor.anm2", // 18
  [GridEntityType.GRAVITY]: undefined, // 19
  [GridEntityType.PRESSURE_PLATE]: "gfx/grid/grid_pressureplate.anm2", // 20
  [GridEntityType.STATUE]: undefined, // 21
  [GridEntityType.ROCK_SUPER_SPECIAL]: "gfx/grid/grid_rock.anm2", // 22
  [GridEntityType.TELEPORTER]: "gfx/grid/grid_teleporter.anm2", // 23
  [GridEntityType.PILLAR]: "gfx/grid/grid_rock.anm2", // 24
  [GridEntityType.ROCK_SPIKED]: "gfx/grid/grid_rock.anm2", // 25
  [GridEntityType.ROCK_ALT_2]: "gfx/grid/grid_rock.anm2", // 26
  [GridEntityType.ROCK_GOLD]: "gfx/grid/grid_rock.anm2", // 27
} as const satisfies Record<GridEntityType, string | undefined>;
