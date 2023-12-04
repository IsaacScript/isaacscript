import { BossID, LevelStage, StageID } from "isaac-typescript-definitions";
import { BOSS_ID_VALUES } from "../arrays/cachedEnumValues";
import { combineSets } from "../functions/set";
import { isStoryBossID } from "../functions/storyBosses";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { ReadonlySet } from "../types/ReadonlySet";

// The "bosspools.xml" file does not actually correspond to the real boss pools, so these sets were
// determined through experimentation on v1.7.8a.

// We use sets of strings instead of tuples for these data structures because TypeScript/Lua does
// not have real tuples. If we store bosses as tuples, then we cannot do a set lookup in O(1).

/** For `StageID.BASEMENT` (1). */
const BASEMENT_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MONSTRO, // 1
  BossID.LARRY_JR, // 2
  BossID.FAMINE, // 9
  BossID.DUKE_OF_FLIES, // 13
  BossID.GEMINI, // 17
  BossID.STEVEN, // 20
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.DINGLE, // 44
  BossID.GURGLING, // 56
  BossID.LITTLE_HORN, // 60
  // - `BossID.RAG_MAN` (61) was removed in Repentance.
  BossID.DANGLE, // 64
  BossID.TURDLING, // 65
  BossID.BABY_PLUM, // 84 (added in Repentance)
]);

/** For `StageID.CELLAR` (2). */
const CELLAR_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.FAMINE, // 9
  BossID.DUKE_OF_FLIES, // 13
  // - `BossID.FISTULA` (18) was removed in Repentance.
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.BLIGHTED_OVUM, // 32
  BossID.WIDOW, // 34
  BossID.PIN, // 37
  BossID.HAUNT, // 43
  BossID.LITTLE_HORN, // 60
  BossID.RAG_MAN, // 61
  BossID.BABY_PLUM, // 84 (added in Repentance)
]);

/** For `StageID.BURNING_BASEMENT` (3). */
const BURNING_BASEMENT_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MONSTRO, // 1
  BossID.LARRY_JR, // 2
  BossID.FAMINE, // 9
  BossID.DUKE_OF_FLIES, // 13
  BossID.GEMINI, // 17 (added in Repentance)
  BossID.STEVEN, // 20 (added in Repentance)
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  // - `BossID.HAUNT` (43) was removed in Repentance.
  BossID.DINGLE, // 44 (added in Repentance)
  BossID.GURGLING, // 56 (added in Repentance)
  BossID.LITTLE_HORN, // 60
  BossID.RAG_MAN, // 61
  BossID.DANGLE, // 64 (added in Repentance)
  BossID.TURDLING, // 65 (added in Repentance)
  BossID.BABY_PLUM, // 84 (added in Repentance)
]);

/** For `StageID.DOWNPOUR` (27). */
const DOWNPOUR_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.RAINMAKER, // 77
  BossID.MIN_MIN, // 91
]);

/** For `StageID.DROSS` (28). */
const DROSS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.CLOG, // 92
  BossID.COLOSTOMIA, // 95
  BossID.TURDLET, // 97
]);

/** The set of unique bosses for Basement, Cellar, Burning Basement, Downpour, and Dross. */
const ALL_BASEMENT_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  BASEMENT_BOSSES_SET,
  CELLAR_BOSSES_SET,
  BURNING_BASEMENT_BOSSES_SET,
  DOWNPOUR_BOSSES_SET,
  DROSS_BOSSES_SET,
);

/** For `StageID.CAVES` (4). */
const CAVES_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.CHUB, // 3
  BossID.GURDY, // 4
  BossID.PESTILENCE, // 10
  BossID.PEEP, // 14
  BossID.FISTULA, // 18 (added in Repentance)
  BossID.CHAD, // 21
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.GURDY_JR, // 28
  BossID.MEGA_FATTY, // 47
  BossID.MEGA_MAW, // 45
  // - `BossID.DARK_ONE` (50) was removed in Repentance.
  BossID.FALLEN, // 23
  BossID.STAIN, // 57
  // - `BossID.FORSAKEN` (59) was removed in Repentance.
  // - `BossID.FRAIL` (66) was removed in Repentance.
  BossID.RAG_MEGA, // 67
  BossID.BIG_HORN, // 69
  BossID.BUMBINO, // 94 (added in Repentance)
]);

