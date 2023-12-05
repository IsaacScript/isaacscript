import { BossID, LevelStage, StageID } from "isaac-typescript-definitions";
import { BOSS_ID_VALUES } from "../arrays/cachedEnumValues";
import { isStoryBossID } from "../functions/storyBosses";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { ReadonlySet } from "../types/ReadonlySet";

// The "bosspools.xml" file does not actually correspond to the real boss pools, so these data
// structures were determined through experimentation on v1.7.8a.

// We use sets of strings instead of tuples for these data structures because TypeScript/Lua does
// not have real tuples. If we store bosses as tuples, then we cannot do a set lookup in O(1).

/** For `StageID.BASEMENT` (1). */
const BASEMENT_BOSSES = [
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
] as const;

/** For `StageID.CELLAR` (2). */
const CELLAR_BOSSES = [
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
] as const;

/** For `StageID.BURNING_BASEMENT` (3). */
const BURNING_BASEMENT_BOSSES = [
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
] as const;

/** For `StageID.DOWNPOUR` (27). */
const DOWNPOUR_BOSSES = [
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.RAINMAKER, // 77
  BossID.MIN_MIN, // 91
] as const;

/** For `StageID.DROSS` (28). */
const DROSS_BOSSES = [
  BossID.LIL_BLUB, // 75
  BossID.WORMWOOD, // 76
  BossID.CLOG, // 92
  BossID.COLOSTOMIA, // 95
  BossID.TURDLET, // 97
] as const;

/** The set of unique bosses for Basement, Cellar, Burning Basement, Downpour, and Dross. */
const ALL_BASEMENT_BOSSES_SET = new ReadonlySet<BossID>([
  ...BASEMENT_BOSSES,
  ...CELLAR_BOSSES,
  ...BURNING_BASEMENT_BOSSES,
  ...DOWNPOUR_BOSSES,
  ...DROSS_BOSSES,
]);

/** For `StageID.CAVES` (4). */
const CAVES_BOSSES = [
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
] as const;

/** For `StageID.CATACOMBS` (5). */
const CATACOMBS_BOSSES = [
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
] as const;

/** For `StageID.FLOODED_CAVES` (6). */
const FLOODED_CAVES_BOSSES = [
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
] as const;

/** For `StageID.MINES` (29). */
const MINES_BOSSES = [
  BossID.REAP_CREEP, // 74
  BossID.TUFF_TWINS, // 80
  BossID.HORNFEL, // 82
  BossID.GREAT_GIDEON, // 83
] as const;

/** For `StageID.ASHPIT` (30). */
const ASHPIT_BOSSES = [
  BossID.PILE, // 73
  BossID.GREAT_GIDEON, // 83
  BossID.SINGE, // 93
  BossID.SHELL, // 96
  BossID.CLUTCH, // 102
] as const;

/** The set of unique bosses for Caves, Catacombs, Flooded Caves, Mines, and Ashpit. */
const ALL_CAVES_BOSSES_SET = new ReadonlySet<BossID>([
  ...CAVES_BOSSES,
  ...CATACOMBS_BOSSES,
  ...FLOODED_CAVES_BOSSES,
  ...MINES_BOSSES,
  ...ASHPIT_BOSSES,
]);

/**
 * For `StageID.DEPTHS` (7).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const DEPTHS_BOSSES = [
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
] as const;

/**
 * For `StageID.NECROPOLIS` (8).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const NECROPOLIS_BOSSES = [
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
] as const;

/**
 * For `StageID.DANK_DEPTHS` (9).
 *
 * Note that this set includes Mom, even though they are not technically in the boss pool.
 */
const DANK_DEPTHS_BOSSES = [
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
] as const;

/**
 * For `StageID.MAUSOLEUM` (31).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const MAUSOLEUM_BOSSES = [
  BossID.SIREN, // 79
  BossID.HERETIC, // 81
  BossID.MAUSOLEUM_MOM, // 89
] as const;

/**
 * For `StageID.GEHENNA` (32).
 *
 * Note that this set includes Mausoleum Mom, even though they are not technically in the boss pool.
 */
