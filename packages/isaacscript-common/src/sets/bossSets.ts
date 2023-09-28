import { BossID, LevelStage, StageType } from "isaac-typescript-definitions";
import { combineSets, copySet, deleteSetsFromSet } from "../functions/set";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { ReadonlySet } from "../types/ReadonlySet";
import { STORY_BOSSES_SET } from "./storyBossesSet";

// The "bosspools.xml" file does not actually correspond to the real boss pools, so these sets were
// determined through experimentation on v1.7.8a.

// We use sets of strings instead of tuples for these data structures because TypeScript/Lua does
// not have real tuples. If we store bosses as tuples, then we cannot do a set lookup in O(1).

/** Contains just the bosses in Basement (not e.g. Burning Basement). */
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

/** Contains just the bosses in Cellar (not e.g. Burning Basement). */
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

/** Contains just the bosses in Burning Basement (not e.g. Cellar). */
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

/** Contains just the bosses in Downpour (not e.g. Burning Basement). */
const DOWNPOUR_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.RAINMAKER, // 77
  BossID.MIN_MIN, // 91
]);

/** Contains just the bosses in Dross (not e.g. Burning Basement). */
const DROSS_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.CLOG, // 92
  BossID.COLOSTOMIA, // 95
  BossID.TURDLET, // 97
]);

/** The set of unique bosses for Basement, Cellar, and so on. */
const ALL_BASEMENT_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  BASEMENT_BOSSES_SET,
  CELLAR_BOSSES_SET,
  BURNING_BASEMENT_BOSSES_SET,
  DOWNPOUR_BOSSES_SET,
  DROSS_BOSSES_SET,
);

const BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, BASEMENT_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CELLAR_BOSSES_SET],
  [StageType.AFTERBIRTH, BURNING_BASEMENT_BOSSES_SET],
  [StageType.REPENTANCE, DOWNPOUR_BOSSES_SET],
  [StageType.REPENTANCE_B, DROSS_BOSSES_SET],
]);

/** Contains just the bosses in Caves (not e.g. Flooded Caves). */
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

/** Contains just the bosses in Catacombs (not e.g. Flooded Caves). */
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

/** Contains just the bosses in Flooded Caves (not e.g. Catacombs). */
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

/** Contains just the bosses in Mines (not e.g. Flooded Caves). */
const MINES_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.REAP_CREEP, // 74
  BossID.TUFF_TWINS, // 80
  BossID.HORNFEL, // 82
  BossID.GREAT_GIDEON, // 83
]);

/** Contains just the bosses in Ashpit (not e.g. Flooded Caves). */
const ASHPIT_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.PILE, // 73
  BossID.GREAT_GIDEON, // 83
  BossID.SINGE, // 93
  BossID.SHELL, // 96
  BossID.CLUTCH, // 102
]);

/** The set of unique bosses for Caves, Catacombs, and so on. */
const ALL_CAVES_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  CAVES_BOSSES_SET,
  CATACOMBS_BOSSES_SET,
  FLOODED_CAVES_BOSSES_SET,
  MINES_BOSSES_SET,
  ASHPIT_BOSSES_SET,
);

const CAVES_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, CAVES_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CATACOMBS_BOSSES_SET],
  [StageType.AFTERBIRTH, FLOODED_CAVES_BOSSES_SET],
  [StageType.REPENTANCE, MINES_BOSSES_SET],
  [StageType.REPENTANCE_B, ASHPIT_BOSSES_SET],
]);

/**
 * Contains just the bosses in Depths (not e.g. Dank Depths).
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
 * Contains just the bosses in Necropolis (not e.g. Dank Depths).
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
 * Contains just the bosses in Dank Depths (not e.g. Necropolis).
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
 * Contains just the bosses in Mausoleum (not e.g. Dank Depths).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const MAUSOLEUM_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SIREN, // 79
  BossID.HERETIC, // 81
  BossID.MAUSOLEUM_MOM, // 89
]);

/**
 * Contains just the bosses in Gehenna (not e.g. Dank Depths).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const GEHENNA_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.VISAGE, // 78
  BossID.MAUSOLEUM_MOM, // 89
  BossID.HORNY_BOYS, // 101
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
const ALL_DEPTHS_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  DEPTHS_BOSSES_SET,
  NECROPOLIS_BOSSES_SET,
  DANK_DEPTHS_BOSSES_SET,
  MAUSOLEUM_BOSSES_SET,
  GEHENNA_BOSSES_SET,
);

const DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, DEPTHS_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, NECROPOLIS_BOSSES_SET],
  [StageType.AFTERBIRTH, DANK_DEPTHS_BOSSES_SET],
  [StageType.REPENTANCE, MAUSOLEUM_BOSSES_SET],
  [StageType.REPENTANCE_B, GEHENNA_BOSSES_SET],
]);

/**
 * Contains just the bosses in Womb (not e.g. Scarred Womb).
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
 * Contains just the bosses in Utero (not e.g. Scarred Womb).
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
 * Contains just the bosses in Scarred Womb (not e.g. Utero).
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
 * Contains just the bosses in Corpse (not e.g. Scarred Womb).
 *
 * Note that this set includes Mother, even though they are not technically in the boss pool.
 */
