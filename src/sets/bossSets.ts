/* eslint-disable sort-exports/sort-exports */

// The "bosspools.xml" file does not actually correspond to the real boss pools, so these sets were
// determined through experimentation on v1.7.8a

/** Contains just the bosses in Basement (not e.g. Burning Basement). */
export const BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_LARRYJR}.${LarryJrVariant.LARRY_JR}`, // 19.0
  `${EntityType.ENTITY_MONSTRO}.0`, // 20.0
  `${EntityType.ENTITY_FAMINE}.0`, // 63.0
  `${EntityType.ENTITY_DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.ENTITY_GEMINI}.${GeminiVariant.GEMINI}`, // 79.0
  `${EntityType.ENTITY_GEMINI}.${GeminiVariant.STEVEN}`, // 79.1
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GURGLING}.${GurglingVariant.GURGLING_BOSS}`, // 237.1
  `${EntityType.ENTITY_GURGLING}.${GurglingVariant.TURDLING}`, // 237.2
  `${EntityType.ENTITY_DINGLE}.${DingleVariant.DINGLE}`, // 261.0
  `${EntityType.ENTITY_DINGLE}.${DingleVariant.DANGLE}`, // 261.1
  `${EntityType.ENTITY_LITTLE_HORN}.${LittleHornVariant.LITTLE_HORN}`, // 404.0
  `${EntityType.ENTITY_BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Cellar (not e.g. Burning Basement). */
export const CELLAR_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_PIN}.${PinVariant.PIN}`, // 62.0
  `${EntityType.ENTITY_FAMINE}.0`, // 63.0
  `${EntityType.ENTITY_DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.ENTITY_GEMINI}.${GeminiVariant.BLIGHTED_OVUM}`, // 79.2
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_WIDOW}.${WidowVariant.WIDOW}`, // 100.0
  `${EntityType.ENTITY_THE_HAUNT}.${HauntVariant.HAUNT}`, // 260.0
  `${EntityType.ENTITY_LITTLE_HORN}.0`, // 404.0
  `${EntityType.ENTITY_RAG_MAN}.${RagManVariant.RAG_MAN}`, // 405.0
  `${EntityType.ENTITY_BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Burning Basement (not e.g. Cellar). */
export const BURNING_BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_LARRYJR}.${LarryJrVariant.LARRY_JR}`, // 19.0
  `${EntityType.ENTITY_MONSTRO}.0`, // 20.0
  `${EntityType.ENTITY_FAMINE}.0`, // 63.0
  `${EntityType.ENTITY_DUKE}.${DukeVariant.DUKE_OF_FLIES}`, // 67.0
  `${EntityType.ENTITY_GEMINI}.${GeminiVariant.GEMINI}`, // 79.0
  `${EntityType.ENTITY_GEMINI}.${GeminiVariant.STEVEN}`, // 79.1
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_DINGLE}.${DingleVariant.DINGLE}`, // 261.0
  `${EntityType.ENTITY_GURGLING}.${GurglingVariant.GURGLING_BOSS}`, // 237.1
  `${EntityType.ENTITY_GURGLING}.${GurglingVariant.TURDLING}`, // 237.2
  `${EntityType.ENTITY_DINGLE}.${DingleVariant.DANGLE}`, // 261.1
  `${EntityType.ENTITY_LITTLE_HORN}.0`, // 404.0
  `${EntityType.ENTITY_RAG_MAN}.${RagManVariant.RAG_MAN}`, // 405.0
  `${EntityType.ENTITY_BABY_PLUM}.0`, // 908.0
]);

/** Contains just the bosses in Downpour (not e.g. Burning Basement). */
export const DOWNPOUR_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_PIN}.${PinVariant.WORMWOOD}`, // 62.3
  `${EntityType.ENTITY_LIL_BLUB}.0`, // 901.0
  `${EntityType.ENTITY_RAINMAKER}.0`, // 902.0
  `${EntityType.ENTITY_MIN_MIN}.0`, // 913.0
]);

/** Contains just the bosses in Dross (not e.g. Burning Basement). */
export const DROSS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_PIN}.${PinVariant.WORMWOOD}`, // 62.3
  `${EntityType.ENTITY_LIL_BLUB}.0`, // 901.0
  `${EntityType.ENTITY_CLOG}.0`, // 914.0
  `${EntityType.ENTITY_COLOSTOMIA}.0`, // 917.0
  `${EntityType.ENTITY_TURDLET}.0`, // 918.0
]);

/** The set of unique bosses for Basement, Cellar, and so on. */
export const ALL_BASEMENT_BOSSES_SET: ReadonlySet<string> = new Set([
  ...BASEMENT_BOSSES_SET.values(),
  ...CELLAR_BOSSES_SET.values(),
  ...BURNING_BASEMENT_BOSSES_SET.values(),
  ...DOWNPOUR_BOSSES_SET.values(),
  ...DROSS_BOSSES_SET.values(),
]);

