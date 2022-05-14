/* eslint-disable sort-exports/sort-exports */

import {
  BigHornVariant,
  ChubVariant,
  DaddyLongLegsVariant,
  DingleVariant,
  DukeVariant,
  EntityType,
  FallenVariant,
  FistulaVariant,
  GeminiVariant,
  GurglingVariant,
  HauntVariant,
  IsaacVariant,
  LambVariant,
  LarryJrVariant,
  LittleHornVariant,
  LokiVariant,
  MamaGurdyVariant,
  MomsHeartVariant,
  MomVariant,
  Monstro2Variant,
  PeepVariant,
  PinVariant,
  PolycephalusVariant,
  RagManVariant,
  RagMegaVariant,
  SatanVariant,
  StageType,
  WarVariant,
  WidowVariant,
} from "isaac-typescript-definitions";

// The "bosspools.xml" file does not actually correspond to the real boss pools, so these sets were
// determined through experimentation on v1.7.8a.

/** Contains just the bosses in Basement (not e.g. Burning Basement). */
const BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.LARRY_JR}.${LarryJrVariant.LARRY_JR}`, // 19.0
  `${EntityType.MONSTRO}.0`, // 20.0
  `${EntityType.FAMINE}.0`, // 63.0
  `${EntityType.DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.GEMINI}.${GeminiVariant.GEMINI}`, // 79.0
  `${EntityType.GEMINI}.${GeminiVariant.STEVEN}`, // 79.1
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GURGLING}.${GurglingVariant.GURGLING_BOSS}`, // 237.1
  `${EntityType.GURGLING}.${GurglingVariant.TURDLING}`, // 237.2
  `${EntityType.DINGLE}.${DingleVariant.DINGLE}`, // 261.0
  `${EntityType.DINGLE}.${DingleVariant.DANGLE}`, // 261.1
  `${EntityType.LITTLE_HORN}.${LittleHornVariant.LITTLE_HORN}`, // 404.0
  `${EntityType.BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Cellar (not e.g. Burning Basement). */
const CELLAR_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.PIN}.${PinVariant.PIN}`, // 62.0
  `${EntityType.FAMINE}.0`, // 63.0
  `${EntityType.DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.GEMINI}.${GeminiVariant.BLIGHTED_OVUM}`, // 79.2
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.WIDOW}.${WidowVariant.WIDOW}`, // 100.0
  `${EntityType.THE_HAUNT}.${HauntVariant.HAUNT}`, // 260.0
  `${EntityType.LITTLE_HORN}.0`, // 404.0
  `${EntityType.RAG_MAN}.${RagManVariant.RAG_MAN}`, // 405.0
  `${EntityType.BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Burning Basement (not e.g. Cellar). */
const BURNING_BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.LARRY_JR}.${LarryJrVariant.LARRY_JR}`, // 19.0
  `${EntityType.MONSTRO}.0`, // 20.0
  `${EntityType.FAMINE}.0`, // 63.0
  `${EntityType.DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.GEMINI}.${GeminiVariant.GEMINI}`, // 79.0
  `${EntityType.GEMINI}.${GeminiVariant.STEVEN}`, // 79.1
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.DINGLE}.${DingleVariant.DINGLE}`, // 261.0
  `${EntityType.GURGLING}.${GurglingVariant.GURGLING_BOSS}`, // 237.1
  `${EntityType.GURGLING}.${GurglingVariant.TURDLING}`, // 237.2
  `${EntityType.DINGLE}.${DingleVariant.DANGLE}`, // 261.1
  `${EntityType.LITTLE_HORN}.0`, // 404.0
  `${EntityType.RAG_MAN}.${RagManVariant.RAG_MAN}`, // 405.0
  `${EntityType.BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Downpour (not e.g. Burning Basement). */
const DOWNPOUR_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.PIN}.${PinVariant.WORMWOOD}`, // 62.3
  `${EntityType.LIL_BLUB}.0`, // 901.0
  `${EntityType.RAINMAKER}.0`, // 902.0
  `${EntityType.MIN_MIN}.0`, // 913.0
]);

