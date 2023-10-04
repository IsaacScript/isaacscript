// cspell:disable

import { BossID } from "isaac-typescript-definitions";

/**
 * From the "portrait" attribute in the "bossportraits.xml" file. Used when rendering the
 * "versusscreen.anm2" sprite.
 */
export const BOSS_PORTRAIT_PNG_FILE_NAMES = {
  [BossID.MONSTRO]: "Portrait_20.0_Monstro.png", // 1
  [BossID.LARRY_JR]: "Portrait_19.0_LarryJr.png", // 2
  [BossID.CHUB]: "Portrait_28.0_Chub.png", // 3
  [BossID.GURDY]: "Portrait_36.0_Gurdy.png", // 4
  [BossID.MONSTRO_2]: "Portrait_43.0_Monstro2.png", // 5
  [BossID.MOM]: "Portrait_45.0_Mom.png", // 6
  [BossID.SCOLEX]: "Portrait_62.1_Scolex.png", // 7
  [BossID.MOMS_HEART]: "Portrait_78.0_MomsHeart.png", // 8
  [BossID.FAMINE]: "Portrait_63.0_Famine.png", // 9
  [BossID.PESTILENCE]: "Portrait_64.0_Pestilence.png", // 10
  [BossID.WAR]: "Portrait_65.0_War.png", // 11
  [BossID.DEATH]: "Portrait_66.0_Death.png", // 12
  [BossID.DUKE_OF_FLIES]: "Portrait_67.0_DukeOfFlies.png", // 13
  [BossID.PEEP]: "Portrait_68.0_Peep.png", // 14
  [BossID.LOKI]: "Portrait_69.0_Loki.png", // 15
  [BossID.BLASTOCYST]: "Portrait_74.0_Blastocyst.png", // 16
  [BossID.GEMINI]: "Portrait_79.0_Gemini.png", // 17
  [BossID.FISTULA]: "Portrait_71.0_Fistula.png", // 18
  [BossID.GISH]: "Portrait_43.1_Gish.png", // 19
  [BossID.STEVEN]: "Portrait_79.1_Steven.png", // 20
  [BossID.CHAD]: "Portrait_28.1_CHAD.png", // 21
  [BossID.HEADLESS_HORSEMAN]: "Portrait_82.0_HeadlessHorseman.png", // 22
  [BossID.FALLEN]: "Portrait_81.0_TheFallen.png", // 23
  [BossID.SATAN]: "Portrait_84.0_Satan.png", // 24
  [BossID.IT_LIVES]: "Portrait_78.1_ItLives.png", // 25
  [BossID.HOLLOW]: "Portrait_19.1_TheHollow.png", // 26
  [BossID.CARRION_QUEEN]: "Portrait_28.2_CarrionQueen.png", // 27
  [BossID.GURDY_JR]: "Portrait_99.0_GurdyJr.png", // 28
  [BossID.HUSK]: "Portrait_67.1_TheHusk.png", // 29
  [BossID.BLOAT]: "Portrait_68.1_Bloat.png", // 30
  [BossID.LOKII]: "Portrait_69.1_Lokii.png", // 31
  [BossID.BLIGHTED_OVUM]: "Portrait_79.2_BlightedOvum.png", // 32
  [BossID.TERATOMA]: "Portrait_71.1_Teratoma.png", // 33
  [BossID.WIDOW]: "Portrait_100.0_Widow.png", // 34
  [BossID.MASK_OF_INFAMY]: "Portrait_97.0_MaskOfInfamy.png", // 35
  [BossID.WRETCHED]: "Portrait_100.1_TheWretched.png", // 36
  [BossID.PIN]: "Portrait_62.0_Pin.png", // 37
  [BossID.CONQUEST]: "Portrait_65.1_Conquest.png", // 38
  [BossID.ISAAC]: "Portrait_102.0_Isaac.png", // 39
  [BossID.BLUE_BABY]: "Portrait_102.1_BlueBaby.png", // 40
  [BossID.DADDY_LONG_LEGS]: "Portrait_101.0_DaddyLongLegs.png", // 41
  [BossID.TRIACHNID]: "Portrait_101.1_Triachnid.png", // 42
  [BossID.HAUNT]: "Portrait_260.0_TheHaunt.png", // 43
  [BossID.DINGLE]: "Portrait_261.0_Dingle.png", // 44
  [BossID.MEGA_MAW]: "Portrait_262.0_MegaMaw.png", // 45
  [BossID.GATE]: "Portrait_263.0_MegaMaw2.png", // 46
  [BossID.MEGA_FATTY]: "Portrait_264.0_MegaFatty.png", // 47
  [BossID.CAGE]: "Portrait_265.0_Fatty2.png", // 48
  [BossID.MAMA_GURDY]: "Portrait_266.0_MamaGurdy.png", // 49
  [BossID.DARK_ONE]: "Portrait_267.0_DarkOne.png", // 50
  [BossID.ADVERSARY]: "Portrait_268.0_DarkOne2.png", // 51
  [BossID.POLYCEPHALUS]: "Portrait_269.0_Polycephalus.png", // 52
  [BossID.MR_FRED]: "Portrait_270.0_MegaFred.png", // 53
  [BossID.LAMB]: "Portrait_273.0_TheLamb.png", // 54
  [BossID.MEGA_SATAN]: "Portrait_274.0_MegaSatan.png", // 55
  [BossID.GURGLING]: "Portrait_276.0_Gurglings.png", // 56
  [BossID.STAIN]: "Portrait_401.0_TheStain.png", // 57
  [BossID.BROWNIE]: "Portrait_402.0_Brownie.png", // 58
  [BossID.FORSAKEN]: "Portrait_403.0_TheForsaken.png", // 59
  [BossID.LITTLE_HORN]: "Portrait_404.0_LittleHorn.png", // 60
  [BossID.RAG_MAN]: "Portrait_405.0_Ragman.png", // 61
  [BossID.ULTRA_GREED]: "Portrait_406.0_UltraGreed.png", // 62
  [BossID.HUSH]: "Portrait_407.0_Hush.png", // 63
  [BossID.DANGLE]: "Portrait_Dangle.png", // 64
  [BossID.TURDLING]: "Portrait_Turdlings.png", // 65
  [BossID.FRAIL]: "Portrait_TheFrail.png", // 66
  [BossID.RAG_MEGA]: "Portrait_RagMega.png", // 67
  [BossID.SISTERS_VIS]: "Portrait_SistersVis.png", // 68
  [BossID.BIG_HORN]: "Portrait_BigHorn.png", // 69
  [BossID.DELIRIUM]: "Portrait_Delirium.png", // 70
  // Ultra Greedier uses the same file as Ultra Greed.
  [BossID.ULTRA_GREEDIER]: "Portrait_406.0_UltraGreed.png", // 71
  [BossID.MATRIARCH]: "Portrait_Matriarch.png", // 72
  [BossID.PILE]: "Portrait_269.1_Polycephalus2.png", // 73
  [BossID.REAP_CREEP]: "Portrait_900.0_ReapCreep.png", // 74
  [BossID.LIL_BLUB]: "Portrait_901.0_Beelzeblub.png", // 75
  // There is also a "Portrait_901.0_Beelzeblub_Dross.png" file.
  [BossID.WORMWOOD]: "Portrait_902.0_Wormwood.png", // 76
  // There is also a "Portrait_902.0_Wormwood_Dross.png" file.
  [BossID.RAINMAKER]: "Portrait_902.0_Rainmaker.png", // 77
  [BossID.VISAGE]: "Portrait_903.0_Visage.png", // 78
  [BossID.SIREN]: "Portrait_904.0_Siren.png", // 79
  [BossID.TUFF_TWINS]: "Portrait_19.100_TuffTwins.png", // 80
  [BossID.HERETIC]: "Portrait_905.0_Heretic.png", // 81
  [BossID.HORNFEL]: "Portrait_906.0_Hornfel.png", // 82
  [BossID.GREAT_GIDEON]: "Portrait_907.0_Gideon.png", // 83
  [BossID.BABY_PLUM]: "Portrait_908.0_BabyPlum.png", // 84
  [BossID.SCOURGE]: "Portrait_909.0_Scourge.png", // 85
  [BossID.CHIMERA]: "Portrait_910.0_Chimera.png", // 86
  [BossID.ROTGUT]: "Portrait_911.0_Rotgut.png", // 87
  [BossID.MOTHER]: "Portrait_Mother.png", // 88
  // Mom (Mausoleum) uses the same file as Mom.
  [BossID.MAUSOLEUM_MOM]: "Portrait_45.0_Mom.png", // 89
  // Mom's Heart (Mausoleum) uses the same file as Mom's Heart.
  [BossID.MAUSOLEUM_MOMS_HEART]: "Portrait_78.0_MomsHeart.png", // 90
  // There also exists a "Portrait_913.0_MaidInTheMist.png" file, but that does not correspond to
  // Min Min.
  [BossID.MIN_MIN]: "Portrait_MinMin.png", // 91
  [BossID.CLOG]: "Portrait_Clog.png", // 92
  [BossID.SINGE]: "Portrait_Singe.png", // 93
  [BossID.BUMBINO]: "Portrait_Bumbino.png", // 94
  [BossID.COLOSTOMIA]: "Portrait_Colostomia.png", // 95
  [BossID.SHELL]: "Portrait_Shell.png", // 96
  [BossID.TURDLET]: "Portrait_Turdlet.png", // 97
  [BossID.RAGLICH]: "Portrait_Raglich.png", // 98
  [BossID.DOGMA]: "Portrait_Dogma.png", // 99
  // The file name specified in "bossportraits.xml" for The Beast does not actually exist in the
  // game files.
  [BossID.BEAST]: "Portrait_The Beast.png", // 100
  [BossID.HORNY_BOYS]: "Portrait_HornyBoys.png", // 101
  [BossID.CLUTCH]: "Portrait_Clutch.png", // 102
  // [BossID.CADAVRA]: "Portrait_Cadavra.png", // 103
} as const satisfies Record<BossID, string>;