export const BASEMENT_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, BASEMENT_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, CELLAR_BOSSES_SET],
  [StageType.STAGETYPE_AFTERBIRTH, BURNING_BASEMENT_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE, DOWNPOUR_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE_B, DROSS_BOSSES_SET],
]);

/** Contains just the bosses in Caves (not e.g. Flooded Caves). */
export const CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_CHUB}.${ChubVariant.CHUB}`, // 28.0
  `${EntityType.ENTITY_CHUB}.${ChubVariant.CHAD}`, // 28.1
  `${EntityType.ENTITY_GURDY}.0`, // 36.0
  `${EntityType.ENTITY_PESTILENCE}.0`, // 64.0
  `${EntityType.ENTITY_PEEP}.0`, // 68.0
  `${EntityType.ENTITY_FISTULA_BIG}.${FistulaVariant.FISTULA}`, // 71.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GURDY_JR}.0`, // 99.0
  `${EntityType.ENTITY_MEGA_MAW}.0`, // 262.0
  `${EntityType.ENTITY_MEGA_FATTY}.0`, // 264.0
  `${EntityType.ENTITY_STAIN}.0`, // 401.0
  `${EntityType.ENTITY_RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.ENTITY_BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Catacombs (not e.g. Flooded Caves). */
export const CATACOMBS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_LARRYJR}.${LarryJrVariant.THE_HOLLOW}`, // 19.1
  `${EntityType.ENTITY_CHUB}.${ChubVariant.CARRION_QUEEN}`, // 28.2
  `${EntityType.ENTITY_PIN}.${PinVariant.FRAIL}`, // 62.2
  `${EntityType.ENTITY_PESTILENCE}.0`, // 64.0
  `${EntityType.ENTITY_DUKE}.${DukeVariant.THE_HUSK}`, // 67.1
  `${EntityType.ENTITY_PEEP}.${PeepVariant.PEEP}`, // 68.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GURDY_JR}.0`, // 99.0
  `${EntityType.ENTITY_WIDOW}.${WidowVariant.THE_WRETCHED}`, // 100.1
  `${EntityType.ENTITY_DARK_ONE}.0`, // 267.0
  `${EntityType.ENTITY_POLYCEPHALUS}.${PolycephalusVariant.POLYCEPHALUS}`, // 269.0
  `${EntityType.ENTITY_FORSAKEN}.0`, // 403.0
  `${EntityType.ENTITY_RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.ENTITY_BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Flooded Caves (not e.g. Catacombs). */
export const FLOODED_CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_CHUB}.${ChubVariant.CHUB}`, // 28.0
  `${EntityType.ENTITY_CHUB}.${ChubVariant.CHAD}`, // 28.1
  `${EntityType.ENTITY_GURDY}.0`, // 36.0
  `${EntityType.ENTITY_PIN}.${PinVariant.FRAIL}`, // 62.2
  `${EntityType.ENTITY_PESTILENCE}.0`, // 64.0
  `${EntityType.ENTITY_PEEP}.${PeepVariant.PEEP}`, // 68.0
  `${EntityType.ENTITY_FISTULA_BIG}.${FistulaVariant.FISTULA}`, // 71.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GURDY_JR}.0`, // 99.0
  `${EntityType.ENTITY_MEGA_MAW}.0`, // 262.0
  `${EntityType.ENTITY_MEGA_FATTY}.0`, // 264.0
  `${EntityType.ENTITY_STAIN}.0`, // 401.0
  `${EntityType.ENTITY_FORSAKEN}.0`, // 403.0
  `${EntityType.ENTITY_RAG_MEGA}.${RagMegaVariant.RAG_MEGA}`, // 409.0
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.BIG_HORN}`, // 411.0
  `${EntityType.ENTITY_BUMBINO}.0`, // 916.0
]);

/** Contains just the bosses in Mines (not e.g. Flooded Caves). */
export const MINES_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_LARRYJR}.${LarryJrVariant.TUFF_TWIN}`, // 19.2
  `${EntityType.ENTITY_REAP_CREEP}.0`, // 900.0
  `${EntityType.ENTITY_HORNFEL}.0`, // 906.0
  `${EntityType.ENTITY_GIDEON}.0`, // 907.0
]);