const GEHENNA_BOSSES = [
  BossID.VISAGE, // 78
  BossID.MAUSOLEUM_MOM, // 89
  BossID.HORNY_BOYS, // 101
] as const;

/** The set of unique bosses for Depths, Necropolis, Dank Depths, Mausoleum, and Gehenna. */
const ALL_DEPTHS_BOSSES_SET = new ReadonlySet<BossID>([
  ...DEPTHS_BOSSES,
  ...NECROPOLIS_BOSSES,
  ...DANK_DEPTHS_BOSSES,
  ...MAUSOLEUM_BOSSES,
  ...GEHENNA_BOSSES,
]);

/**
 * For `StageID.WOMB` (10).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const WOMB_BOSSES = [
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
] as const;

/**
 * For `StageID.UTERO` (11).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const UTERO_BOSSES = [
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
] as const;

/**
 * For `StageID.SCARRED_WOMB` (12).
 *
 * Note that this set includes Mom's Heart & It Lives, even though they are not technically in the
 * boss pool.
 */
const SCARRED_WOMB_BOSSES = [
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
] as const;

/**
 * For `StageID.CORPSE` (33).
 *
 * Note that this set includes Mother, even though she is not technically in the boss pool.
 */
const CORPSE_BOSSES = [
  BossID.SCOURGE, // 85
  BossID.CHIMERA, // 86
  BossID.ROTGUT, // 87
  BossID.MOTHER, // 88
] as const;

/** The set of unique bosses for Womb, Utero, Scarred Womb, and Corpse. */
const ALL_WOMB_BOSSES_SET = new ReadonlySet([
  ...WOMB_BOSSES,
  ...UTERO_BOSSES,
  ...SCARRED_WOMB_BOSSES,
  ...CORPSE_BOSSES,
]);

const BLUE_WOMB_BOSSES = [
  BossID.HUSH, // 63
] as const;

const ALL_BLUE_WOMB_BOSSES_SET = new ReadonlySet<BossID>([...BLUE_WOMB_BOSSES]);

const SHEOL_BOSSES = [
  BossID.SATAN, // 24
] as const;

const CATHEDRAL_BOSSES = [
  BossID.ISAAC, // 39
] as const;

const ALL_STAGE_10_BOSSES_SET = new ReadonlySet<BossID>([
  ...SHEOL_BOSSES,
  ...CATHEDRAL_BOSSES,
]);

/**
 * Note that this set includes Mega Satan, even though they are not technically in the boss pool.
 */
const DARK_ROOM_BOSSES = [
  BossID.LAMB, // 54
  BossID.MEGA_SATAN, // 55
] as const;

/**
 * Note that this set includes Mega Satan, even though they are not technically in the boss pool.
 */
const CHEST_BOSSES = [
  BossID.BLUE_BABY, // 40
  BossID.MEGA_SATAN, // 55
] as const;

const ALL_STAGE_11_BOSSES_SET = new ReadonlySet<BossID>([
  ...DARK_ROOM_BOSSES,
  ...CHEST_BOSSES,
]);

const VOID_BOSSES = [
  BossID.DELIRIUM, // 70
] as const;

const ALL_VOID_BOSSES_SET = new ReadonlySet<BossID>([...VOID_BOSSES]);

/**
 * Includes Dogma and The Beast. Does not include Ultra Famine, Ultra Pestilence, Ultra War, and
 * Ultra Death (since they do not have boss IDs).
 */
const HOME_BOSSES = [
  BossID.DOGMA, // 99
  BossID.BEAST, // 100
] as const;

const ALL_HOME_BOSSES_SET = new ReadonlySet<BossID>([...HOME_BOSSES]);

