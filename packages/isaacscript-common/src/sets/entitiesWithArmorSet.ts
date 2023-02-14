import {
  BeastVariant,
  BloodPuppyVariant,
  BoomFlyVariant,
  Charger2Variant,
  DogmaVariant,
  EntityType,
  FacelessVariant,
  Gaper2Variant,
  GuttyFattyVariant,
  HiveVariant,
  HopperVariant,
  IsaacVariant,
  MegaSatanVariant,
  MoleVariant,
  MotherVariant,
  PooterVariant,
  RoundWormVariant,
  SubHorfVariant,
  SuckerVariant,
  UltraGreedVariant,
  WallCreepVariant,
} from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

/**
 * "Armor" refers to the damage scaling mechanic. The following list corresponds to the entities
 * that have the "shieldStrength" field in the "entities2.xml" file, with some exceptions.
 * (Invulnerable enemies are not included. Furthermore, Ultra Greed, Ultra Greedier, and Delirium
 * all have damage scaling, but do not have a corresponding "shieldStrength" field.)
 *
 * Also see:
 * https://bindingofisaacrebirth.fandom.com/wiki/Damage_Scaling#Entities_with_Armor_Values
 *
 * We use strings instead of a type + variant tuple so that we can have O(1) lookups.
 */
export const ENTITIES_WITH_ARMOR_SET = new ReadonlySet<string>([
  `${EntityType.POOTER}.${PooterVariant.TAINTED_POOTER}`, // 14.2
  `${EntityType.HIVE}.${HiveVariant.TAINTED_MULLIGAN}`, // 22.3
  `${EntityType.BOOM_FLY}.${BoomFlyVariant.TAINTED_BOOM_FLY}`, // 25.6
  `${EntityType.HOPPER}.${HopperVariant.TAINTED_HOPPER}`, // 29.3
  `${EntityType.SPITTY}`, // 31.1
  `${EntityType.SUCKER}.${SuckerVariant.TAINTED_SUCKER}`, // 61.7
  `${EntityType.ISAAC}.${IsaacVariant.BLUE_BABY_HUSH}`, // 102.2
  `${EntityType.WALL_CREEP}.${WallCreepVariant.TAINTED_SOY_CREEP}`, // 240.3
  `${EntityType.ROUND_WORM}.${RoundWormVariant.TAINTED_ROUND_WORM}`, // 244.2
  `${EntityType.ROUND_WORM}.${RoundWormVariant.TAINTED_TUBE_WORM}`, // 244.3
  `${EntityType.MEGA_SATAN}.${MegaSatanVariant.MEGA_SATAN}`, // 274.0
  `${EntityType.MEGA_SATAN}.${MegaSatanVariant.MEGA_SATAN_RIGHT_HAND}`, // 274.1
  `${EntityType.MEGA_SATAN}.${MegaSatanVariant.MEGA_SATAN_LEFT_HAND}`, // 274.2
  `${EntityType.MEGA_SATAN_2}.${MegaSatanVariant.MEGA_SATAN}`, // 275.0
  `${EntityType.MEGA_SATAN_2}.${MegaSatanVariant.MEGA_SATAN_RIGHT_HAND}`, // 275.1
  `${EntityType.MEGA_SATAN_2}.${MegaSatanVariant.MEGA_SATAN_LEFT_HAND}`, // 275.2
  `${EntityType.ULTRA_GREED}.${UltraGreedVariant.ULTRA_GREED}`, // 406.0
  `${EntityType.ULTRA_GREED}.${UltraGreedVariant.ULTRA_GREEDIER}`, // 406.1
  `${EntityType.HUSH}.0`, // 407.0
  `${EntityType.DELIRIUM}.0`, // 412.0
  `${EntityType.BLOOD_PUPPY}.${BloodPuppyVariant.SMALL}`, // 802.0
  `${EntityType.BLOOD_PUPPY}.${BloodPuppyVariant.LARGE}`, // 802.1
  `${EntityType.SUB_HORF}.${SubHorfVariant.TAINTED_SUB_HORF}`, // 812.1
  `${EntityType.FACELESS}.${FacelessVariant.TAINTED_FACELESS}`, // 827.1
  `${EntityType.MOLE}.${MoleVariant.TAINTED_MOLE}`, // 829.1
  `${EntityType.GUTTED_FATTY}.${GuttyFattyVariant.GUTTED_FATTY}`, // 831.0
  `${EntityType.GAPER_LVL_2}.${Gaper2Variant.GAPER}`, // 850.0
  `${EntityType.GAPER_LVL_2}.${Gaper2Variant.HORF}`, // 850.1
  `${EntityType.GAPER_LVL_2}.${Gaper2Variant.GUSHER}`, // 850.2
  `${EntityType.CHARGER_LVL_2}.${Charger2Variant.CHARGER}`, // 855.0
  `${EntityType.CHARGER_LVL_2}.${Charger2Variant.ELLEECH}`, // 855.1
  `${EntityType.SHADY}.0`, // 888.0
  `${EntityType.MOTHER}.${MotherVariant.MOTHER_1}`, // 912.0
  `${EntityType.MOTHER}.${MotherVariant.MOTHER_2}`, // 912.10
  `${EntityType.DOGMA}.${DogmaVariant.TV}`, // 950.1
  `${EntityType.DOGMA}.${DogmaVariant.ANGEL_PHASE_2}`, // 950.2
  `${EntityType.BEAST}.${BeastVariant.BEAST}`, // 951.0
  `${EntityType.BEAST}.${BeastVariant.ULTRA_FAMINE}`, // 951.10
  `${EntityType.BEAST}.${BeastVariant.ULTRA_PESTILENCE}`, // 951.20
  `${EntityType.BEAST}.${BeastVariant.ULTRA_WAR}`, // 951.30
  `${EntityType.BEAST}.${BeastVariant.ULTRA_DEATH}`, // 951.40
]);