/** For `StageID.CATACOMBS` (5). */
const CATACOMBS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.PESTILENCE, // 10
  BossID.PEEP, // 14
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.HOLLOW, // 26
  BossID.CARRION_QUEEN, // 27
  BossID.GURDY_JR, // 28
  BossID.HUSK, // 29
  BossID.WRETCHED, // 36
  BossID.DARK_ONE, // 50
  BossID.POLYCEPHALUS, // 52
  // - `BossID.STAIN` (57) was removed in Repentance.
  BossID.FORSAKEN, // 59
  BossID.FRAIL, // 66
  BossID.RAG_MEGA, // 67
  BossID.BIG_HORN, // 69
  BossID.BUMBINO, // 94 (added in Repentance)
]);

/** For `StageID.FLOODED_CAVES` (6). */
const FLOODED_CAVES_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.CHUB, // 3
  BossID.GURDY, // 4
  BossID.PESTILENCE, // 10
  BossID.PEEP, // 14
  BossID.FISTULA, // 18 (added in Repentance)
  BossID.CHAD, // 21
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.GURDY_JR, // 28
  BossID.MEGA_MAW, // 45 (added in Repentance)
  BossID.MEGA_FATTY, // 47 (added in Repentance)
  // - `BossID.DARK_ONE` (50) was removed in Repentance.
  // - `BossID.POLYCEPHALUS` (52) was removed in Repentance.
  BossID.STAIN, // 57
  BossID.FORSAKEN, // 59
  BossID.FRAIL, // 66
  BossID.RAG_MEGA, // 67
  BossID.BIG_HORN, // 69
  BossID.BUMBINO, // 94 (added in Repentance)
]);

/** For `StageID.MINES` (29). */
const MINES_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.REAP_CREEP, // 74
  BossID.TUFF_TWINS, // 80
  BossID.HORNFEL, // 82
  BossID.GREAT_GIDEON, // 83
]);

/** For `StageID.ASHPIT` (30). */
const ASHPIT_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.PILE, // 73
  BossID.GREAT_GIDEON, // 83
  BossID.SINGE, // 93
  BossID.SHELL, // 96
  BossID.CLUTCH, // 102
]);

/** The set of unique bosses for Caves, Catacombs, Flooded Caves, Mines, and Ashpit. */
const ALL_CAVES_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  CAVES_BOSSES_SET,
  CATACOMBS_BOSSES_SET,
  FLOODED_CAVES_BOSSES_SET,
  MINES_BOSSES_SET,
  ASHPIT_BOSSES_SET,
);

/**
 * For `StageID.DEPTHS` (7).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const DEPTHS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MONSTRO_2, // 5
  BossID.MOM, // 6
  BossID.WAR, // 11
  BossID.LOKI, // 15
  BossID.GISH, // 19
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.GATE, // 46
  BossID.CAGE, // 48
  // - `BossID.ADVERSARY` (51) was removed in Repentance.
  BossID.BROWNIE, // 58
  BossID.SISTERS_VIS, // 68
  BossID.REAP_CREEP, // 74 (added in Repentance)
]);

/**
 * For `StageID.NECROPOLIS` (8).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const NECROPOLIS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MOM, // 6
  BossID.WAR, // 11
  BossID.LOKI, // 15
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.BLOAT, // 30
  BossID.MASK_OF_INFAMY, // 35
  // - `BossID.GATE` (46) was removed in Repentance.
  BossID.ADVERSARY, // 51
  BossID.BROWNIE, // 58
  BossID.SISTERS_VIS, // 68
  BossID.PILE, // 73 (added in Repentance)
]);

/**
 * For `StageID.DANK_DEPTHS` (9).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const DANK_DEPTHS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MONSTRO_2, // 5
  BossID.MOM, // 6
  BossID.WAR, // 11
  BossID.LOKI, // 15
  BossID.GISH, // 19
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.GATE, // 46 (added in Repentance)
  BossID.CAGE, // 48 (added in Repentance)
  // - `BossID.ADVERSARY` (51) was removed in Repentance.
  BossID.BROWNIE, // 58
  BossID.SISTERS_VIS, // 68
  BossID.REAP_CREEP, // 74 (added in Repentance)
]);

/**
 * For `StageID.MAUSOLEUM` (31).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const MAUSOLEUM_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SIREN, // 79
  BossID.HERETIC, // 81
  BossID.MAUSOLEUM_MOM, // 89
]);

/**
 * For `StageID.GEHENNA` (32).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const GEHENNA_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.VISAGE, // 78
  BossID.MAUSOLEUM_MOM, // 89
  BossID.HORNY_BOYS, // 101
]);

/** The set of unique bosses for Depths, Necropolis, Dank Depths, Mausoleum, and Gehenna. */
const ALL_DEPTHS_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  DEPTHS_BOSSES_SET,
  NECROPOLIS_BOSSES_SET,
  DANK_DEPTHS_BOSSES_SET,
  MAUSOLEUM_BOSSES_SET,
  GEHENNA_BOSSES_SET,
);