/** Contains just the bosses in Ashpit (not e.g. Flooded Caves). */
export const ASHPIT_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_LARRYJR}.${LarryJrVariant.THE_SHELL}`, // 19.3
  `${EntityType.ENTITY_POLYCEPHALUS}.${PolycephalusVariant.THE_PILE}`, // 269.1
  `${EntityType.ENTITY_GIDEON}.0`, // 907.0
  `${EntityType.ENTITY_SINGE}.0`, // 915.0
  `${EntityType.ENTITY_CLUTCH}.0`, // 921.0
]);

/** The set of unique bosses for Caves, Catacombs, and so on. */
export const ALL_CAVES_BOSSES_SET: ReadonlySet<string> = new Set([
  ...CAVES_BOSSES_SET.values(),
  ...CATACOMBS_BOSSES_SET.values(),
  ...FLOODED_CAVES_BOSSES_SET.values(),
  ...MINES_BOSSES_SET.values(),
  ...ASHPIT_BOSSES_SET.values(),
]);

export const CAVES_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, CAVES_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, CATACOMBS_BOSSES_SET],
  [StageType.STAGETYPE_AFTERBIRTH, FLOODED_CAVES_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE, MINES_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE_B, ASHPIT_BOSSES_SET],
]);

/** Contains just the bosses in Depths (not e.g. Dank Depths). */
export const DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_MONSTRO2}.${Monstro2Variant.MONSTRO_2}`, // 43.0
  `${EntityType.ENTITY_MONSTRO2}.${Monstro2Variant.GISH}`, // 43.1
  `${EntityType.ENTITY_MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.ENTITY_WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GATE}.0`, // 263.0
  `${EntityType.ENTITY_CAGE}.0`, // 265.0
  `${EntityType.ENTITY_BROWNIE}.0`, // 402.0
  `${EntityType.ENTITY_SISTERS_VIS}.0`, // 410.0
  `${EntityType.ENTITY_REAP_CREEP}.0`, // 900.0
]);

/** Contains just the bosses in Necropolis (not e.g. Dank Depths). */
export const NECROPOLIS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.ENTITY_WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.ENTITY_PEEP}.${PeepVariant.BLOAT}`, // 68.1
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_MASK_OF_INFAMY}.0`, // 97.0
  `${EntityType.ENTITY_ADVERSARY}.0`, // 268.0
  `${EntityType.ENTITY_POLYCEPHALUS}.${PolycephalusVariant.THE_PILE}`, // 269.1
  `${EntityType.ENTITY_BROWNIE}.0`, // 402.0
  `${EntityType.ENTITY_SISTERS_VIS}.0`, // 410.0
]);

/** Contains just the bosses in Dank Depths (not e.g. Necropolis). */
export const DANK_DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_MONSTRO2}.${Monstro2Variant.MONSTRO_2}`, // 43.0
  `${EntityType.ENTITY_MONSTRO2}.${Monstro2Variant.GISH}`, // 43.1
  `${EntityType.ENTITY_MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.ENTITY_WAR}.${WarVariant.WAR}`, // 65.0
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKI}`, // 69.0
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_GATE}.0`, // 263.0
  `${EntityType.ENTITY_CAGE}.0`, // 265.0
  `${EntityType.ENTITY_BROWNIE}.0`, // 402.0
  `${EntityType.ENTITY_SISTERS_VIS}.0`, // 410.0
  `${EntityType.ENTITY_REAP_CREEP}.0`, // 900.0
]);

/** Contains just the bosses in Mausoleum (not e.g. Dank Depths). */
export const MAUSOLEUM_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.ENTITY_SIREN}.0`, // 904.0
  `${EntityType.ENTITY_HERETIC}.0`, // 905.0
]);

/** Contains just the bosses in Gehenna (not e.g. Dank Depths). */
export const GEHENNA_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_MOM}.${MomVariant.MOM}`, // 45.0
  `${EntityType.ENTITY_VISAGE}.0`, // 903.0
  `${EntityType.ENTITY_HORNY_BOYS}.0`, // 920.0
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
export const ALL_DEPTHS_BOSSES_SET: ReadonlySet<string> = new Set([
  ...DEPTHS_BOSSES_SET.values(),
  ...NECROPOLIS_BOSSES_SET.values(),
  ...DANK_DEPTHS_BOSSES_SET.values(),
  ...MAUSOLEUM_BOSSES_SET.values(),
  ...GEHENNA_BOSSES_SET.values(),
]);

export const DEPTHS_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, DEPTHS_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, NECROPOLIS_BOSSES_SET],
  [StageType.STAGETYPE_AFTERBIRTH, DANK_DEPTHS_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE, MAUSOLEUM_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE_B, GEHENNA_BOSSES_SET],
]);

/** Contains just the bosses in Womb (not e.g. Scarred Womb). */
export const WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_PIN}.${PinVariant.SCOLEX}`, // 62.1
  `${EntityType.ENTITY_WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.ENTITY_DEATH}.0`, // 66.0
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.ENTITY_BLASTOCYST_BIG}.0`, // 74.0
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_MAMA_GURDY}.0`, // 266.0
  `${EntityType.ENTITY_MR_FRED}.0`, // 270.0
  `${EntityType.ENTITY_MATRIARCH}.0`, // 413.0
]);