/** Contains just the bosses in Dross (not e.g. Burning Basement). */
const DROSS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.PIN}.${PinVariant.WORMWOOD}`, // 62.3
  `${EntityType.LIL_BLUB}.0`, // 901.0
  `${EntityType.CLOG}.0`, // 914.0
  `${EntityType.COLOSTOMIA}.0`, // 917.0
  `${EntityType.TURDLET}.0`, // 918.0
]);

/** The set of unique bosses for Basement, Cellar, and so on. */
const ALL_BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  ...BASEMENT_BOSSES_SET.values(),
  ...CELLAR_BOSSES_SET.values(),
  ...BURNING_BASEMENT_BOSSES_SET.values(),
  ...DOWNPOUR_BOSSES_SET.values(),
  ...DROSS_BOSSES_SET.values(),
]);

const BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, BASEMENT_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CELLAR_BOSSES_SET],
  [StageType.AFTERBIRTH, BURNING_BASEMENT_BOSSES_SET],
  [StageType.REPENTANCE, DOWNPOUR_BOSSES_SET],
  [StageType.REPENTANCE_B, DROSS_BOSSES_SET],
]);

/** Contains just the bosses in Caves (not e.g. Flooded Caves). */
const CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.CHUB}.${ChubVariant.CHUB}`, // 28.0
  `${EntityType.CHUB}.${ChubVariant.CHAD}`, // 28.1
  `${EntityType.GURDY}.0`, // 36.0
  `${EntityType.PESTILENCE}.0`, // 64.0
  `${EntityType.PEEP}.0`, // 68.0
  `${EntityType.FISTULA_BIG}.${FistulaVariant.FISTULA}`, // 71.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GURDY_JR}.0`, // 99.0
  `${EntityType.MEGA_MAW}.0`, // 262.0
  `${EntityType.MEGA_FATTY}.0`, // 264.0
  `${EntityType.STAIN}.0`, // 401.0
  `${EntityType.RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Catacombs (not e.g. Flooded Caves). */
const CATACOMBS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.LARRY_JR}.${LarryJrVariant.THE_HOLLOW}`, // 19.1
  `${EntityType.CHUB}.${ChubVariant.CARRION_QUEEN}`, // 28.2
  `${EntityType.PIN}.${PinVariant.FRAIL}`, // 62.2
  `${EntityType.PESTILENCE}.0`, // 64.0
  `${EntityType.DUKE}.${DukeVariant.THE_HUSK}`, // 67.1
  `${EntityType.PEEP}.${PeepVariant.PEEP}`, // 68.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GURDY_JR}.0`, // 99.0
  `${EntityType.WIDOW}.${WidowVariant.THE_WRETCHED}`, // 100.1
  `${EntityType.DARK_ONE}.0`, // 267.0
  `${EntityType.POLYCEPHALUS}.${PolycephalusVariant.POLYCEPHALUS}`, // 269.0
  `${EntityType.FORSAKEN}.0`, // 403.0
  `${EntityType.RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Flooded Caves (not e.g. Catacombs). */
const FLOODED_CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.CHUB}.${ChubVariant.CHUB}`, // 28.0
  `${EntityType.CHUB}.${ChubVariant.CHAD}`, // 28.1
  `${EntityType.GURDY}.0`, // 36.0
  `${EntityType.PIN}.${PinVariant.FRAIL}`, // 62.2
  `${EntityType.PESTILENCE}.0`, // 64.0
  `${EntityType.PEEP}.${PeepVariant.PEEP}`, // 68.0
  `${EntityType.FISTULA_BIG}.${FistulaVariant.FISTULA}`, // 71.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GURDY_JR}.0`, // 99.0
  `${EntityType.MEGA_MAW}.0`, // 262.0
  `${EntityType.MEGA_FATTY}.0`, // 264.0
  `${EntityType.STAIN}.0`, // 401.0
  `${EntityType.FORSAKEN}.0`, // 403.0
  `${EntityType.RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Mines (not e.g. Flooded Caves). */
const MINES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.LARRY_JR}.${LarryJrVariant.TUFF_TWIN}`, // 19.2
  `${EntityType.REAP_CREEP}.0`, // 900.0
  `${EntityType.HORNFEL}.0`, // 906.0
  `${EntityType.GIDEON}.0`, // 907.0
]);

/** Contains just the bosses in Ashpit (not e.g. Flooded Caves). */
const ASHPIT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.LARRY_JR}.${LarryJrVariant.THE_SHELL}`, // 19.3
  `${EntityType.POLYCEPHALUS}.${PolycephalusVariant.THE_PILE}`, // 269.1
  `${EntityType.GIDEON}.0`, // 907.0
  `${EntityType.SINGE}.0`, // 915.0
  `${EntityType.CLUTCH}.0`, // 921.0
]);

/** The set of unique bosses for Caves, Catacombs, and so on. */
const ALL_CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  ...CAVES_BOSSES_SET.values(),
  ...CATACOMBS_BOSSES_SET.values(),
  ...FLOODED_CAVES_BOSSES_SET.values(),
  ...MINES_BOSSES_SET.values(),
  ...ASHPIT_BOSSES_SET.values(),
]);

const CAVES_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, CAVES_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CATACOMBS_BOSSES_SET],
  [StageType.AFTERBIRTH, FLOODED_CAVES_BOSSES_SET],
  [StageType.REPENTANCE, MINES_BOSSES_SET],
  [StageType.REPENTANCE_B, ASHPIT_BOSSES_SET],
]);

/** Contains just the bosses in Depths (not e.g. Dank Depths). */
const DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.MONSTRO_2}.${Monstro2Variant.MONSTRO_2}`, // 43.0
  `${EntityType.MONSTRO_2}.${Monstro2Variant.GISH}`, // 43.1
  `${EntityType.MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GATE}.0`, // 263.0
  `${EntityType.CAGE}.0`, // 265.0
  `${EntityType.BROWNIE}.0`, // 402.0
  `${EntityType.SISTERS_VIS}.0`, // 410.0
  `${EntityType.REAP_CREEP}.0`, // 900.0
]);

