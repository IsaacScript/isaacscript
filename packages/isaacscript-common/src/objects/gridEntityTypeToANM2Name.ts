import { GridEntityType } from "isaac-typescript-definitions";

// cspell:disable

/** These files exist in the "gfx/grid" directory. */
export const GRID_ENTITY_TYPE_TO_ANM2_NAME = {
  [GridEntityType.NULL]: undefined, // 0
  // There are more decoration ANM2 files; see the `getGridEntityANM2Path` function.
  [GridEntityType.DECORATION]: "Props_01_Basement.anm2", // 1
  [GridEntityType.ROCK]: "grid_rock.anm2", // 2
  [GridEntityType.BLOCK]: "grid_rock.anm2", // 3
  [GridEntityType.ROCK_TINTED]: "grid_rock.anm2", // 4
  [GridEntityType.ROCK_BOMB]: "grid_rock.anm2", // 5
  [GridEntityType.ROCK_ALT]: "grid_rock.anm2", // 6
  [GridEntityType.PIT]: "grid_pit.anm2", // 7
  [GridEntityType.SPIKES]: "grid_spikes.anm2", // 8
  [GridEntityType.SPIKES_ON_OFF]: "grid_spikes.anm2", // 9
  [GridEntityType.SPIDER_WEB]: "grid_web.anm2", // 10
  [GridEntityType.LOCK]: "grid_locks.anm2", // 11
  [GridEntityType.TNT]: "grid_tnt.anm2", // 12
  [GridEntityType.FIREPLACE]: "grid_fireplace.anm2", // 13
  [GridEntityType.POOP]: "grid_poop.anm2", // 14
  [GridEntityType.WALL]: undefined, // 15
  [GridEntityType.DOOR]: undefined, // 16
  [GridEntityType.TRAPDOOR]: "Door_11_TrapDoor.anm2", // 17
  [GridEntityType.CRAWL_SPACE]: "door_20_secrettrapdoor.anm2", // 18
  [GridEntityType.GRAVITY]: undefined, // 19
  [GridEntityType.PRESSURE_PLATE]: "grid_pressureplate.anm2", // 20
  [GridEntityType.STATUE]: undefined, // 21
  [GridEntityType.ROCK_SUPER_SPECIAL]: "grid_rock.anm2", // 22
  [GridEntityType.TELEPORTER]: "grid_teleporter.anm2", // 23
  [GridEntityType.PILLAR]: "grid_rock.anm2", // 24
  [GridEntityType.ROCK_SPIKED]: "grid_rock.anm2", // 25
  [GridEntityType.ROCK_ALT_2]: "grid_rock.anm2", // 26
  [GridEntityType.ROCK_GOLD]: "grid_rock.anm2", // 27
} as const satisfies Record<GridEntityType, string | undefined>;