/**
 * For `StageID.WOMB` (10).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const WOMB_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SCOLEX, // 7
  BossID.MOMS_HEART, // 8
  BossID.DEATH, // 12
  BossID.BLASTOCYST, // 16
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.IT_LIVES, // 25
  // - `BossID.BLOAT` (30) was removed in Repentance.
  BossID.LOKII, // 31
  // - `BossID.TERATOMA` (33) was removed in Repentance.
  BossID.CONQUEST, // 38
  // - `BossID.DADDY_LONG_LEGS` (41) was removed in Repentance.
  // - `BossID.TRIACHNID` (42) was removed in Repentance.
  BossID.MAMA_GURDY, // 49
  BossID.MR_FRED, // 53
  // - `BossID.SISTERS_VIS` (68) was removed in Repentance.
  BossID.MATRIARCH, // 72
]);

/**
 * For `StageID.UTERO` (11).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const UTERO_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.MOMS_HEART, // 8
  BossID.DEATH, // 12
  // - `BossID.BLASTOCYST` (16) was removed in Repentance.
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.IT_LIVES, // 25
  BossID.BLOAT, // 30
  BossID.LOKII, // 31
  BossID.TERATOMA, // 33
  BossID.CONQUEST, // 38
  BossID.DADDY_LONG_LEGS, // 41
  BossID.TRIACHNID, // 42
  // - `BossID.MAMA_GURDY` (49) was removed in Repentance.
  // - `BossID.MR_FRED` (52) was removed in Repentance.
  // - `BossID.SISTERS_VIS` (68) was removed in Repentance.
  // - `BossID.MATRIARCH` (72) was removed in Repentance.
]);

/**
 * For `StageID.SCARRED_WOMB` (12).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const SCARRED_WOMB_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SCOLEX, // 7
  BossID.MOMS_HEART, // 8
  BossID.DEATH, // 12
  BossID.BLASTOCYST, // 16
  BossID.HEADLESS_HORSEMAN, // 22
  BossID.FALLEN, // 23
  BossID.IT_LIVES, // 25
  // - `BossID.BLOAT` (30) was removed in Repentance.
  BossID.LOKII, // 31 (added in Repentance)
  // - `BossID.TERATOMA` (33) was removed in Repentance.
  BossID.CONQUEST, // 38
  // - `BossID.DADDY_LONG_LEGS` (41) was removed in Repentance.
  BossID.TRIACHNID, // 42
  BossID.MAMA_GURDY, // 49
  BossID.MR_FRED, // 53 (added in Repentance)
  // - `BossID.SISTERS_VIS` (68) was removed in Repentance.
  BossID.MATRIARCH, // 72
]);

/**
 * For `StageID.CORPSE` (33).
 *
 * Note that this set includes Mother, even though she is not technically in the boss pool.
 */
const CORPSE_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SCOURGE, // 85
  BossID.CHIMERA, // 86
  BossID.ROTGUT, // 87
  BossID.MOTHER, // 88
]);

/** The set of unique bosses for Womb, Utero, Scarred Womb, and Corpse. */
const ALL_WOMB_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  WOMB_BOSSES_SET,
  UTERO_BOSSES_SET,
  SCARRED_WOMB_BOSSES_SET,
  CORPSE_BOSSES_SET,
);

const BLUE_WOMB_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.HUSH, // 63
]);

const SHEOL_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SATAN, // 24
]);

const CATHEDRAL_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.ISAAC, // 39
]);

const ALL_STAGE_10_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  SHEOL_BOSSES_SET,
  CATHEDRAL_BOSSES_SET,
);

/**
 * Note that this set includes Mega Satan, even though they are not technically in the boss pool.
 */
const DARK_ROOM_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.LAMB, // 54
  BossID.MEGA_SATAN, // 55
]);

/**
 * Note that this set includes Mega Satan, even though they are not technically in the boss pool.
 */
const CHEST_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.BLUE_BABY, // 40
  BossID.MEGA_SATAN, // 55
]);

const ALL_STAGE_11_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  DARK_ROOM_BOSSES_SET,
  CHEST_BOSSES_SET,
);

const VOID_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.DELIRIUM, // 70
]);

/**
 * Includes Dogma and The Beast. Does not include Ultra Famine, Ultra Pestilence, Ultra War, and
 * Ultra Death (since they do not have boss IDs).
 */
const HOME_BOSSES_SET = new ReadonlySet<BossID>([BossID.DOGMA, BossID.BEAST]);

export const STAGE_ID_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageID,
  ReadonlySet<BossID>