export const STAGE_ID_TO_BOSS_IDS = new ReadonlyMap<StageID, readonly BossID[]>(
  [
    [StageID.BASEMENT, BASEMENT_BOSSES], // 1
    [StageID.CELLAR, CELLAR_BOSSES], // 2
    [StageID.BURNING_BASEMENT, BURNING_BASEMENT_BOSSES], // 3
    [StageID.DOWNPOUR, DOWNPOUR_BOSSES], // 27
    [StageID.DROSS, DROSS_BOSSES], // 28

    [StageID.CAVES, CAVES_BOSSES], // 4
    [StageID.CATACOMBS, CATACOMBS_BOSSES], // 5
    [StageID.FLOODED_CAVES, FLOODED_CAVES_BOSSES], // 6
    [StageID.MINES, MINES_BOSSES], // 29
    [StageID.ASHPIT, ASHPIT_BOSSES], // 30

    [StageID.DEPTHS, DEPTHS_BOSSES], // 7
    [StageID.NECROPOLIS, NECROPOLIS_BOSSES], // 8
    [StageID.DANK_DEPTHS, DANK_DEPTHS_BOSSES], // 9
    [StageID.MAUSOLEUM, MAUSOLEUM_BOSSES], // 31
    [StageID.GEHENNA, GEHENNA_BOSSES], // 32

    [StageID.WOMB, WOMB_BOSSES], // 10
    [StageID.UTERO, UTERO_BOSSES], // 11
    [StageID.SCARRED_WOMB, SCARRED_WOMB_BOSSES], // 12
    [StageID.CORPSE, CORPSE_BOSSES], // 33

    [StageID.BLUE_WOMB, BLUE_WOMB_BOSSES], // 13
    [StageID.SHEOL, SHEOL_BOSSES], // 14
    [StageID.CATHEDRAL, CATHEDRAL_BOSSES], // 15
    [StageID.DARK_ROOM, DARK_ROOM_BOSSES], // 16
    [StageID.CHEST, CHEST_BOSSES], // 17
    [StageID.VOID, VOID_BOSSES], // 26
    [StageID.HOME, HOME_BOSSES], // 35
  ],
);

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
  [LevelStage.BLUE_WOMB, ALL_BLUE_WOMB_BOSSES_SET], // 9
  [LevelStage.SHEOL_CATHEDRAL, ALL_STAGE_10_BOSSES_SET], // 10
  [LevelStage.DARK_ROOM_CHEST, ALL_STAGE_11_BOSSES_SET], // 11
  [LevelStage.VOID, ALL_VOID_BOSSES_SET], // 12
  [LevelStage.HOME, ALL_HOME_BOSSES_SET], // 13
]);

export const ALL_BOSSES: readonly BossID[] = BOSS_ID_VALUES.filter(
  (bossID) => bossID !== BossID.RAGLICH,
);

export const NON_STORY_BOSSES: readonly BossID[] = ALL_BOSSES.filter(
  (bossID) => !isStoryBossID(bossID),
);

export const BOSS_ID_TO_STAGE_IDS = (() => {
  const partialBossIDsToStageIDs: Partial<Record<BossID, Set<StageID>>> = {};

  for (const bossID of BOSS_ID_VALUES) {
    const stageIDs = new Set<StageID>();
    for (const [stageID, bossIDs] of STAGE_ID_TO_BOSS_IDS) {
      if (bossIDs.includes(bossID)) {
        stageIDs.add(stageID);
      }
    }

    partialBossIDsToStageIDs[bossID] = stageIDs;
  }

  const bossIDsToStageIDs = partialBossIDsToStageIDs as Record<
    BossID,
    Set<StageID>
  >;

  // In Repentance, the following bosses will have empty sets:
  // - BossID.ULTRA_GREED (62)
  // - BossID.ULTRA_GREEDIER (71)
  // - BossID.MAUSOLEUM_MOMS_HEART (90)
  // - BossID.RAGLICH (98)

  bossIDsToStageIDs[BossID.ULTRA_GREED].add(StageID.ULTRA_GREED_GREED_MODE); // 62
  bossIDsToStageIDs[BossID.ULTRA_GREEDIER].add(StageID.ULTRA_GREED_GREED_MODE); // 71
  bossIDsToStageIDs[BossID.MAUSOLEUM_MOMS_HEART].add(StageID.MAUSOLEUM); // 90
  bossIDsToStageIDs[BossID.MAUSOLEUM_MOMS_HEART].add(StageID.GEHENNA); // 90

  return bossIDsToStageIDs as Readonly<Record<BossID, ReadonlySet<StageID>>>;
})();