const CORPSE_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.SCOURGE, // 85
  BossID.CHIMERA, // 86
  BossID.ROTGUT, // 87
  BossID.MOTHER, // 88
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
const ALL_WOMB_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  WOMB_BOSSES_SET,
  UTERO_BOSSES_SET,
  SCARRED_WOMB_BOSSES_SET,
  MAUSOLEUM_BOSSES_SET,
  GEHENNA_BOSSES_SET,
);

const WOMB_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, WOMB_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, UTERO_BOSSES_SET],
  [StageType.AFTERBIRTH, SCARRED_WOMB_BOSSES_SET],
  [StageType.REPENTANCE, CORPSE_BOSSES_SET],
]);

const BLUE_WOMB_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.HUSH, // 63
]);

const BLUE_WOMB_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([[StageType.ORIGINAL, BLUE_WOMB_BOSSES_SET]]);

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

const STAGE_10_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, SHEOL_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CATHEDRAL_BOSSES_SET],
]);

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

const STAGE_11_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([
  [StageType.ORIGINAL, DARK_ROOM_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CHEST_BOSSES_SET],
]);

const VOID_BOSSES_SET = new ReadonlySet<BossID>([
  BossID.DELIRIUM, // 70
]);

const VOID_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([[StageType.ORIGINAL, VOID_BOSSES_SET]]);

/** Note that this does not include Ultra Famine, Ultra Pestilence, Ultra War, and Ultra Death. */
const HOME_BOSSES_SET = new ReadonlySet<BossID>([BossID.DOGMA, BossID.BEAST]);

const HOME_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  StageType,
  ReadonlySet<BossID>
>([[StageType.ORIGINAL, HOME_BOSSES_SET]]);

export const STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP = new ReadonlyMap<
  LevelStage,
  ReadonlyMap<int, ReadonlySet<BossID>>
>([
  [LevelStage.BASEMENT_1, BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP], // 1
  [LevelStage.BASEMENT_2, BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP], // 2
  [LevelStage.CAVES_1, CAVES_STAGE_TYPE_TO_BOSS_SET_MAP], // 3
  [LevelStage.CAVES_2, CAVES_STAGE_TYPE_TO_BOSS_SET_MAP], // 4
  [LevelStage.DEPTHS_1, DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP], // 5
  [LevelStage.DEPTHS_2, DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP], // 6
  [LevelStage.WOMB_1, WOMB_STAGE_TYPE_TO_BOSS_SET_MAP], // 7
  [LevelStage.WOMB_2, WOMB_STAGE_TYPE_TO_BOSS_SET_MAP], // 8
  [LevelStage.BLUE_WOMB, BLUE_WOMB_STAGE_TYPE_TO_BOSS_SET_MAP], // 9
  [LevelStage.SHEOL_CATHEDRAL, STAGE_10_STAGE_TYPE_TO_BOSS_SET_MAP], // 10
  [LevelStage.DARK_ROOM_CHEST, STAGE_11_STAGE_TYPE_TO_BOSS_SET_MAP], // 11
  [LevelStage.VOID, VOID_STAGE_TYPE_TO_BOSS_SET_MAP], // 12
  [LevelStage.HOME, HOME_STAGE_TYPE_TO_BOSS_SET_MAP], // 13
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

export const ALL_BOSSES_SET: ReadonlySet<BossID> = combineSets(
  ALL_BASEMENT_BOSSES_SET,
  ALL_CAVES_BOSSES_SET,
  ALL_DEPTHS_BOSSES_SET,
  ALL_WOMB_BOSSES_SET,
  BLUE_WOMB_BOSSES_SET,
  ALL_STAGE_10_BOSSES_SET,
  ALL_STAGE_11_BOSSES_SET,
  VOID_BOSSES_SET,
  HOME_BOSSES_SET,
);

const STORY_BOSS_IDS_SET = new ReadonlySet([
  BossID.MOM, // 6
  BossID.MOMS_HEART, // 8
  BossID.SATAN, // 24
  BossID.ISAAC, // 39
  BossID.LAMB, // 54
  BossID.MEGA_SATAN, // 55
  // Mega Satan 2 does not have a dedicated boss room.
  BossID.ULTRA_GREED, // 62
  BossID.HUSH, // 63
  BossID.DELIRIUM, // 70
  BossID.MOTHER, // 88
  BossID.MAUSOLEUM_MOM, // 89
  BossID.MAUSOLEUM_MOMS_HEART, // 90
  BossID.DOGMA, // 99
  BossID.BEAST, // 100
]);

// We add one for Mega Satan 2 and minus 2 for the two Mausoleum bosses.
if (STORY_BOSS_IDS_SET.size + 1 - 2 !== STORY_BOSSES_SET.size) {
  error('The "STORY_BOSS_IDS_SET" and the "STORY_BOSSES_SET" do not match.');
}

export const ALL_BOSSES_EXCLUDING_STORY_BOSSES_SET: ReadonlySet<BossID> =
  (() => {
    const allBossesSet = copySet(ALL_BOSSES_SET);
    deleteSetsFromSet(allBossesSet, STORY_BOSS_IDS_SET);

    return allBossesSet;
  })();
