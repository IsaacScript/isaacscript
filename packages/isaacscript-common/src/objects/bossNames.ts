import { BossID } from "isaac-typescript-definitions";

export const DEFAULT_BOSS_NAME = "Unknown";

/**
 * From "bossportraits.xml".
 *
 * Note that Blue Baby returns "Blue Baby" instead of "???".
 */
export const BOSS_NAMES = {
  [BossID.MONSTRO]: "Monstro", // 1
  [BossID.LARRY_JR]: "Larry Jr.", // 2
  [BossID.CHUB]: "Chub", // 3
  [BossID.GURDY]: "Gurdy", // 4
  [BossID.MONSTRO_2]: "Monstro II", // 5
  [BossID.MOM]: "Mom", // 6
  [BossID.SCOLEX]: "Scolex", // 7
  [BossID.MOMS_HEART]: "Mom's Heart", // 8
  [BossID.FAMINE]: "Famine", // 9
  [BossID.PESTILENCE]: "Pestilence", // 10
  [BossID.WAR]: "War", // 11
  [BossID.DEATH]: "Death", // 12
  [BossID.DUKE_OF_FLIES]: "Duke of Flies", // 13
  [BossID.PEEP]: "Peep", // 14
  [BossID.LOKI]: "Loki", // 15
  [BossID.BLASTOCYST]: "Blastocyst", // 16
  [BossID.GEMINI]: "Gemini", // 17
  [BossID.FISTULA]: "Fistula", // 18
  [BossID.GISH]: "Gish", // 19
  [BossID.STEVEN]: "Steven", // 20
  [BossID.CHAD]: "C.H.A.D.", // 21
  [BossID.HEADLESS_HORSEMAN]: "Headless Horseman", // 22
  [BossID.FALLEN]: "The Fallen", // 23
  [BossID.SATAN]: "Satan", // 24
  [BossID.IT_LIVES]: "It Lives!", // 25
  [BossID.HOLLOW]: "The Hollow", // 26
  [BossID.CARRION_QUEEN]: "The Carrion Queen", // 27
  [BossID.GURDY_JR]: "Gurdy Jr.", // 28
  [BossID.HUSK]: "The Husk", // 29
  [BossID.BLOAT]: "The Bloat", // 30
  [BossID.LOKII]: "Lokii", // 31
  [BossID.BLIGHTED_OVUM]: "The Blighted Ovum", // 32
  [BossID.TERATOMA]: "Teratoma", // 33
  [BossID.WIDOW]: "The Widow", // 34
  [BossID.MASK_OF_INFAMY]: "Mask of Infamy", // 35
  [BossID.WRETCHED]: "The Wretched", // 36
  [BossID.PIN]: "Pin", // 37
  [BossID.CONQUEST]: "Conquest", // 38
  [BossID.ISAAC]: "Isaac", // 39
  [BossID.BLUE_BABY]: "Blue Baby", // 40
  [BossID.DADDY_LONG_LEGS]: "Daddy Long Legs", // 41
  [BossID.TRIACHNID]: "Triachnid", // 42
  [BossID.HAUNT]: "The Haunt", // 43
  [BossID.DINGLE]: "Dingle", // 44
  [BossID.MEGA_MAW]: "Mega Maw", // 45
  // "Mega Maw II" is changed to "The Gate".
  [BossID.GATE]: "The Gate", // 46
  [BossID.MEGA_FATTY]: "Mega Fatty", // 47
  // "Mega Fatty II" is changed to "The Cage".
  [BossID.CAGE]: "The Cage", // 48
  [BossID.MAMA_GURDY]: "Mega Gurdy", // 49
  [BossID.DARK_ONE]: "Dark One", // 50
  // "Dark One II" is changed to "The Adversary".
  [BossID.ADVERSARY]: "The Adversary", // 51
  [BossID.POLYCEPHALUS]: "Polycephalus", // 52
  // "Mega Fred" is changed to "Mr. Fred".
  [BossID.MR_FRED]: "Mr. Fred", // 53
  [BossID.LAMB]: "The Lamb", // 54
  [BossID.MEGA_SATAN]: "Mega Satan", // 55
  [BossID.GURGLING]: "Gurglings", // 56
  [BossID.STAIN]: "The Stain", // 57
  [BossID.BROWNIE]: "Brownie", // 58
  [BossID.FORSAKEN]: "The Forsaken", // 59
  [BossID.LITTLE_HORN]: "Little Horn", // 60
  [BossID.RAG_MAN]: "Rag Man", // 61
  [BossID.ULTRA_GREED]: "Ultra Greed", // 62
  [BossID.HUSH]: "Hush", // 63
  [BossID.DANGLE]: "Dangle", // 64
  [BossID.TURDLING]: "Turdling", // 65
  [BossID.FRAIL]: "The Frail", // 66
  [BossID.RAG_MEGA]: "Rag Mega", // 67
  [BossID.SISTERS_VIS]: "Sisters Vis", // 68
  [BossID.BIG_HORN]: "Big Horn", // 69
  [BossID.DELIRIUM]: "Delirium", // 70
  // There is no `BossID` with a value of 71.
  [BossID.MATRIARCH]: "The Matriarch", // 72
  [BossID.PILE]: "The Pile", // 73
  [BossID.REAP_CREEP]: "Reap Creep", // 74
  // "Beelzeblub" is changed to "Lil Blub".
  [BossID.LIL_BLUB]: "Lil Blub", // 75
  [BossID.WORMWOOD]: "Wormwood", // 76
  [BossID.RAINMAKER]: "The Rainmaker", // 77
  [BossID.VISAGE]: "The Visage", // 78
  [BossID.SIREN]: "The Siren", // 79
  [BossID.TUFF_TWINS]: "Tuff Twins", // 80
  [BossID.HERETIC]: "The Heretic", // 81
  [BossID.HORNFEL]: "Hornfel", // 82
  [BossID.GREAT_GIDEON]: "Great Gideon", // 83
  [BossID.BABY_PLUM]: "Baby Plum", // 84
  [BossID.SCOURGE]: "The Scourge", // 85
  [BossID.CHIMERA]: "Chimera", // 86
  [BossID.ROTGUT]: "Rotgut", // 87
  [BossID.MOTHER]: "Mother", // 88
  [BossID.MAUSOLEUM_MOM]: "Mom (Mausoleum)", // 89
  [BossID.MAUSOLEUM_MOMS_HEART]: "Mom's Heart (Mausoleum)", // 90
  [BossID.MIN_MIN]: "Min-Min", // 91
  [BossID.CLOG]: "Clog", // 92
  [BossID.SINGE]: "Singe", // 93
  [BossID.BUMBINO]: "Bumbino", // 94
  [BossID.COLOSTOMIA]: "Colostomia", // 95
  [BossID.SHELL]: "The Shell", // 96
  [BossID.TURDLET]: "Turdlet", // 97
  [BossID.RAGLICH]: "Raglich", // 98
  [BossID.DOGMA]: "Dogma", // 99
  [BossID.BEAST]: "The Beast", // 100
  [BossID.HORNY_BOYS]: "Horny Boys", // 101
  [BossID.CLUTCH]: "Clutch", // 102
} as const satisfies Record<BossID, string>;