/** Contains just the bosses in Necropolis (not e.g. Dank Depths). */
const NECROPOLIS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.PEEP}.${PeepVariant.BLOAT}`, // 68.1
  `${EntityType.LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.MASK_OF_INFAMY}.0`, // 97.0
  `${EntityType.ADVERSARY}.0`, // 268.0
  `${EntityType.POLYCEPHALUS}.${PolycephalusVariant.THE_PILE}`, // 269.1
  `${EntityType.BROWNIE}.0`, // 402.0
  `${EntityType.SISTERS_VIS}.0`, // 410.0
]);

/** Contains just the bosses in Dank Depths (not e.g. Necropolis). */
const DANK_DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.MONSTRO_2}.${Monstro2Variant.MONSTRO_2}`, // 43.0
  `${EntityType.MONSTRO_2}.${Monstro2Variant.GISH}`, // 43.1
  `${EntityType.MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.GATE}.0`, // 263.0
  `${EntityType.CAGE}.0`, // 265.0
  `${EntityType.BROWNIE}.0`, // 402.0
  `${EntityType.SISTERS_VIS}.0`, // 410.0
  `${EntityType.REAP_CREEP}.0`, // 900.0
]);

/** Contains just the bosses in Mausoleum (not e.g. Dank Depths). */
const MAUSOLEUM_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.SIREN}.0`, // 904.0
  `${EntityType.HERETIC}.0`, // 905.0
]);

/** Contains just the bosses in Gehenna (not e.g. Dank Depths). */
const GEHENNA_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.VISAGE}.0`, // 903.0
  `${EntityType.HORNY_BOYS}.0`, // 920.0
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
const ALL_DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  ...DEPTHS_BOSSES_SET.values(),
  ...NECROPOLIS_BOSSES_SET.values(),
  ...DANK_DEPTHS_BOSSES_SET.values(),
  ...MAUSOLEUM_BOSSES_SET.values(),
  ...GEHENNA_BOSSES_SET.values(),
]);

const DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, DEPTHS_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, NECROPOLIS_BOSSES_SET],
  [StageType.AFTERBIRTH, DANK_DEPTHS_BOSSES_SET],
  [StageType.REPENTANCE, MAUSOLEUM_BOSSES_SET],
  [StageType.REPENTANCE_B, GEHENNA_BOSSES_SET],
]);

/** Contains just the bosses in Womb (not e.g. Scarred Womb). */
const WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.PIN}.${PinVariant.SCOLEX}`, // 62.1
  `${EntityType.WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.DEATH}.0`, // 66.0
  `${EntityType.LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.BLASTOCYST_BIG}.0`, // 74.0
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.MAMA_GURDY}.0`, // 266.0
  `${EntityType.MR_FRED}.0`, // 270.0
  `${EntityType.MATRIARCH}.0`, // 413.0
]);

/** Contains just the bosses in Utero (not e.g. Scarred Womb). */
const UTERO_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.DEATH}.0`, // 66.0
  `${EntityType.DADDY_LONG_LEGS}.${DaddyLongLegsVariant.DADDY_LONG_LEGS}`, // 101.0
  `${EntityType.DADDY_LONG_LEGS}.${DaddyLongLegsVariant.TRIACHNID}`, // 101.1
  `${EntityType.PEEP}.${PeepVariant.BLOAT}`, // 68.1
  `${EntityType.LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.FISTULA_BIG}.${FistulaVariant.TERATOMA}`, // 71.1
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
]);

/** Contains just the bosses in Scarred Womb (not e.g. Utero). */
const SCARRED_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.PIN}.${PinVariant.SCOLEX}`, // 62.1
  `${EntityType.WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.DEATH}.0`, // 66.0
  `${EntityType.LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.BLASTOCYST_BIG}.0`, // 74.0
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.DADDY_LONG_LEGS}.${DaddyLongLegsVariant.TRIACHNID}`, // 101.1
  `${EntityType.MAMA_GURDY}.${MamaGurdyVariant.MAMA_GURDY}`, // 266.0
  `${EntityType.MR_FRED}.0`, // 270.0
  `${EntityType.MATRIARCH}.0`, // 413.0
]);

/** Contains just the bosses in Corpse (not e.g. Scarred Womb). */
const CORPSE_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.SCOURGE}.0`, // 909.0
  `${EntityType.CHIMERA}.0`, // 910.0
  `${EntityType.ROTGUT}.0`, // 911.0
  `${EntityType.MOTHER}.0`, // 912.0
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
const ALL_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  ...WOMB_BOSSES_SET.values(),
  ...UTERO_BOSSES_SET.values(),
  ...SCARRED_WOMB_BOSSES_SET.values(),
  ...MAUSOLEUM_BOSSES_SET.values(),
  ...GEHENNA_BOSSES_SET.values(),
]);

