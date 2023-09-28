import {
  BeastVariant,
  BigHornVariant,
  BossID,
  ChubVariant,
  DaddyLongLegsVariant,
  DingleVariant,
  DogmaVariant,
  DukeOfFliesVariant,
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
  MegaSatanVariant,
  MomVariant,
  MomsHeartVariant,
  Monstro2Variant,
  MotherVariant,
  PeepVariant,
  PinVariant,
  PolycephalusVariant,
  RagManVariant,
  RagMegaVariant,
  RaglichVariant,
  SatanVariant,
  UltraGreedVariant,
  WarVariant,
  WidowVariant,
} from "isaac-typescript-definitions";

export const BOSS_ID_TO_ENTITY_TYPE_VARIANT = {
  // 1
  [BossID.MONSTRO]: [EntityType.MONSTRO, 0],

  // 2
  [BossID.LARRY_JR]: [EntityType.LARRY_JR, LarryJrVariant.LARRY_JR],

  // 3
  [BossID.CHUB]: [EntityType.CHUB, ChubVariant.CHUB],

  // 4
  [BossID.GURDY]: [EntityType.GURDY, 0],

  // 5
  [BossID.MONSTRO_2]: [EntityType.MONSTRO_2, Monstro2Variant.MONSTRO_2],

  // 6
  [BossID.MOM]: [EntityType.MOM, MomVariant.MOM],

  // 7
  [BossID.SCOLEX]: [EntityType.PIN, PinVariant.SCOLEX],

  // 8
  [BossID.MOMS_HEART]: [EntityType.MOMS_HEART, MomsHeartVariant.MOMS_HEART],

  // 9
  [BossID.FAMINE]: [EntityType.FAMINE, 0],

  // 10
  [BossID.PESTILENCE]: [EntityType.PESTILENCE, 0],

  // 11
  [BossID.WAR]: [EntityType.WAR, WarVariant.WAR],

  // 12
  [BossID.DEATH]: [EntityType.DEATH, 0],

  // 13
  [BossID.DUKE_OF_FLIES]: [
    EntityType.DUKE_OF_FLIES,
    DukeOfFliesVariant.DUKE_OF_FLIES,
  ],

  // 14
  [BossID.PEEP]: [EntityType.PEEP, PeepVariant.PEEP],

  // 15
  [BossID.LOKI]: [EntityType.LOKI, LokiVariant.LOKI],

  // 16
  [BossID.BLASTOCYST]: [EntityType.BLASTOCYST_BIG, 0],

  // 17
  [BossID.GEMINI]: [EntityType.GEMINI, GeminiVariant.GEMINI],

  // 18
  [BossID.FISTULA]: [EntityType.FISTULA_BIG, FistulaVariant.FISTULA],

  // 19
  [BossID.GISH]: [EntityType.MONSTRO_2, Monstro2Variant.GISH],

  // 20
  [BossID.STEVEN]: [EntityType.GEMINI, GeminiVariant.STEVEN],

  // 21
  [BossID.CHAD]: [EntityType.CHUB, ChubVariant.CHAD],

  // 22
  [BossID.HEADLESS_HORSEMAN]: [EntityType.HEADLESS_HORSEMAN, 0],

  // 23
  [BossID.FALLEN]: [EntityType.FALLEN, FallenVariant.FALLEN],

  // 24
  [BossID.SATAN]: [EntityType.SATAN, SatanVariant.SATAN],

  // 25
  [BossID.IT_LIVES]: [EntityType.MOMS_HEART, MomsHeartVariant.IT_LIVES],

  // 26
  [BossID.HOLLOW]: [EntityType.LARRY_JR, LarryJrVariant.HOLLOW],

  // 27
  [BossID.CARRION_QUEEN]: [EntityType.CHUB, ChubVariant.CARRION_QUEEN],

  // 28
  [BossID.GURDY_JR]: [EntityType.GURDY_JR, 0],

  // 29
  [BossID.HUSK]: [EntityType.DUKE_OF_FLIES, DukeOfFliesVariant.HUSK],

  // 30
  [BossID.BLOAT]: [EntityType.PEEP, PeepVariant.BLOAT],

  // 31
  [BossID.LOKII]: [EntityType.LOKI, LokiVariant.LOKII],

  // 32
  [BossID.BLIGHTED_OVUM]: [EntityType.GEMINI, GeminiVariant.BLIGHTED_OVUM],

  // 33
  [BossID.TERATOMA]: [EntityType.FISTULA_BIG, FistulaVariant.TERATOMA],

  // 34
  [BossID.WIDOW]: [EntityType.WIDOW, WidowVariant.WIDOW],

  // 35
  [BossID.MASK_OF_INFAMY]: [EntityType.MASK_OF_INFAMY, 0],

  // 36
  [BossID.WRETCHED]: [EntityType.WIDOW, WidowVariant.WRETCHED],

  // 37
  [BossID.PIN]: [EntityType.PIN, PinVariant.PIN],

  // 38
  [BossID.CONQUEST]: [EntityType.WAR, WarVariant.CONQUEST],

  // 39
  [BossID.ISAAC]: [EntityType.ISAAC, IsaacVariant.ISAAC],

  // 40
  [BossID.BLUE_BABY]: [EntityType.ISAAC, IsaacVariant.BLUE_BABY],

  // 41
  [BossID.DADDY_LONG_LEGS]: [
    EntityType.DADDY_LONG_LEGS,
    DaddyLongLegsVariant.DADDY_LONG_LEGS,
  ],

  // 42
  [BossID.TRIACHNID]: [
    EntityType.DADDY_LONG_LEGS,
    DaddyLongLegsVariant.TRIACHNID,
  ],

  // 43
  [BossID.HAUNT]: [EntityType.HAUNT, HauntVariant.HAUNT],

  // 44
  [BossID.DINGLE]: [EntityType.DINGLE, DingleVariant.DINGLE],

  // 45
  [BossID.MEGA_MAW]: [EntityType.MEGA_MAW, 0],

  // 46
  [BossID.GATE]: [EntityType.GATE, 0],

  // 47
  [BossID.MEGA_FATTY]: [EntityType.MEGA_FATTY, 0],

  // 48
  [BossID.CAGE]: [EntityType.CAGE, 0],

  // 49
  [BossID.MAMA_GURDY]: [EntityType.MAMA_GURDY, MamaGurdyVariant.MAMA_GURDY],

  // 50
  [BossID.DARK_ONE]: [EntityType.DARK_ONE, 0],

  // 51
  [BossID.ADVERSARY]: [EntityType.ADVERSARY, 0],

  // 52
  [BossID.POLYCEPHALUS]: [
    EntityType.POLYCEPHALUS,
    PolycephalusVariant.POLYCEPHALUS,
  ],

  // 53
  [BossID.MR_FRED]: [EntityType.MR_FRED, 0],

  // 54
  [BossID.LAMB]: [EntityType.LAMB, LambVariant.LAMB],

  // 55
  [BossID.MEGA_SATAN]: [EntityType.MEGA_SATAN, MegaSatanVariant.MEGA_SATAN],

  // 56
  [BossID.GURGLING]: [EntityType.GURGLING, GurglingVariant.GURGLING_BOSS],

  // 57
  [BossID.STAIN]: [EntityType.STAIN, 0],

  // 58
  [BossID.BROWNIE]: [EntityType.BROWNIE, 0],

  // 59
  [BossID.FORSAKEN]: [EntityType.FORSAKEN, 0],

  // 60
  [BossID.LITTLE_HORN]: [EntityType.LITTLE_HORN, LittleHornVariant.LITTLE_HORN],

  // 61
  [BossID.RAG_MAN]: [EntityType.RAG_MAN, RagManVariant.RAG_MAN],

  // 62
  [BossID.ULTRA_GREED]: [EntityType.ULTRA_GREED, UltraGreedVariant.ULTRA_GREED],

  // 63
  [BossID.HUSH]: [EntityType.HUSH, 0],

  // 64
  [BossID.DANGLE]: [EntityType.DINGLE, DingleVariant.DANGLE],

  // 65
  [BossID.TURDLING]: [EntityType.GURGLING, GurglingVariant.TURDLING],

  // 66
  [BossID.FRAIL]: [EntityType.PIN, PinVariant.FRAIL],

  // 67
  [BossID.RAG_MEGA]: [EntityType.RAG_MEGA, RagMegaVariant.RAG_MEGA],

  // 68
  [BossID.SISTERS_VIS]: [EntityType.SISTERS_VIS, 0],

  // 69
  [BossID.BIG_HORN]: [EntityType.BIG_HORN, BigHornVariant.BIG_HORN],

  // 70
  [BossID.DELIRIUM]: [EntityType.DELIRIUM, 0],

  // There is no boss ID with a value of 71.

  // 72
  [BossID.MATRIARCH]: [EntityType.MATRIARCH, 0],

  // 73
  [BossID.PILE]: [EntityType.POLYCEPHALUS, PolycephalusVariant.PILE],

  // 74
  [BossID.REAP_CREEP]: [EntityType.REAP_CREEP, 0],

  // 75
  [BossID.LIL_BLUB]: [EntityType.LIL_BLUB, 0],

  // 76
  [BossID.WORMWOOD]: [EntityType.PIN, PinVariant.WORMWOOD],

  // 77
  [BossID.RAINMAKER]: [EntityType.RAINMAKER, 0],

  // 78
  [BossID.VISAGE]: [EntityType.VISAGE, 0],

  // 79
  [BossID.SIREN]: [EntityType.SIREN, 0],

  // 80
  [BossID.TUFF_TWINS]: [EntityType.LARRY_JR, LarryJrVariant.TUFF_TWIN],

  // 81
  [BossID.HERETIC]: [EntityType.HERETIC, 0],

  // 82
  [BossID.HORNFEL]: [EntityType.HORNFEL, 0],

  // 83
  [BossID.GREAT_GIDEON]: [EntityType.GREAT_GIDEON, 0],

  // 84
  [BossID.BABY_PLUM]: [EntityType.BABY_PLUM, 0],

  // 85
  [BossID.SCOURGE]: [EntityType.SCOURGE, 0],

  // 86
  [BossID.CHIMERA]: [EntityType.CHIMERA, 0],

  // 87
  [BossID.ROTGUT]: [EntityType.ROTGUT, 0],

  // 88
  [BossID.MOTHER]: [EntityType.MOTHER, MotherVariant.MOTHER_1],

  // 89
  [BossID.MAUSOLEUM_MOM]: [EntityType.MOM, MomVariant.MOM],

  // 90
  [BossID.MAUSOLEUM_MOMS_HEART]: [
    EntityType.MOMS_HEART,
    MomsHeartVariant.MOMS_HEART,
  ],

  // 91
  [BossID.MIN_MIN]: [EntityType.MIN_MIN, 0],

  // 92
  [BossID.CLOG]: [EntityType.CLOG, 0],

  // 93
  [BossID.SINGE]: [EntityType.SINGE, 0],

  // 94
  [BossID.BUMBINO]: [EntityType.BUMBINO, 0],

  // 95
  [BossID.COLOSTOMIA]: [EntityType.COLOSTOMIA, 0],

  // 96
  [BossID.SHELL]: [EntityType.LARRY_JR, LarryJrVariant.SHELL],

  // 97
  [BossID.TURDLET]: [EntityType.TURDLET, 0],

  // 98
  [BossID.RAGLICH]: [EntityType.RAGLICH, RaglichVariant.RAGLICH],

  // 99
  [BossID.DOGMA]: [EntityType.DOGMA, DogmaVariant.DOGMA_PHASE_1],

  // 100
  [BossID.BEAST]: [EntityType.BEAST, BeastVariant.BEAST],

  // 101
  [BossID.HORNY_BOYS]: [EntityType.HORNY_BOYS, 0],

  // 102
  [BossID.CLUTCH]: [EntityType.CLUTCH, 0],
} as const satisfies Record<BossID, readonly [EntityType, int]>;