>([
  [StageID.BASEMENT, BASEMENT_BOSSES_SET], // 1
  [StageID.CELLAR, CELLAR_BOSSES_SET], // 2
  [StageID.BURNING_BASEMENT, BURNING_BASEMENT_BOSSES_SET], // 3
  [StageID.DOWNPOUR, DOWNPOUR_BOSSES_SET], // 27
  [StageID.DROSS, DROSS_BOSSES_SET], // 28

  [StageID.CAVES, CAVES_BOSSES_SET], // 4
  [StageID.CATACOMBS, CATACOMBS_BOSSES_SET], // 5
  [StageID.FLOODED_CAVES, FLOODED_CAVES_BOSSES_SET], // 6
  [StageID.MINES, MINES_BOSSES_SET], // 29
  [StageID.ASHPIT, ASHPIT_BOSSES_SET], // 30

  [StageID.DEPTHS, DEPTHS_BOSSES_SET], // 7
  [StageID.NECROPOLIS, NECROPOLIS_BOSSES_SET], // 8
  [StageID.DANK_DEPTHS, DANK_DEPTHS_BOSSES_SET], // 9
  [StageID.MAUSOLEUM, MAUSOLEUM_BOSSES_SET], // 31
  [StageID.GEHENNA, GEHENNA_BOSSES_SET], // 32

  [StageID.WOMB, WOMB_BOSSES_SET], // 10
  [StageID.UTERO, UTERO_BOSSES_SET], // 11
  [StageID.SCARRED_WOMB, SCARRED_WOMB_BOSSES_SET], // 12
  [StageID.CORPSE, CORPSE_BOSSES_SET], // 33

  [StageID.BLUE_WOMB, BLUE_WOMB_BOSSES_SET], // 13
  [StageID.SHEOL, SHEOL_BOSSES_SET], // 14
  [StageID.CATHEDRAL, CATHEDRAL_BOSSES_SET], // 15
  [StageID.DARK_ROOM, DARK_ROOM_BOSSES_SET], // 16
  [StageID.CHEST, CHEST_BOSSES_SET], // 17
  [StageID.VOID, VOID_BOSSES_SET], // 26
  [StageID.HOME, HOME_BOSSES_SET], // 35
]);

export const STAGE_TO_COMBINED_BOSS_SET_MAP = new ReadonlyMap<
  LevelStage,
  ReadonlySet<BossID>
>([
  [LevelStage.BASEMENT_1, ALL_BASEMENT_BOSSES_SET], // 1
  [LevelStage.BASEMENT_2, ALL_BASEMENT_BOSSES_SET], // 2
  [LevelStage.CAVES_1, ALL_CAVES_BOSSES_SET], // 3
  [LevelStage.CAVES_2, ALL_CAVES_BOSSES_SET], // 4
  [LevelStage.DEPTHS_1, ALL_DEPTHS_BOSSES_SET], // 5
  [LevelStage.DEPTHS_2, ALL_DEPTHS_BOSSES_SET], // 6
  [LevelStage.WOMB_1, ALL_WOMB_BOSSES_SET], // 7
  [LevelStage.WOMB_2, ALL_WOMB_BOSSES_SET], // 8
  [LevelStage.BLUE_WOMB, BLUE_WOMB_BOSSES_SET], // 9
  [LevelStage.SHEOL_CATHEDRAL, ALL_STAGE_10_BOSSES_SET], // 10
  [LevelStage.DARK_ROOM_CHEST, ALL_STAGE_11_BOSSES_SET], // 11
  [LevelStage.VOID, VOID_BOSSES_SET], // 12
  [LevelStage.HOME, HOME_BOSSES_SET], // 13
]);

export const ALL_BOSSES_SET = new ReadonlySet<BossID>(
  BOSS_ID_VALUES.filter((bossID) => bossID !== BossID.RAGLICH),
);

export const ALL_BOSSES_EXCLUDING_STORY_BOSSES_SET = new ReadonlySet(
  [...ALL_BOSSES_SET].filter((bossID) => !isStoryBossID(bossID)),
);

export const BOSS_ID_TO_STAGE_IDS = (() => {
  const bossIDsToStageIDs: Partial<Record<BossID, Set<StageID>>> = {};

  for (const bossID of BOSS_ID_VALUES) {
    const stageIDs = new Set<StageID>();
    for (const [stageID, bossSet] of STAGE_ID_TO_BOSS_SET_MAP) {
      if (bossSet.has(bossID)) {
        stageIDs.add(stageID);
      }
    }

    bossIDsToStageIDs[bossID] = stageIDs;
  }

  return bossIDsToStageIDs as Readonly<Record<BossID, ReadonlySet<StageID>>>;
})();