const WOMB_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, WOMB_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, UTERO_BOSSES_SET],
  [StageType.AFTERBIRTH, SCARRED_WOMB_BOSSES_SET],
  [StageType.REPENTANCE, CORPSE_BOSSES_SET],
]);

const BLUE_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.HUSH}.0`, // 407.0
]);

const BLUE_WOMB_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([[StageType.ORIGINAL, BLUE_WOMB_BOSSES_SET]]);

const SHEOL_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.SATAN}.${SatanVariant.SATAN}`, // 84.0
]);
const CATHEDRAL_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ISAAC}.${IsaacVariant.ISAAC}`, // 102.0
]);

const ALL_STAGE_10_BOSSES_SET: ReadonlySet<string> = new Set([
  ...SHEOL_BOSSES_SET.values(),
  ...CATHEDRAL_BOSSES_SET.values(),
]);

const STAGE_10_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, SHEOL_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CATHEDRAL_BOSSES_SET],
]);

const DARK_ROOM_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.THE_LAMB}.${LambVariant.LAMB}`, // 273.0
]);

const CHEST_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ISAAC}.${IsaacVariant.BLUE_BABY}`, // 102.1
]);

const ALL_STAGE_11_BOSSES_SET: ReadonlySet<string> = new Set([
  ...DARK_ROOM_BOSSES_SET.values(),
  ...CHEST_BOSSES_SET.values(),
]);

const STAGE_11_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.ORIGINAL, DARK_ROOM_BOSSES_SET],
  [StageType.WRATH_OF_THE_LAMB, CHEST_BOSSES_SET],
]);

export const STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  int,
  ReadonlyMap<int, ReadonlySet<string>>
> = new Map([
  [1, BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP],
  [2, BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP],
  [3, CAVES_STAGE_TYPE_TO_BOSS_SET_MAP],
  [4, CAVES_STAGE_TYPE_TO_BOSS_SET_MAP],
  [5, DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP],
  [6, DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP],
  [7, WOMB_STAGE_TYPE_TO_BOSS_SET_MAP],
  [8, WOMB_STAGE_TYPE_TO_BOSS_SET_MAP],
  [9, BLUE_WOMB_STAGE_TYPE_TO_BOSS_SET_MAP],
  [10, STAGE_10_STAGE_TYPE_TO_BOSS_SET_MAP],
  [11, STAGE_11_STAGE_TYPE_TO_BOSS_SET_MAP],
]);

export const STAGE_TO_COMBINED_BOSS_SET_MAP: ReadonlyMap<
  int,
  ReadonlySet<string>
> = new Map([
  [1, ALL_BASEMENT_BOSSES_SET],
  [2, ALL_BASEMENT_BOSSES_SET],
  [3, ALL_CAVES_BOSSES_SET],
  [4, ALL_CAVES_BOSSES_SET],
  [5, ALL_DEPTHS_BOSSES_SET],
  [6, ALL_DEPTHS_BOSSES_SET],
  [7, ALL_WOMB_BOSSES_SET],
  [8, ALL_WOMB_BOSSES_SET],
  [9, BLUE_WOMB_BOSSES_SET],
  [10, ALL_STAGE_10_BOSSES_SET],
  [11, ALL_STAGE_11_BOSSES_SET],
]);

export const ALL_BOSSES_SET: ReadonlySet<string> = new Set([
  ...ALL_BASEMENT_BOSSES_SET.values(),
  ...ALL_CAVES_BOSSES_SET.values(),
  ...ALL_DEPTHS_BOSSES_SET.values(),
  ...ALL_WOMB_BOSSES_SET.values(),
  ...BLUE_WOMB_BOSSES_SET.values(),
  ...ALL_STAGE_10_BOSSES_SET.values(),
  ...ALL_STAGE_11_BOSSES_SET.values(),
]);