/** Contains just the bosses in Utero (not e.g. Scarred Womb). */
export const UTERO_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.ENTITY_DEATH}.0`, // 66.0
  `${EntityType.ENTITY_DADDYLONGLEGS}.${DaddyLongLegsVariant.DADDY_LONG_LEGS}`, // 101.0
  `${EntityType.ENTITY_DADDYLONGLEGS}.${DaddyLongLegsVariant.TRIACHNID}`, // 101.1
  `${EntityType.ENTITY_PEEP}.${PeepVariant.BLOAT}`, // 68.1
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.ENTITY_FISTULA_BIG}.${FistulaVariant.TERATOMA}`, // 71.1
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
]);

/** Contains just the bosses in Scarred Womb (not e.g. Utero). */
export const SCARRED_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_PIN}.${PinVariant.SCOLEX}`, // 62.1
  `${EntityType.ENTITY_WAR}.${WarVariant.CONQUEST}`, // 65.1
  `${EntityType.ENTITY_DEATH}.0`, // 66.0
  `${EntityType.ENTITY_LOKI}.${LokiVariant.LOKII}`, // 69.1
  `${EntityType.ENTITY_BLASTOCYST_BIG}.0`, // 74.0
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.MOMS_HEART}`, // 78.0
  `${EntityType.ENTITY_MOMS_HEART}.${MomsHeartVariant.IT_LIVES}`, // 78.1
  `${EntityType.ENTITY_FALLEN}.${FallenVariant.FALLEN}`, // 81.0
  `${EntityType.ENTITY_HEADLESS_HORSEMAN}.0`, // 82.0
  `${EntityType.ENTITY_DADDYLONGLEGS}.${DaddyLongLegsVariant.TRIACHNID}`, // 101.1
  `${EntityType.ENTITY_MAMA_GURDY}.${MamaGurdyVariant.MAMA_GURDY}`, // 266.0
  `${EntityType.ENTITY_MR_FRED}.0`, // 270.0
  `${EntityType.ENTITY_MATRIARCH}.0`, // 413.0
]);

/** Contains just the bosses in Corpse (not e.g. Scarred Womb). */
export const CORPSE_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_SCOURGE}.0`, // 909.0
  `${EntityType.ENTITY_CHIMERA}.0`, // 910.0
  `${EntityType.ENTITY_ROTGUT}.0`, // 911.0
  `${EntityType.ENTITY_MOTHER}.0`, // 912.0
]);

/** The set of unique bosses for Depths, Necropolis, and so on. */
export const ALL_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  ...WOMB_BOSSES_SET.values(),
  ...UTERO_BOSSES_SET.values(),
  ...SCARRED_WOMB_BOSSES_SET.values(),
  ...MAUSOLEUM_BOSSES_SET.values(),
  ...GEHENNA_BOSSES_SET.values(),
]);

export const WOMB_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, WOMB_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, UTERO_BOSSES_SET],
  [StageType.STAGETYPE_AFTERBIRTH, SCARRED_WOMB_BOSSES_SET],
  [StageType.STAGETYPE_REPENTANCE, CORPSE_BOSSES_SET],
]);

export const BLUE_WOMB_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_HUSH}.0`, // 407.0
]);

export const BLUE_WOMB_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([[StageType.STAGETYPE_ORIGINAL, BLUE_WOMB_BOSSES_SET]]);

export const SHEOL_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_SATAN}.${SatanVariant.SATAN}`, // 84.0
]);
export const CATHEDRAL_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_ISAAC}.${IsaacVariant.ISAAC}`, // 102.0
]);

export const ALL_STAGE_10_BOSSES_SET: ReadonlySet<string> = new Set([
  ...SHEOL_BOSSES_SET.values(),
  ...CATHEDRAL_BOSSES_SET.values(),
]);

export const STAGE_10_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, SHEOL_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, CATHEDRAL_BOSSES_SET],
]);

export const DARK_ROOM_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_THE_LAMB}.${LambVariant.LAMB}`, // 273.0
]);

export const CHEST_BOSSES_SET: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_ISAAC}.${IsaacVariant.BLUE_BABY}`, // 102.1
]);

export const ALL_STAGE_11_BOSSES_SET: ReadonlySet<string> = new Set([
  ...DARK_ROOM_BOSSES_SET.values(),
  ...CHEST_BOSSES_SET.values(),
]);

export const STAGE_11_STAGE_TYPE_TO_BOSS_SET_MAP: ReadonlyMap<
  StageType,
  ReadonlySet<string>
> = new Map([
  [StageType.STAGETYPE_ORIGINAL, DARK_ROOM_BOSSES_SET],
  [StageType.STAGETYPE_WOTL, CHEST_BOSSES_SET],
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
