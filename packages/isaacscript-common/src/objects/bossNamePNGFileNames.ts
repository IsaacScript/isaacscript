// cspell:disable

import { BossID } from "isaac-typescript-definitions";

/**
 * From the "nameimage" attribute in the "bossportraits.xml" file. Used when rendering the
 * "versusscreen.anm2" sprite.
 */
export const BOSS_NAME_PNG_FILE_NAMES = {
  [BossID.MONSTRO]: "BossName_20.0_Monstro.png", // 1
  [BossID.LARRY_JR]: "BossName_19.0_LarryJr.png", // 2
  [BossID.CHUB]: "BossName_28.0_Chub.png", // 3
  [BossID.GURDY]: "BossName_36.0_Gurdy.png", // 4
  [BossID.MONSTRO_2]: "BossName_43.0_Monstro2.png", // 5
  [BossID.MOM]: "BossName_45.0_Mom.png", // 6
  [BossID.SCOLEX]: "BossName_62.1_Scolex.png", // 7
  [BossID.MOMS_HEART]: "BossName_78.0_MomsHeart.png", // 8
  [BossID.FAMINE]: "BossName_63.0_Famine.png", // 9
  [BossID.PESTILENCE]: "BossName_64.0_Pestilence.png", // 10
  [BossID.WAR]: "BossName_65.0_War.png", // 11
  [BossID.DEATH]: "BossName_66.0_Death.png", // 12
  [BossID.DUKE_OF_FLIES]: "BossName_67.0_DukeOfFlies.png", // 13
  [BossID.PEEP]: "BossName_68.0_Peep.png", // 14
  [BossID.LOKI]: "BossName_69.0_Loki.png", // 15
  [BossID.BLASTOCYST]: "BossName_74.0_Blastocyst.png", // 16
  [BossID.GEMINI]: "BossName_79.0_Gemini.png", // 17
  [BossID.FISTULA]: "BossName_71.0_Fistula.png", // 18
  [BossID.GISH]: "BossName_43.1_Gish.png", // 19
  [BossID.STEVEN]: "BossName_79.1_Steven.png", // 20
  [BossID.CHAD]: "BossName_28.1_CHAD.png", // 21
  [BossID.HEADLESS_HORSEMAN]: "BossName_82.0_HeadlessHorseman.png", // 22
  [BossID.FALLEN]: "BossName_81.0_TheFallen.png", // 23
  [BossID.SATAN]: "BossName_84.0_Satan.png", // 24
  [BossID.IT_LIVES]: "BossName_78.1_ItLives.png", // 25
  [BossID.HOLLOW]: "BossName_19.1_TheHollow.png", // 26
  [BossID.CARRION_QUEEN]: "BossName_28.2_CarrionQueen.png", // 27
  [BossID.GURDY_JR]: "BossName_99.0_GurdyJr.png", // 28
  [BossID.HUSK]: "BossName_67.1_TheHusk.png", // 29
  [BossID.BLOAT]: "BossName_68.1_Bloat.png", // 30
  [BossID.LOKII]: "BossName_69.1_Lokii.png", // 31
  [BossID.BLIGHTED_OVUM]: "BossName_79.2_BlightedOvum.png", // 32
  [BossID.TERATOMA]: "BossName_71.1_Teratoma.png", // 33
  [BossID.WIDOW]: "BossName_100.0_Widow.png", // 34
  [BossID.MASK_OF_INFAMY]: "BossName_97.0_MaskOfInfamy.png", // 35
  [BossID.WRETCHED]: "BossName_100.1_TheWretched.png", // 36
  [BossID.PIN]: "BossName_62.0_Pin.png", // 37
  [BossID.CONQUEST]: "BossName_65.1_Conquest.png", // 38
  // There is no dedicated "bossname_" PNG file for Isaac.
  [BossID.ISAAC]: "PlayerName_01_Isaac.png", // 39
  [BossID.BLUE_BABY]: "BossName_102.1_BlueBaby.png", // 40
  [BossID.DADDY_LONG_LEGS]: "BossName_101.0_DaddyLongLegs.png", // 41
  [BossID.TRIACHNID]: "BossName_101.1_Triachnid.png", // 42
  [BossID.HAUNT]: "BossName_260.0_TheHaunt.png", // 43
  [BossID.DINGLE]: "BossName_261.0_Dingle.png", // 44
  [BossID.MEGA_MAW]: "Portrait_262.0_MegaMaw.png", // 45
  [BossID.GATE]: "BossName_263.0_MegaMaw2.png", // 46
  [BossID.MEGA_FATTY]: "BossName_264.0_MegaFatty.png", // 47
  [BossID.CAGE]: "BossName_265.0_Fatty2.png", // 48
  [BossID.MAMA_GURDY]: "BossName_266.0_MamaGurdy.png", // 49
  [BossID.DARK_ONE]: "BossName_267.0_DarkOne.png", // 50
  [BossID.ADVERSARY]: "BossName_268.0_DarkOne2.png", // 51
  [BossID.POLYCEPHALUS]: "BossName_269.0_Polycephalus.png", // 52
  [BossID.MR_FRED]: "BossName_270.0_MegaFred.png", // 53
  [BossID.LAMB]: "BossName_273.0_TheLamb.png", // 54
  [BossID.MEGA_SATAN]: "BossName_274.0_MegaSatan.png", // 55
  [BossID.GURGLING]: "BossName_276.0_Gurglings.png", // 56
  [BossID.STAIN]: "BossName_401.0_TheStain.png", // 57
  [BossID.BROWNIE]: "BossName_402.0_Brownie.png", // 58
  [BossID.FORSAKEN]: "BossName_403.0_TheForsaken.png", // 59
  [BossID.LITTLE_HORN]: "BossName_404.0_LittleHorn.png", // 60
  [BossID.RAG_MAN]: "BossName_405.0_RagMan.png", // 61
  [BossID.ULTRA_GREED]: "BossName_406.0_UltraGreed.png", // 62
  [BossID.HUSH]: "BossName_407.0_Hush.png", // 63
  [BossID.DANGLE]: "BossName_Dangle.png", // 64
  [BossID.TURDLING]: "BossName_Turdlings.png", // 65
  [BossID.FRAIL]: "BossName_TheFrail.png", // 66
  [BossID.RAG_MEGA]: "BossName_RagMega.png", // 67
  [BossID.SISTERS_VIS]: "BossName_SisterssVis.png", // 68
  [BossID.BIG_HORN]: "BossName_BigHorn.png", // 69
  [BossID.DELIRIUM]: "BossName_Delirium.png", // 70
  // Ultra Greedier uses the same file as Ultra Greed.
  [BossID.ULTRA_GREEDIER]: "BossName_406.0_UltraGreed.png", // 71
  [BossID.MATRIARCH]: "BossName_Matriarch.png", // 72
  [BossID.PILE]: "BossName_Polycephalus2.png", // 73
  [BossID.REAP_CREEP]: "BossName_ReapCreep.png", // 74
  [BossID.LIL_BLUB]: "BossName_Beelzeblub.png", // 75
  [BossID.WORMWOOD]: "BossName_Wormwood.png", // 76
  [BossID.RAINMAKER]: "BossName_Rainmaker.png", // 77
  [BossID.VISAGE]: "BossName_Visage.png", // 78
  [BossID.SIREN]: "BossName_Siren.png", // 79
  [BossID.TUFF_TWINS]: "BossName_TuffTwins.png", // 80
  [BossID.HERETIC]: "BossName_Heretic.png", // 81
  [BossID.HORNFEL]: "BossName_Hornfel.png", // 82
  [BossID.GREAT_GIDEON]: "BossName_Gideon.png", // 83
  [BossID.BABY_PLUM]: "BossName_BabyPlum.png", // 84
  [BossID.SCOURGE]: "BossName_Scourge.png", // 85
  [BossID.CHIMERA]: "BossName_Chimera.png", // 86
  [BossID.ROTGUT]: "BossName_Rotgut.png", // 87
  [BossID.MOTHER]: "BossName_Mother.png", // 88
  // Mom (Mausoleum) uses the same file as Mom.
  [BossID.MAUSOLEUM_MOM]: "BossName_45.0_Mom.png", // 89
  // Mom's Heart (Mausoleum) uses the same file as Mom's Heart.
  [BossID.MAUSOLEUM_MOMS_HEART]: "BossName_78.0_MomsHeart.png", // 90
  [BossID.MIN_MIN]: "BossName_MinMin.png", // 91
  [BossID.CLOG]: "BossName_Clog.png", // 92
  [BossID.SINGE]: "BossName_Singe.png", // 93
  [BossID.BUMBINO]: "BossName_Bumbino.png", // 94
  [BossID.COLOSTOMIA]: "BossName_Colostomia.png", // 95
  [BossID.SHELL]: "BossName_Shell.png", // 96
  [BossID.TURDLET]: "BossName_Turdlet.png", // 97
  [BossID.RAGLICH]: "BossName_Raglich.png", // 98
  [BossID.DOGMA]: "BossName_Dogma.png", // 99
  // The file name specified in "bossportraits.xml" for The Beast does not actually exist in the
  // game files.
  [BossID.BEAST]: "BossName_TheBeast.png", // 100
  [BossID.HORNY_BOYS]: "BossName_HornyBoys.png", // 101
  [BossID.CLUTCH]: "BossName_Clutch.png", // 102
  // [BossID.CADAVRA]: "BossName_Cadavra.png", // 103
} as const satisfies Record<BossID, string>;
